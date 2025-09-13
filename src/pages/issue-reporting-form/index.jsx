import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Checkbox } from '../../components/ui/Checkbox';
import Icon from '../../components/AppIcon';
import LocationContextWidget from '../../components/ui/LocationContextWidget';

// Import components
import IssueTypeSelector from './components/IssueTypeSelector';
import PrioritySelector from './components/PrioritySelector';
import PhotoCapture from './components/PhotoCapture';
import VoiceRecorder from './components/VoiceRecorder';
import FormProgress from './components/FormProgress';
import DraftManager from './components/DraftManager';

const IssueReportingForm = () => {
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    issueType: '',
    priority: '',
    title: '',
    description: '',
    location: null,
    photos: [],
    contactInfo: {
      name: '',
      email: '',
      phone: ''
    },
    isAnonymous: false,
    agreeToTerms: false
  });

  // UI state
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showDraftManager, setShowDraftManager] = useState(false);

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData?.issueType) {
      newErrors.issueType = 'Please select an issue category';
    }

    if (!formData?.priority) {
      newErrors.priority = 'Please select a priority level';
    }

    if (!formData?.title?.trim()) {
      newErrors.title = 'Please provide a brief title for the issue';
    }

    if (!formData?.description?.trim()) {
      newErrors.description = 'Please describe the issue in detail';
    }

    if (!formData?.location || !formData?.location?.address) {
      newErrors.location = 'Please provide the location of the issue';
    }

    if (!formData?.isAnonymous) {
      if (!formData?.contactInfo?.name?.trim()) {
        newErrors.contactName = 'Please provide your name';
      }
      if (!formData?.contactInfo?.email?.trim()) {
        newErrors.contactEmail = 'Please provide your email address';
      }
      if (formData?.contactInfo?.email && !/\S+@\S+\.\S+/?.test(formData?.contactInfo?.email)) {
        newErrors.contactEmail = 'Please provide a valid email address';
      }
    }

    if (!formData?.agreeToTerms) {
      newErrors.agreeToTerms = 'Please agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  // Calculate form progress
  const getFormProgress = () => {
    const requiredFields = [
      'issueType',
      'priority', 
      'title',
      'description',
      'location',
      'agreeToTerms'
    ];

    if (!formData?.isAnonymous) {
      requiredFields?.push('contactInfo.name', 'contactInfo.email');
    }

    const completedFields = requiredFields?.filter(field => {
      if (field?.includes('.')) {
        const [parent, child] = field?.split('.');
        return formData?.[parent] && formData?.[parent]?.[child] && formData?.[parent]?.[child]?.trim();
      }
      if (field === 'location') {
        return formData?.location && formData?.location?.address;
      }
      return formData?.[field];
    })?.length;

    return { completedFields, requiredFields: requiredFields?.length };
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate tracking number
      const trackingNumber = `CR-${Date.now()?.toString()?.slice(-8)}`;
      
      // Clear form data
      setFormData({
        issueType: '',
        priority: '',
        title: '',
        description: '',
        location: null,
        photos: [],
        contactInfo: { name: '', email: '', phone: '' },
        isAnonymous: false,
        agreeToTerms: false
      });

      // Clear any saved drafts
      localStorage.removeItem('civicreport_drafts');
      localStorage.removeItem('civicreport_last_saved');

      // Navigate to success page with tracking number
      navigate('/citizen-dashboard', { 
        state: { 
          submitted: true, 
          trackingNumber,
          issueType: formData?.issueType 
        } 
      });

    } catch (error) {
      console.error('Submission error:', error);
      setErrors({ submit: 'Failed to submit report. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle field updates
  const updateField = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear related errors
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const updateContactInfo = (field, value) => {
    setFormData(prev => ({
      ...prev,
      contactInfo: {
        ...prev?.contactInfo,
        [field]: value
      }
    }));
    
    // Clear related errors
    const errorKey = `contact${field?.charAt(0)?.toUpperCase() + field?.slice(1)}`;
    if (errors?.[errorKey]) {
      setErrors(prev => ({
        ...prev,
        [errorKey]: undefined
      }));
    }
  };

  // Draft management
  const handleLoadDraft = (draftData) => {
    setFormData(draftData);
    setShowDraftManager(false);
  };

  const handleSaveDraft = () => {
    // Draft is automatically saved by DraftManager component
  };

  const handleClearDraft = () => {
    setFormData({
      issueType: '',
      priority: '',
      title: '',
      description: '',
      location: null,
      photos: [],
      contactInfo: { name: '', email: '', phone: '' },
      isAnonymous: false,
      agreeToTerms: false
    });
  };

  const { completedFields, requiredFields } = getFormProgress();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                <Icon name="FileText" size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Report Civic Issue</h1>
                <p className="text-muted-foreground">
                  Help improve your community by reporting issues that need attention
                </p>
              </div>
            </div>

            {/* Draft Manager Toggle */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                iconName="ArrowLeft"
                iconPosition="left"
                iconSize={16}
                onClick={() => navigate('/citizen-dashboard')}
              >
                Back to Dashboard
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                iconName="Save"
                iconPosition="left"
                iconSize={16}
                onClick={() => setShowDraftManager(!showDraftManager)}
              >
                {showDraftManager ? 'Hide' : 'Show'} Drafts
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <FormProgress
                currentStep={currentStep}
                totalSteps={5}
                completedFields={completedFields}
                requiredFields={requiredFields}
              />

              {showDraftManager && (
                <DraftManager
                  formData={formData}
                  onLoadDraft={handleLoadDraft}
                  onSaveDraft={handleSaveDraft}
                  onClearDraft={handleClearDraft}
                />
              )}
            </div>

            {/* Main Form */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Issue Type Selection */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <IssueTypeSelector
                    value={formData?.issueType}
                    onChange={(value) => updateField('issueType', value)}
                    error={errors?.issueType}
                  />
                </div>

                {/* Priority Selection */}
                {formData?.issueType && (
                  <div className="bg-card border border-border rounded-lg p-6">
                    <PrioritySelector
                      value={formData?.priority}
                      onChange={(value) => updateField('priority', value)}
                      issueType={formData?.issueType}
                    />
                  </div>
                )}

                {/* Issue Details */}
                <div className="bg-card border border-border rounded-lg p-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Issue Details</h3>
                  </div>

                  <Input
                    label="Issue Title"
                    type="text"
                    placeholder="Brief summary of the issue (e.g., 'Large pothole on Main Street')"
                    value={formData?.title}
                    onChange={(e) => updateField('title', e?.target?.value)}
                    error={errors?.title}
                    required
                    maxLength={100}
                    description="Provide a clear, concise title for the issue"
                  />

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Detailed Description <span className="text-error">*</span>
                    </label>
                    <textarea
                      className="w-full min-h-[120px] px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical"
                      placeholder="Describe the issue in detail. Include information about severity, safety concerns, and any relevant context..."
                      value={formData?.description}
                      onChange={(e) => updateField('description', e?.target?.value)}
                      maxLength={1000}
                    />
                    {errors?.description && (
                      <p className="text-sm text-error mt-1">{errors?.description}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      {formData?.description?.length}/1000 characters
                    </p>
                  </div>

                  {/* Voice Recorder */}
                  <VoiceRecorder
                    onTranscriptionChange={(transcription) => {
                      // Transcription is handled within the component
                    }}
                    description={formData?.description}
                    setDescription={(value) => updateField('description', value)}
                  />
                </div>

                {/* Location */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <LocationContextWidget
                    onLocationChange={(location) => updateField('location', location)}
                    initialLocation={formData?.location}
                    showMap={true}
                  />
                  {errors?.location && (
                    <p className="text-sm text-error mt-2">{errors?.location}</p>
                  )}
                </div>

                {/* Photo Evidence */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <PhotoCapture
                    photos={formData?.photos}
                    onPhotosChange={(photos) => updateField('photos', photos)}
                    maxPhotos={5}
                  />
                </div>

                {/* Contact Information */}
                <div className="bg-card border border-border rounded-lg p-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Contact Information</h3>
                    <p className="text-sm text-muted-foreground">
                      We may need to contact you for additional information or updates
                    </p>
                  </div>

                  <Checkbox
                    label="Submit anonymously"
                    description="Your identity will not be shared, but you won't receive updates"
                    checked={formData?.isAnonymous}
                    onChange={(e) => updateField('isAnonymous', e?.target?.checked)}
                  />

                  {!formData?.isAnonymous && (
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Input
                        label="Full Name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData?.contactInfo?.name}
                        onChange={(e) => updateContactInfo('name', e?.target?.value)}
                        error={errors?.contactName}
                        required
                      />

                      <Input
                        label="Email Address"
                        type="email"
                        placeholder="Enter your email"
                        value={formData?.contactInfo?.email}
                        onChange={(e) => updateContactInfo('email', e?.target?.value)}
                        error={errors?.contactEmail}
                        required
                      />

                      <Input
                        label="Phone Number"
                        type="tel"
                        placeholder="Enter your phone number (optional)"
                        value={formData?.contactInfo?.phone}
                        onChange={(e) => updateContactInfo('phone', e?.target?.value)}
                        description="Optional - for urgent issues requiring immediate contact"
                      />
                    </div>
                  )}
                </div>

                {/* Terms and Conditions */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <Checkbox
                    label="I agree to the terms and conditions"
                    description="By submitting this report, you agree to our terms of service and privacy policy"
                    checked={formData?.agreeToTerms}
                    onChange={(e) => updateField('agreeToTerms', e?.target?.checked)}
                    error={errors?.agreeToTerms}
                    required
                  />
                </div>

                {/* Submit Section */}
                <div className="bg-card border border-border rounded-lg p-6">
                  {errors?.submit && (
                    <div className="mb-4 p-3 bg-error/10 border border-error/20 rounded-md">
                      <div className="flex items-center gap-2">
                        <Icon name="AlertCircle" size={16} className="text-error" />
                        <span className="text-sm text-error">{errors?.submit}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      type="submit"
                      variant="default"
                      size="lg"
                      iconName="Send"
                      iconPosition="left"
                      iconSize={16}
                      loading={isSubmitting}
                      disabled={isSubmitting || completedFields < requiredFields}
                      className="flex-1"
                    >
                      {isSubmitting ? 'Submitting Report...' : 'Submit Issue Report'}
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      iconName="Save"
                      iconPosition="left"
                      iconSize={16}
                      onClick={() => setShowDraftManager(true)}
                    >
                      Save Draft
                    </Button>
                  </div>

                  <div className="mt-4 p-3 bg-accent/5 border border-accent/20 rounded-md">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="Info" size={14} className="text-accent" />
                      <span className="text-sm font-medium text-accent">What happens next?</span>
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• You'll receive a tracking number to monitor progress</li>
                      <li>• Your report will be reviewed and assigned to the appropriate department</li>
                      <li>• You'll get updates via email as the issue is addressed</li>
                      <li>• Expected response time varies by issue type and priority</li>
                    </ul>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default IssueReportingForm;