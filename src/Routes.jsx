import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import CitizenLogin from './pages/citizen-login';
import MunicipalStaffLogin from './pages/municipal-staff-login';
import IssueDetailsView from './pages/issue-details-view';
import IssueReportingForm from './pages/issue-reporting-form';
import CommunityIssueMap from './pages/community-issue-map';
import CitizenDashboard from './pages/citizen-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<CitizenDashboard />} />
        <Route path="/citizen-login" element={<CitizenLogin />} />
        <Route path="/municipal-staff-login" element={<MunicipalStaffLogin />} />
        <Route path="/issue-details-view" element={<IssueDetailsView />} />
        <Route path="/issue-reporting-form" element={<IssueReportingForm />} />
        <Route path="/community-issue-map" element={<CommunityIssueMap />} />
        <Route path="/citizen-dashboard" element={<CitizenDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
