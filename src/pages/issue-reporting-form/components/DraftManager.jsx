import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const DraftManager = ({ formData, onLoadDraft, onSaveDraft, onClearDraft }) => {
  const [savedDrafts, setSavedDrafts] = useState([]);
  const [lastSaved, setLastSaved] = useState(null);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);

  useEffect(() => {
    // Load saved drafts from localStorage
    const drafts = JSON.parse(localStorage.getItem('civicreport_drafts') || '[]');
    setSavedDrafts(drafts);
    
    const lastSavedTime = localStorage.getItem('civicreport_last_saved');
    if (lastSavedTime) {
      setLastSaved(new Date(lastSavedTime));
    }
  }, []);

  useEffect(() => {
    // Auto-save functionality
    if (autoSaveEnabled && formData && Object.keys(formData)?.length > 0) {
      const timer = setTimeout(() => {
        saveDraft(true);
      }, 30000); // Auto-save every 30 seconds

      return () => clearTimeout(timer);
    }
  }, [formData, autoSaveEnabled]);

  const saveDraft = (isAutoSave = false) => {
    if (!formData || Object.keys(formData)?.length === 0) return;

    const draft = {
      id: Date.now(),
      timestamp: new Date()?.toISOString(),
      data: formData,
      isAutoSave,
      title: generateDraftTitle(formData)
    };

    const existingDrafts = JSON.parse(localStorage.getItem('civicreport_drafts') || '[]');
    const updatedDrafts = [draft, ...existingDrafts?.slice(0, 4)]; // Keep only 5 most recent

    localStorage.setItem('civicreport_drafts', JSON.stringify(updatedDrafts));
    localStorage.setItem('civicreport_last_saved', new Date()?.toISOString());
    
    setSavedDrafts(updatedDrafts);
    setLastSaved(new Date());
    
    if (!isAutoSave) {
      onSaveDraft?.(draft);
    }
  };

  const loadDraft = (draft) => {
    onLoadDraft?.(draft?.data);
  };

  const deleteDraft = (draftId) => {
    const updatedDrafts = savedDrafts?.filter(draft => draft?.id !== draftId);
    localStorage.setItem('civicreport_drafts', JSON.stringify(updatedDrafts));
    setSavedDrafts(updatedDrafts);
  };

  const clearAllDrafts = () => {
    localStorage.removeItem('civicreport_drafts');
    localStorage.removeItem('civicreport_last_saved');
    setSavedDrafts([]);
    setLastSaved(null);
    onClearDraft?.();
  };

  const generateDraftTitle = (data) => {
    if (data?.issueType) {
      const typeLabels = {
        pothole: 'Pothole Report',
        streetlight: 'Streetlight Issue',
        trash: 'Waste Management',
        water: 'Water/Drainage',
        traffic: 'Traffic Signal',
        sidewalk: 'Sidewalk Issue',
        park: 'Parks & Recreation',
        noise: 'Noise Complaint',
        graffiti: 'Graffiti Report',
        other: 'Other Issue'
      };
      return typeLabels?.[data?.issueType] || 'Draft Report';
    }
    return 'Untitled Draft';
  };

  const formatRelativeTime = (date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon name="Save" size={16} className="text-primary" />
          <span className="font-medium text-sm text-foreground">Draft Manager</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            iconName={autoSaveEnabled ? "ToggleRight" : "ToggleLeft"}
            iconPosition="left"
            iconSize={14}
            onClick={() => setAutoSaveEnabled(!autoSaveEnabled)}
            className={autoSaveEnabled ? "text-primary" : "text-muted-foreground"}
          >
            Auto-save
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            iconName="Save"
            iconPosition="left"
            iconSize={14}
            onClick={() => saveDraft(false)}
            disabled={!formData || Object.keys(formData)?.length === 0}
          >
            Save Now
          </Button>
        </div>
      </div>
      {/* Last Saved Indicator */}
      {lastSaved && (
        <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
          <Icon name="Clock" size={12} />
          <span>Last saved: {formatRelativeTime(lastSaved)}</span>
        </div>
      )}
      {/* Saved Drafts List */}
      {savedDrafts?.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground">Saved Drafts</h4>
          
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {savedDrafts?.map((draft) => (
              <div
                key={draft?.id}
                className="flex items-center justify-between p-2 bg-muted/50 rounded-md border border-border"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground truncate">
                      {draft?.title}
                    </span>
                    {draft?.isAutoSave && (
                      <span className="px-1.5 py-0.5 text-xs bg-accent/10 text-accent rounded">
                        Auto
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatRelativeTime(new Date(draft.timestamp))}
                  </div>
                </div>
                
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Upload"
                    iconSize={12}
                    onClick={() => loadDraft(draft)}
                  >
                    Load
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Trash2"
                    iconSize={12}
                    onClick={() => deleteDraft(draft?.id)}
                  >
                    <span className="sr-only">Delete draft</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <Button
            variant="ghost"
            size="sm"
            iconName="Trash2"
            iconPosition="left"
            iconSize={14}
            onClick={clearAllDrafts}
            className="w-full text-error hover:text-error"
          >
            Clear All Drafts
          </Button>
        </div>
      )}
      {savedDrafts?.length === 0 && (
        <div className="text-center py-4">
          <Icon name="FileText" size={24} className="text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">No saved drafts</p>
        </div>
      )}
      {/* Draft Tips */}
      <div className="mt-4 p-3 bg-accent/5 border border-accent/20 rounded-md">
        <div className="flex items-center gap-2 mb-1">
          <Icon name="Info" size={14} className="text-accent" />
          <span className="text-sm font-medium text-accent">Draft Tips</span>
        </div>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Drafts are automatically saved every 30 seconds</li>
          <li>• Up to 5 most recent drafts are kept</li>
          <li>• Drafts are stored locally on your device</li>
        </ul>
      </div>
    </div>
  );
};

export default DraftManager;