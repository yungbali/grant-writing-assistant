import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
// Removed the import for Tabs due to the error
import { 
  Calendar, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  TrendingUp 
} from 'lucide-react';
import { useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface GrantApplication {
  id: string;
  title: string;
  funder: string;
  deadline: string;
  status: 'draft' | 'in_review' | 'submitted' | 'approved' | 'rejected';
  progress: number;
  tasks: {
    id: string;
    title: string;
    completed: boolean;
    dueDate: string;
  }[];
  documents: {
    id: string;
    name: string;
    status: 'pending' | 'completed' | 'review_needed';
  }[];
}

export function Dashboard() {
  const router = useRouter();
  const [applications, setApplications] = useState<GrantApplication[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalGrants: 0,
    activeApplications: 0,
    successRate: 0,
    totalFunding: 0,
  });

  useEffect(() => {
    // Fetch applications and stats
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/dashboard');
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message);
      }
      setApplications(data.applications);
      setStats(data.stats);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const handleViewDetails = (applicationId: string) => {
    router.push(`/applications/${applicationId}`);
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">Total Grants</h3>
                  <FileText className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="mt-2 text-2xl font-bold">
                  {stats.totalGrants}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">Active Applications</h3>
                  <Clock className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="mt-2 text-2xl font-bold">
                  {stats.activeApplications}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">Success Rate</h3>
                  <TrendingUp className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="mt-2 text-2xl font-bold">
                  {stats.successRate}%
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">Total Funding</h3>
                  <div className="h-5 w-5 text-muted-foreground">$</div>
                </div>
                <div className="mt-2 text-2xl font-bold">
                  ${stats.totalFunding.toLocaleString()}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Applications */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Recent Applications</h3>
              <div className="space-y-4">
                {applications.slice(0, 5).map((app) => (
                  <div key={app.id} className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{app.title}</h4>
                      <p className="text-sm text-muted-foreground">{app.funder}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Progress value={app.progress} className="w-[100px]" />
                      <span className="text-sm">{app.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="applications">
          {/* Applications List */}
          <div className="space-y-4">
            {applications.map((app) => (
              <Card key={app.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{app.title}</h3>
                      <p className="text-sm text-muted-foreground">{app.funder}</p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleViewDetails(app.id)}
                    >
                      View Details
                    </Button>
                  </div>
                  <div className="mt-4">
                    <Progress value={app.progress} />
                    <div className="mt-2 flex justify-between text-sm">
                      <span>{app.progress}% Complete</span>
                      <span>Due: {new Date(app.deadline).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-4">
                    {app.documents.map((doc) => (
                      <div key={doc.id} className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        <span className="text-sm">{doc.name}</span>
                        {doc.status === 'completed' && (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                        {doc.status === 'review_needed' && (
                          <AlertCircle className="h-4 w-4 text-yellow-500" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Additional tabs content... */}
      </Tabs>
    </div>
  );
} 