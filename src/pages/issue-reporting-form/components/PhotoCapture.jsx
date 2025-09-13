import React, { useState, useRef } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PhotoCapture = ({ photos, onPhotosChange, maxPhotos = 5 }) => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const handleFileSelect = (files) => {
    const fileArray = Array.from(files);
    const validFiles = fileArray?.filter(file => 
      file?.type?.startsWith('image/') && file?.size <= 10 * 1024 * 1024 // 10MB limit
    );

    if (validFiles?.length + photos?.length > maxPhotos) {
      alert(`You can only upload up to ${maxPhotos} photos`);
      return;
    }

    const newPhotos = validFiles?.map(file => ({
      id: Date.now() + Math.random(),
      file,
      url: URL.createObjectURL(file),
      name: file?.name,
      size: file?.size,
      type: file?.type
    }));

    onPhotosChange([...photos, ...newPhotos]);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setDragActive(false);
    const files = e?.dataTransfer?.files;
    handleFileSelect(files);
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setDragActive(false);
  };

  const removePhoto = (photoId) => {
    const updatedPhotos = photos?.filter(photo => photo?.id !== photoId);
    onPhotosChange(updatedPhotos);
  };

  const openFileDialog = () => {
    fileInputRef?.current?.click();
  };

  const openCamera = () => {
    cameraInputRef?.current?.click();
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Photo Evidence
        </label>
        <p className="text-sm text-muted-foreground mb-4">
          Add photos to help us understand the issue better. You can upload up to {maxPhotos} images.
        </p>
      </div>
      {/* Upload Area */}
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200
          ${dragActive 
            ? 'border-primary bg-primary/5' :'border-border bg-card hover:border-primary/50'
          }
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full">
              <Icon name="Camera" size={24} className="text-primary" />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-foreground mb-2">
              Add Photos
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Drag and drop images here, or click to select files
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="outline"
              iconName="Upload"
              iconPosition="left"
              iconSize={16}
              onClick={openFileDialog}
            >
              Choose Files
            </Button>
            
            <Button
              variant="outline"
              iconName="Camera"
              iconPosition="left"
              iconSize={16}
              onClick={openCamera}
            >
              Take Photo
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            Supported formats: JPG, PNG, GIF • Max size: 10MB per image
          </p>
        </div>

        {/* Hidden file inputs */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFileSelect(e?.target?.files)}
        />
        
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={(e) => handleFileSelect(e?.target?.files)}
        />
      </div>
      {/* Photo Preview Grid */}
      {photos?.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-foreground">
              Uploaded Photos ({photos?.length}/{maxPhotos})
            </h4>
            {photos?.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                iconName="Trash2"
                iconSize={14}
                onClick={() => onPhotosChange([])}
              >
                Clear All
              </Button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos?.map((photo) => (
              <div
                key={photo?.id}
                className="relative group bg-card border border-border rounded-lg overflow-hidden"
              >
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={photo?.url}
                    alt={`Issue photo ${photo?.name}`}
                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                  />
                </div>
                
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
                
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-6 h-6"
                  onClick={() => removePhoto(photo?.id)}
                  iconName="X"
                  iconSize={12}
                >
                  <span className="sr-only">Remove photo</span>
                </Button>

                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <p className="text-xs truncate">{photo?.name}</p>
                  <p className="text-xs text-gray-300">{formatFileSize(photo?.size)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Photo Guidelines */}
      <div className="p-3 bg-accent/5 border border-accent/20 rounded-md">
        <div className="flex items-center gap-2 mb-2">
          <Icon name="Camera" size={14} className="text-accent" />
          <span className="text-sm font-medium text-accent">Photo Tips</span>
        </div>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Take clear, well-lit photos showing the full extent of the issue</li>
          <li>• Include surrounding context to help locate the problem</li>
          <li>• Multiple angles can provide better understanding</li>
          <li>• Avoid photos with personal information visible</li>
        </ul>
      </div>
    </div>
  );
};

export default PhotoCapture;