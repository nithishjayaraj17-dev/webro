'use client';

import { useState } from 'react';
import { Theme } from '@/lib/themes';
import emailjs from '@emailjs/browser';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface BookingFormProps {
  selectedTheme: Theme | null;
  onSuccess?: () => void;
}

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  timeline: string;
  budget: string;
  notes: string;
}

const INITIAL_FORM_STATE: FormData = {
  name: '',
  email: '',
  company: '',
  phone: '',
  timeline: '',
  budget: '',
  notes: '',
};

export function BookingForm({ selectedTheme, onSuccess }: BookingFormProps) {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_STATE);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Initialize EmailJS (make sure to set your public key)
  if (typeof window !== 'undefined') {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '');
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('idle');
    setErrorMessage('');

    try {
      // Validate required fields
      if (!formData.name || !formData.email || !formData.company) {
        setStatus('error');
        setErrorMessage('Please fill in all required fields');
        setIsLoading(false);
        return;
      }

      // Prepare email data
      const emailData = {
        to_email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'nithishjayaraj17@gmail.com',
        from_name: formData.name,
        from_email: formData.email,
        company: formData.company,
        phone: formData.phone || 'Not provided',
        selected_theme: selectedTheme?.name || 'No theme selected',
        timeline: formData.timeline || 'Not specified',
        budget: formData.budget || 'Not specified',
        notes: formData.notes || 'No additional notes',
      };

      // Send email using EmailJS
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
        emailData
      );

      setStatus('success');
      setFormData(INITIAL_FORM_STATE);
      onSuccess?.();
    } catch (error) {
      console.log('[v0] Email submission error:', error);
      setStatus('error');
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Failed to submit booking. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Status Messages */}
      {status === 'success' && (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle className="size-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Thank you! Your booking request has been sent successfully. We&apos;ll
            contact you soon.
          </AlertDescription>
        </Alert>
      )}

      {status === 'error' && (
        <Alert className="bg-red-50 border-red-200">
          <AlertCircle className="size-4 text-red-600" />
          <AlertDescription className="text-red-800">{errorMessage}</AlertDescription>
        </Alert>
      )}

      {/* Selected Theme */}
      {selectedTheme && (
        <div className="p-4 bg-muted rounded-lg border">
          <p className="text-sm text-muted-foreground">Selected Theme</p>
          <p className="font-semibold text-lg">{selectedTheme.name}</p>
          <p className="text-sm text-muted-foreground">{selectedTheme.description}</p>
        </div>
      )}

      {/* Form Fields */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        {/* Name */}
        <div className="sm:col-span-1">
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleInputChange}
            disabled={isLoading}
            required
          />
        </div>

        {/* Email */}
        <div className="sm:col-span-1">
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleInputChange}
            disabled={isLoading}
            required
          />
        </div>

        {/* Company */}
        <div className="sm:col-span-1">
          <label htmlFor="company" className="block text-sm font-medium mb-2">
            Company <span className="text-red-500">*</span>
          </label>
          <Input
            id="company"
            name="company"
            type="text"
            placeholder="Your Company"
            value={formData.company}
            onChange={handleInputChange}
            disabled={isLoading}
            required
          />
        </div>

        {/* Phone */}
        <div className="sm:col-span-1">
          <label htmlFor="phone" className="block text-sm font-medium mb-2">
            Phone Number
          </label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+1 (555) 123-4567"
            value={formData.phone}
            onChange={handleInputChange}
            disabled={isLoading}
          />
        </div>

        {/* Timeline */}
        <div className="sm:col-span-1">
          <label htmlFor="timeline" className="block text-sm font-medium mb-2">
            Project Timeline
          </label>
          <select
            id="timeline"
            name="timeline"
            value={formData.timeline}
            onChange={handleInputChange}
            disabled={isLoading}
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm"
          >
            <option value="">Select timeline</option>
            <option value="ASAP">ASAP</option>
            <option value="1-2 weeks">1-2 weeks</option>
            <option value="1 month">1 month</option>
            <option value="2-3 months">2-3 months</option>
            <option value="3+ months">3+ months</option>
          </select>
        </div>

        {/* Budget */}
        <div className="sm:col-span-1">
          <label htmlFor="budget" className="block text-sm font-medium mb-2">
            Budget Range
          </label>
          <select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleInputChange}
            disabled={isLoading}
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm"
          >
            <option value="">Select budget</option>
            <option value="$1K - $5K">$1K - $5K</option>
            <option value="$5K - $10K">$5K - $10K</option>
            <option value="$10K - $25K">$10K - $25K</option>
            <option value="$25K+">$25K+</option>
          </select>
        </div>
      </div>

      {/* Notes */}
      <div>
        <label htmlFor="notes" className="block text-sm font-medium mb-2">
          Additional Notes
        </label>
        <Textarea
          id="notes"
          name="notes"
          placeholder="Tell us more about your project..."
          value={formData.notes}
          onChange={handleInputChange}
          disabled={isLoading}
          rows={4}
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 size-4 animate-spin" />
            Submitting...
          </>
        ) : (
          'Book This Theme'
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        We&apos;ll review your request and contact you within 24 hours.
      </p>
    </form>
  );
}
