import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import QuickActionCard from './components/QuickActionCard';
import PersonalSubmissionsList from './components/PersonalSubmissionsList';
import CommunityActivityPanel from './components/CommunityActivityPanel';

const CitizenDashboard = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Dashboard - CivicReport</title>
        <meta name="description" content="Track your submitted civic issues and view community activity in your area." />
        <meta name="keywords" content="civic dashboard, issue tracking, community reports, municipal services" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Main Content */}
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Welcome Section */}
            <div className="mb-8">
              <div className="bg-gradient-to-r from-emerald-500/20 to-teal-600/20 rounded-lg p-6 border border-emerald-500/30">
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                  Welcome back, Vaibhav!
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Track your submissions, explore community activity, and stay updated on civic improvements in your area.
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
              <QuickActionCard />
            </div>

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Personal Submissions - Takes 2 columns on large screens */}
              <div className="lg:col-span-2">
                <PersonalSubmissionsList />
              </div>

              {/* Community Activity Panel - Takes 1 column on large screens */}
              <div className="lg:col-span-1">
                <CommunityActivityPanel />
              </div>
            </div>

            {/* Footer Info */}
            <div className="mt-12 pt-8 border-t border-border">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Need help? Contact our support team at{' '}
                  <a href="mailto:support@civicreport.gov" className="text-primary hover:underline">
                    support@civicreport.gov
                  </a>{' '}
                  or call{' '}
                  <a href="tel:+1-555-0123" className="text-primary hover:underline">
                    (555) 012-3456
                  </a>
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  © {new Date()?.getFullYear()} CivicReport. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default CitizenDashboard;