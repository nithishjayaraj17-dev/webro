'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, AlertCircle, CheckCircle } from 'lucide-react';

const FORMSPREE_ID = 'xojbpjde';

interface BookingFormProps {
  selectedTheme: string;
  onSuccess: () => void;
}

export function BookingFormNew({ selectedTheme, onSuccess }: BookingFormProps) {
  const [formData, setFormData] = useState({
    clientName: '',
    phone: '',
    fileName: ''
  });
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        setErrorMessage('File size must be less than 5MB');
        return;
      }
      setFile(selectedFile);
      setFormData(prev => ({ ...prev, fileName: selectedFile.name }));
      setErrorMessage('');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      if (droppedFile.size > 5 * 1024 * 1024) {
        setErrorMessage('File size must be less than 5MB');
        return;
      }
      setFile(droppedFile);
      setFormData(prev => ({ ...prev, fileName: droppedFile.name }));
      setErrorMessage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.clientName || !formData.phone) {
      setErrorMessage('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const submitFormData = new FormData();
      submitFormData.append('_subject', `New Theme Booking - ${selectedTheme}`);
      submitFormData.append('_replyto', formData.clientName);
      submitFormData.append('Client Name', formData.clientName);
      submitFormData.append('Phone Number', formData.phone);
      submitFormData.append('Selected Theme', selectedTheme);
      submitFormData.append('Reference Image', file ? formData.fileName : 'No image uploaded');

      if (file) {
        submitFormData.append('attachment', file);
      }

      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: submitFormData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ clientName: '', phone: '', fileName: '' });
        setFile(null);
        setTimeout(() => {
          onSuccess();
        }, 2000);
      } else {
        setSubmitStatus('error');
        setErrorMessage('Failed to submit form. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Theme Display */}
      <div className="p-4 rounded-lg bg-card border border-border">
        <p className="text-xs text-muted-foreground mb-1">Selected Theme</p>
        <p className="text-lg font-semibold text-primary">{selectedTheme || 'No theme selected'}</p>
      </div>

      {/* Client Name */}
      <div>
        <label htmlFor="clientName" className="block text-sm font-medium text-foreground mb-2">
          Client Name *
        </label>
        <Input
          id="clientName"
          name="clientName"
          type="text"
          placeholder="John Doe"
          value={formData.clientName}
          onChange={handleInputChange}
          className="bg-card border-border text-foreground placeholder:text-muted-foreground"
          required
        />
      </div>

      {/* Phone Number */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
          Phone Number *
        </label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder="+1 (555) 123-4567"
          value={formData.phone}
          onChange={handleInputChange}
          className="bg-card border-border text-foreground placeholder:text-muted-foreground"
          required
        />
      </div>

      {/* File Upload */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Reference Image (Optional)
        </label>
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="relative group"
        >
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*,application/pdf"
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          <div className="flex flex-col items-center justify-center gap-3 p-8 rounded-lg border-2 border-dashed border-border group-hover:border-primary/50 bg-card/50 transition-colors">
            <Upload className="w-6 h-6 text-muted-foreground group-hover:text-primary/70 transition-colors" />
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">
                {file ? file.name : 'Drag and drop your file here'}
              </p>
              <p className="text-xs text-muted-foreground">
                {file ? 'Click to change' : 'or click to select'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="flex gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
          <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
          <p className="text-sm text-destructive">{errorMessage}</p>
        </div>
      )}

      {/* Success Message */}
      {submitStatus === 'success' && (
        <div className="flex gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-green-500">Booking submitted successfully!</p>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting || !selectedTheme || !formData.clientName || !formData.phone}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Booking'}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        We&apos;ll review your request and contact you within 24 hours.
      </p>
    </form>
  );
}
