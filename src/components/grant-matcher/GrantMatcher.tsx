import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Filter, ArrowUpDown } from 'lucide-react';
import type { GrantOpportunity, FormData } from '@/types';

export function GrantMatcher({ formData }: { formData: FormData }) {
  const [grants, setGrants] = useState<GrantOpportunity[]>([]);
  const [filteredGrants, setFilteredGrants] = useState<GrantOpportunity[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    minAmount: 0,
    maxAmount: Infinity,
    deadline: '',
    focusArea: '',
  });

  const findMatchingGrants = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/grants/match', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          organizationProfile: formData,
          filters
        }),
      });
      
      const matchedGrants = await response.json();
      setGrants(matchedGrants);
      setFilteredGrants(matchedGrants);
    } catch (error) {
      console.error('Error finding grants:', error);
    } finally {
      setLoading(false);
    }
  };

  const sortByMatchScore = () => {
    const sorted = [...filteredGrants].sort((a, b) => 
      (b.matchScore || 0) - (a.matchScore || 0)
    );
    setFilteredGrants(sorted);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Grant Opportunities</h2>
        <Button onClick={findMatchingGrants} disabled={loading}>
          {loading ? 'Searching...' : 'Find Matching Grants'}
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="grid grid-cols-4 gap-4">
          <div>
            <Label>Min Amount</Label>
            <Input
              type="number"
              value={filters.minAmount}
              onChange={(e) => setFilters({
                ...filters,
                minAmount: Number(e.target.value)
              })}
            />
          </div>
          <div>
            <Label>Max Amount</Label>
            <Input
              type="number"
              value={filters.maxAmount === Infinity ? '' : filters.maxAmount}
              onChange={(e) => setFilters({
                ...filters,
                maxAmount: e.target.value ? Number(e.target.value) : Infinity
              })}
            />
          </div>
          <div>
            <Label>Deadline After</Label>
            <Input
              type="date"
              value={filters.deadline}
              onChange={(e) => setFilters({
                ...filters,
                deadline: e.target.value
              })}
            />
          </div>
          <div>
            <Label>Focus Area</Label>
            <Input
              value={filters.focusArea}
              onChange={(e) => setFilters({
                ...filters,
                focusArea: e.target.value
              })}
            />
          </div>
        </div>
      </Card>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">
            {filteredGrants.length} grants found
          </span>
          <Button variant="outline" size="sm" onClick={sortByMatchScore}>
            <ArrowUpDown className="mr-2 h-4 w-4" />
            Sort by Match
          </Button>
        </div>

        {filteredGrants.map((grant) => (
          <Card key={grant.id} className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{grant.title}</h3>
                <p className="text-sm text-muted-foreground">{grant.funder}</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold">
                  ${grant.amount.min.toLocaleString()} - ${grant.amount.max.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">
                  Due: {new Date(grant.deadline).toLocaleDateString()}
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex items-center gap-4">
              <div className="flex-1">
                <div className="h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-2 bg-green-500 rounded-full"
                    style={{ width: `${grant.matchScore}%` }}
                  />
                </div>
                <div className="text-sm mt-1">
                  {grant.matchScore}% Match
                </div>
              </div>
              <Button variant="outline" size="sm">
                View Details
              </Button>
              <Button size="sm">
                Apply Now
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
} 