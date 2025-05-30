"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, MessageSquare, Shield, HelpCircle, Loader2 } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setSubmitted(true);
    setIsSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="mx-auto px-4 py-8 max-w-2xl container">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="flex justify-center items-center bg-green-100 rounded-full w-16 h-16">
                <Mail className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <CardTitle>Message Sent Successfully!</CardTitle>
            <CardDescription>
              Thank you for contacting us. We&apos;ll get back to you within 24-48 hours.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={() => setSubmitted(false)} variant="outline">
              Send Another Message
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto px-4 py-8 max-w-4xl container">
      <div className="space-y-8">
        <div className="space-y-4 text-center">
          <h1 className="font-bold text-4xl">Contact Us</h1>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Have questions about our privacy policy, terms of service, or need support? We&apos;re here to help. Choose
            the appropriate category below.
          </p>
        </div>

        <div className="gap-6 grid md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="text-center">
              <Shield className="mx-auto mb-2 w-8 h-8 text-primary" />
              <CardTitle className="text-lg">Privacy & Legal</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-center">
              <p>Questions about data privacy, GDPR requests, or legal matters</p>
              <p className="mt-2 text-muted-foreground">privacy@silver-prince.com</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <HelpCircle className="mx-auto mb-2 w-8 h-8 text-primary" />
              <CardTitle className="text-lg">General Support</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-center">
              <p>Account issues, technical problems, or general inquiries</p>
              <p className="mt-2 text-muted-foreground">support@silver-prince.com</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <MessageSquare className="mx-auto mb-2 w-8 h-8 text-primary" />
              <CardTitle className="text-lg">Content & Community</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-center">
              <p>Report inappropriate content or community guidelines violations</p>
              <p className="mt-2 text-muted-foreground">community@silver-prince.com</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Send us a message</CardTitle>
            <CardDescription>
              Fill out the form below and we&apos;ll get back to you as soon as possible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="gap-4 grid md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="privacy">Privacy & Data Protection</SelectItem>
                    <SelectItem value="account">Account Support</SelectItem>
                    <SelectItem value="technical">Technical Issues</SelectItem>
                    <SelectItem value="content">Content & Community</SelectItem>
                    <SelectItem value="legal">Legal Inquiries</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Brief description of your inquiry"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Please provide details about your inquiry..."
                  className="min-h-[120px]"
                  required
                />
              </div>

              <Alert>
                <Shield className="w-4 h-4" />
                <AlertDescription>
                  Your personal information will be handled according to our{" "}
                  <a href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </a>
                  . We typically respond within 24-48 hours.
                </AlertDescription>
              </Alert>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 w-4 h-4 animate-spin" />}
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
