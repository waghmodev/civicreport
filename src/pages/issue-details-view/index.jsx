import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import IssueHeader from './components/IssueHeader';
import ProgressTimeline from './components/ProgressTimeline';
import CommunicationPanel from './components/CommunicationPanel';
import LocationMap from './components/LocationMap';
import ResolutionComparison from './components/ResolutionComparison';
import NotificationSettings from './components/NotificationSettings';

const IssueDetailsView = () => {
  const navigate = useNavigate();
  const { issueId } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [issue, setIssue] = useState(null);
  const [communications, setCommunications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for the issue
  const mockIssue = {
    id: "ISS-2025-001234",
    title: "Large Pothole on Main Street",
    description: `There is a significant pothole on Main Street near the intersection with Oak Avenue. The pothole is approximately 3 feet wide and 8 inches deep, causing vehicles to swerve dangerously to avoid it.\n\nThis has been an ongoing issue for the past two weeks and is getting worse with recent rain. Several residents have reported near-miss accidents due to this hazard.\n\nImmediate attention is needed as this poses a serious safety risk to both vehicles and pedestrians.`,
    status: "in-progress",
    priority: "high",
    category: "Road Maintenance",
    submittedAt: "2025-01-10T09:30:00Z",
    assignedDepartment: "Public Works Department",
    location: {
      address: "Main Street & Oak Avenue, Downtown District, Springfield, IL 62701",
      coordinates: {
        lat: 39.7817,
        lng: -89.6501
      },
      accuracy: 12
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        timestamp: "2025-01-10T09:30:00Z"
      },
      {
        url: "https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?w=800&h=600&fit=crop",
        timestamp: "2025-01-10T09:32:00Z"
      },
      {
        url: "https://images.pixabay.com/photo/2017/08/02/14/26/road-2571741_1280.jpg?w=800&h=600&fit=crop",
        timestamp: "2025-01-10T09:35:00Z"
      }
    ]
  };

  const mockTimeline = [
    {
      status: "submitted",
      timestamp: "2025-01-10T09:30:00Z",
      note: "Issue submitted by citizen with photos and location details.",
      estimatedCompletion: null
    },
    {
      status: "acknowledged",
      timestamp: "2025-01-10T14:15:00Z",
      note: "Issue acknowledged by Public Works Department. Assigned to Road Maintenance Team for assessment.",
      estimatedCompletion: "2025-01-15T17:00:00Z"
    },
    {
      status: "in-progress",
      timestamp: "2025-01-12T08:00:00Z",
      note: "Work crew dispatched to location. Materials ordered for permanent repair. Temporary safety measures implemented.",
      estimatedCompletion: "2025-01-15T17:00:00Z"
    }
  ];

  const mockCommunications = [
    {
      id: 1,
      sender: "staff",
      senderName: "Mike Johnson",
      content: "Thank you for reporting this issue. We have assessed the location and confirmed the pothole requires immediate attention. Our team will begin work on Monday morning.",
      timestamp: "2025-01-10T15:30:00Z",
      read: true,
      attachments: []
    },
    {
      id: 2,
      sender: "citizen",
      senderName: "You",
      content: "Thank you for the quick response! I noticed the area has been marked with cones. When can we expect the permanent repair to be completed?",
      timestamp: "2025-01-11T08:45:00Z",
      read: true,
      attachments: []
    },
    {
      id: 3,
      sender: "staff",
      senderName: "Mike Johnson",
      content: "The permanent repair is scheduled for completion by end of day Friday. We\'re waiting for the asphalt delivery which should arrive Wednesday. I\'ll keep you updated on our progress.",
      timestamp: "2025-01-11T10:20:00Z",
      read: true,
      attachments: []
    },
    {
      id: 4,
      sender: "citizen",
      senderName: "You",
      content: "Perfect, thank you for keeping me informed. The temporary cones are definitely helping with safety in the meantime.",
      timestamp: "2025-01-12T07:15:00Z",
      read: false,
      attachments: []
    }
  ];

  const mockRelatedIssues = [
    {
      id: "ISS-2025-001198",
      title: "Broken Streetlight",
      category: "Lighting",
      status: "acknowledged",
      distance: 150
    },
    {
      id: "ISS-2025-001156",
      title: "Damaged Sidewalk",
      category: "Infrastructure",
      status: "resolved",
      distance: 280
    },
    {
      id: "ISS-2025-001089",
      title: "Traffic Sign Missing",
      category: "Traffic",
      status: "in-progress",
      distance: 320
    }
  ];

  const mockAfterImages = [
    {
      url: "https://images.unsplash.com/photo-1486754735734-325b5831c3ad?w=800&h=600&fit=crop",
      timestamp: "2025-01-15T16:30:00Z"
    }
  ];

  const mockResolutionDetails = {
    description: "Pothole has been permanently repaired with hot asphalt mix. Road surface has been leveled and compacted. Area has been inspected and approved for normal traffic flow.",
    completedAt: "2025-01-15T16:30:00Z",
    resolvedBy: "Public Works Team - Mike Johnson",
    duration: 5
  };

  const mockNotificationSettings = {
    email: true,
    sms: false,
    push: true,
    statusUpdates: true,
    departmentMessages: true,
    resolutionPhotos: true,
    relatedIssues: false,
    emailAddress: "citizen@example.com",
    phoneNumber: "+1 (555) 123-4567"
  };

  useEffect(() => {
    // Simulate loading data
    const loadIssueData = async () => {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIssue(mockIssue);
      setCommunications(mockCommunications);
      setIsLoading(false);
    };

    loadIssueData();
  }, [issueId]);

  const handleBackToDashboard = () => {
    navigate('/citizen-dashboard');
  };

  const handleEditIssue = () => {
    navigate(`/issue-reporting-form?edit=${issue?.id}`);
  };

  const handleSendMessage = async (message) => {
    const newMessage = {
      id: communications?.length + 1,
      sender: "citizen",
      senderName: "You",
      content: message,
      timestamp: new Date()?.toISOString(),
      read: false,
      attachments: []
    };
    
    setCommunications(prev => [...prev, newMessage]);
    
    // Simulate staff response after a delay
    setTimeout(() => {
      const staffResponse = {
        id: communications?.length + 2,
        sender: "staff",
        senderName: "Mike Johnson",
        content: "Thank you for your message. I\'ll look into this and get back to you shortly.",
        timestamp: new Date(Date.now() + 300000)?.toISOString(), // 5 minutes later
        read: true,
        attachments: []
      };
      setCommunications(prev => [...prev, staffResponse]);
    }, 2000);
  };

  const handleUpdateNotificationSettings = async (newSettings) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Updated notification settings:', newSettings);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Eye' },
    { id: 'timeline', label: 'Timeline', icon: 'Clock' },
    { id: 'communication', label: 'Messages', icon: 'MessageSquare' },
    { id: 'location', label: 'Location', icon: 'MapPin' },
    { id: 'resolution', label: 'Resolution', icon: 'CheckCircle' },
    { id: 'settings', label: 'Notifications', icon: 'Settings' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading issue details...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!issue) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-center">
              <h1 className="text-2xl font-semibold text-foreground mb-2">Issue Not Found</h1>
              <p className="text-muted-foreground mb-4">The requested issue could not be found.</p>
              <button
                onClick={handleBackToDashboard}
                className="text-primary hover:underline"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Issue Header */}
          <IssueHeader
            issue={issue}
            onBack={handleBackToDashboard}
            onEdit={handleEditIssue}
          />

          {/* Tab Navigation */}
          <div className="bg-card border border-border rounded-lg mb-6">
            <div className="flex overflow-x-auto">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`
                    flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors duration-200 whitespace-nowrap
                    ${activeTab === tab?.id
                      ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }
                  `}
                >
                  <span className="text-current">{tab?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ProgressTimeline timeline={mockTimeline} currentStatus={issue?.status} />
                <LocationMap location={issue?.location} relatedIssues={mockRelatedIssues} />
              </div>
            )}

            {activeTab === 'timeline' && (
              <ProgressTimeline timeline={mockTimeline} currentStatus={issue?.status} />
            )}

            {activeTab === 'communication' && (
              <CommunicationPanel
                communications={communications}
                onSendMessage={handleSendMessage}
              />
            )}

            {activeTab === 'location' && (
              <LocationMap location={issue?.location} relatedIssues={mockRelatedIssues} />
            )}

            {activeTab === 'resolution' && (
              <ResolutionComparison
                beforeImages={issue?.images}
                afterImages={issue?.status === 'resolved' ? mockAfterImages : []}
                resolutionDetails={issue?.status === 'resolved' ? mockResolutionDetails : null}
              />
            )}

            {activeTab === 'settings' && (
              <NotificationSettings
                currentSettings={mockNotificationSettings}
                onUpdateSettings={handleUpdateNotificationSettings}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetailsView;