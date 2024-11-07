'use client'

import GrantProposalBuilder from '@/components/grant-proposal-builder'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100"
    >
      <div className="grid grid-cols-12 gap-4 p-6">
        {/* Left Sidebar - Navigation */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="col-span-2 bg-white rounded-lg shadow-lg p-4 backdrop-blur-sm bg-white/50"
        >
          <nav className="space-y-2">
            {['New Proposal', 'Saved Drafts', 'Templates'].map((item, i) => (
              <motion.button
                key={item}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="w-full text-left p-2 hover:bg-blue-50 rounded transition-colors"
              >
                {item}
              </motion.button>
            ))}
          </nav>
        </motion.div>

        {/* Main Content Area */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="col-span-7 bg-white rounded-lg shadow-lg p-6"
        >
          <GrantProposalBuilder />
        </motion.div>

        {/* Right Sidebar - AI Assistant */}
        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="col-span-3 bg-white rounded-lg shadow-lg p-4"
        >
          <div className="space-y-4">
            <h3 className="font-semibold">AI Assistant</h3>
            <div className="space-y-2">
              {['Generate Content', 'Review & Suggestions', 'Format Document'].map((item, i) => (
                <motion.button
                  key={item}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="w-full p-2 text-left bg-blue-50 hover:bg-blue-100 rounded transition-colors"
                >
                  {item}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}