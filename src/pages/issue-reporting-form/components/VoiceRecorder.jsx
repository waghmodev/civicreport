import React, { useState, useRef, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const VoiceRecorder = ({ onTranscriptionChange, description, setDescription }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const mediaRecorderRef = useRef(null);
  const audioRef = useRef(null);
  const timerRef = useRef(null);
  const chunksRef = useRef([]);

  useEffect(() => {
    return () => {
      if (timerRef?.current) {
        clearInterval(timerRef?.current);
      }
      if (mediaRecorderRef?.current && mediaRecorderRef?.current?.state !== 'inactive') {
        mediaRecorderRef?.current?.stop();
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices?.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event?.data?.size > 0) {
          chunksRef?.current?.push(event?.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/wav' });
        setAudioBlob(blob);
        stream?.getTracks()?.forEach(track => track?.stop());
        processAudioToText(blob);
      };

      mediaRecorder?.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Unable to access microphone. Please check your permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef?.current && mediaRecorderRef?.current?.state !== 'inactive') {
      mediaRecorderRef?.current?.stop();
    }
    setIsRecording(false);
    if (timerRef?.current) {
      clearInterval(timerRef?.current);
    }
  };

  const processAudioToText = async (blob) => {
    setIsProcessing(true);
    
    // Simulate voice-to-text processing (in real app, use actual speech recognition API)
    setTimeout(() => {
      const mockTranscriptions = [
        "There\'s a large pothole on Main Street near the intersection with Oak Avenue. It\'s causing damage to vehicles and creating a safety hazard.",
        "The streetlight at the corner of First and Maple has been flickering for several days and went out completely last night.",
        "The trash bins on Elm Street haven\'t been emptied in over a week and are overflowing onto the sidewalk.",
        "There\'s a water leak from the fire hydrant on Second Street that\'s creating a large puddle and wasting water.",
        "The traffic signal at the busy intersection of Broadway and Center Street is malfunctioning and stuck on red."
      ];
      
      const randomTranscription = mockTranscriptions?.[Math.floor(Math.random() * mockTranscriptions?.length)];
      const newDescription = description ? `${description}\n\n${randomTranscription}` : randomTranscription;
      
      setDescription(newDescription);
      onTranscriptionChange?.(randomTranscription);
      setIsProcessing(false);
    }, 2000);
  };

  const playRecording = () => {
    if (audioBlob && audioRef?.current) {
      const audioUrl = URL.createObjectURL(audioBlob);
      audioRef.current.src = audioUrl;
      audioRef?.current?.play();
      setIsPlaying(true);
      
      audioRef.current.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
      };
    }
  };

  const deleteRecording = () => {
    setAudioBlob(null);
    setRecordingTime(0);
    setIsPlaying(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Voice Recording
        </label>
        <p className="text-sm text-muted-foreground mb-4">
          Record a voice description that will be automatically converted to text
        </p>
      </div>
      {/* Recording Controls */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-center space-x-4">
          {!isRecording && !audioBlob && (
            <Button
              variant="outline"
              size="lg"
              iconName="Mic"
              iconPosition="left"
              iconSize={20}
              onClick={startRecording}
              className="px-6"
            >
              Start Recording
            </Button>
          )}

          {isRecording && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-error rounded-full animate-pulse" />
                <span className="text-sm font-medium text-foreground">
                  Recording: {formatTime(recordingTime)}
                </span>
              </div>
              <Button
                variant="destructive"
                size="sm"
                iconName="Square"
                iconPosition="left"
                iconSize={16}
                onClick={stopRecording}
              >
                Stop
              </Button>
            </div>
          )}

          {audioBlob && !isProcessing && (
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                iconName={isPlaying ? "Pause" : "Play"}
                iconPosition="left"
                iconSize={16}
                onClick={playRecording}
                disabled={isPlaying}
              >
                {isPlaying ? 'Playing...' : 'Play Recording'}
              </Button>
              
              <span className="text-sm text-muted-foreground">
                {formatTime(recordingTime)}
              </span>
              
              <Button
                variant="ghost"
                size="sm"
                iconName="Trash2"
                iconSize={16}
                onClick={deleteRecording}
              >
                Delete
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                iconName="Mic"
                iconPosition="left"
                iconSize={16}
                onClick={startRecording}
              >
                Record Again
              </Button>
            </div>
          )}

          {isProcessing && (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span className="text-sm text-muted-foreground">
                Converting speech to text...
              </span>
            </div>
          )}
        </div>

        <audio ref={audioRef} className="hidden" />
      </div>
      {/* Recording Status */}
      {audioBlob && (
        <div className="p-3 bg-success/5 border border-success/20 rounded-md">
          <div className="flex items-center gap-2">
            <Icon name="CheckCircle" size={14} className="text-success" />
            <span className="text-sm font-medium text-success">Recording Complete</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Voice recording has been processed and added to your description.
          </p>
        </div>
      )}
      {/* Browser Support Notice */}
      {!navigator.mediaDevices || !navigator.mediaDevices?.getUserMedia ? (
        <div className="p-3 bg-warning/5 border border-warning/20 rounded-md">
          <div className="flex items-center gap-2">
            <Icon name="AlertTriangle" size={14} className="text-warning" />
            <span className="text-sm font-medium text-warning">Voice Recording Not Available</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Your browser doesn't support voice recording. Please type your description manually.
          </p>
        </div>
      ) : null}
      {/* Recording Tips */}
      <div className="p-3 bg-accent/5 border border-accent/20 rounded-md">
        <div className="flex items-center gap-2 mb-2">
          <Icon name="Mic" size={14} className="text-accent" />
          <span className="text-sm font-medium text-accent">Recording Tips</span>
        </div>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Speak clearly and at a normal pace</li>
          <li>• Find a quiet location to minimize background noise</li>
          <li>• Describe the issue location, severity, and any safety concerns</li>
          <li>• Keep recordings under 2 minutes for best results</li>
        </ul>
      </div>
    </div>
  );
};

export default VoiceRecorder;