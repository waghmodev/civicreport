import React from 'react';
import Icon from '../../../components/AppIcon';

const FormProgress = ({ currentStep, totalSteps, completedFields, requiredFields }) => {
  const progressPercentage = Math.round((completedFields / requiredFields) * 100);
  
  const steps = [
    { id: 1, label: 'Issue Type', icon: 'FileText' },
    { id: 2, label: 'Description', icon: 'MessageSquare' },
    { id: 3, label: 'Location', icon: 'MapPin' },
    { id: 4, label: 'Evidence', icon: 'Camera' },
    { id: 5, label: 'Review', icon: 'CheckCircle' }
  ];

  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'upcoming';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      {/* Progress Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium text-foreground">Form Progress</h3>
          <p className="text-xs text-muted-foreground">
            {completedFields} of {requiredFields} required fields completed
          </p>
        </div>
        <div className="text-right">
          <div className="text-lg font-semibold text-primary">{progressPercentage}%</div>
          <div className="text-xs text-muted-foreground">Complete</div>
        </div>
      </div>
      {/* Progress Bar */}
      <div className="w-full bg-muted rounded-full h-2 mb-4">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      {/* Step Indicators */}
      <div className="hidden sm:flex items-center justify-between">
        {steps?.map((step, index) => {
          const status = getStepStatus(step?.id);
          return (
            <div key={step?.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`
                  flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-200
                  ${status === 'completed' 
                    ? 'bg-primary border-primary text-white' 
                    : status === 'current' ?'bg-primary/10 border-primary text-primary' :'bg-muted border-muted-foreground/30 text-muted-foreground'
                  }
                `}>
                  {status === 'completed' ? (
                    <Icon name="Check" size={14} />
                  ) : (
                    <Icon name={step?.icon} size={14} />
                  )}
                </div>
                <span className={`
                  text-xs mt-1 font-medium
                  ${status === 'current' ?'text-primary' 
                    : status === 'completed' ?'text-foreground' :'text-muted-foreground'
                  }
                `}>
                  {step?.label}
                </span>
              </div>
              {index < steps?.length - 1 && (
                <div className={`
                  w-12 h-0.5 mx-2 transition-all duration-200
                  ${step?.id < currentStep ? 'bg-primary' : 'bg-muted'}
                `} />
              )}
            </div>
          );
        })}
      </div>
      {/* Mobile Step Indicator */}
      <div className="sm:hidden">
        <div className="flex items-center justify-center space-x-1">
          {steps?.map((step) => {
            const status = getStepStatus(step?.id);
            return (
              <div
                key={step?.id}
                className={`
                  w-2 h-2 rounded-full transition-all duration-200
                  ${status === 'completed' 
                    ? 'bg-primary' 
                    : status === 'current' ?'bg-primary/60' :'bg-muted'
                  }
                `}
              />
            );
          })}
        </div>
        <div className="text-center mt-2">
          <span className="text-xs text-muted-foreground">
            Step {currentStep} of {totalSteps}
          </span>
        </div>
      </div>
      {/* Completion Status */}
      {progressPercentage === 100 && (
        <div className="mt-3 p-2 bg-success/10 border border-success/20 rounded-md">
          <div className="flex items-center gap-2">
            <Icon name="CheckCircle" size={14} className="text-success" />
            <span className="text-sm font-medium text-success">
              Ready to Submit
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormProgress;