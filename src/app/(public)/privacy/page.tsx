import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto px-4 py-8 max-w-4xl container">
      <div className="space-y-8">
        <div className="space-y-4 text-center">
          <h1 className="font-bold text-4xl">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          <div className="flex justify-center gap-2">
            <Badge variant="secondary">GDPR Compliant</Badge>
            <Badge variant="secondary">CCPA Compliant</Badge>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>1. Introduction</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              The Silver Prince (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your
              privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when
              you visit our website silver-prince.com and use our services.
            </p>
            <p>
              Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy,
              please do not access the site.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. Information We Collect</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="mb-3 font-semibold">Personal Information You Provide</h4>
              <p className="mb-3">We collect information you voluntarily provide when you:</p>
              <ul className="space-y-1 pl-6 list-disc">
                <li>
                  <strong>Create an account:</strong> Name, email address, password
                </li>
                <li>
                  <strong>Sign in with third-party services:</strong> Profile information from Google or Facebook
                </li>
                <li>
                  <strong>Post comments:</strong> Comment content, timestamp, associated user information
                </li>
                <li>
                  <strong>Contact us:</strong> Any information in your communications
                </li>
                <li>
                  <strong>Update your profile:</strong> Display name, profile preferences
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-3 font-semibold">Authentication Data</h4>
              <p className="mb-3">When you use third-party authentication services, we may receive:</p>
              <ul className="space-y-1 pl-6 list-disc">
                <li>
                  <strong>Google OAuth:</strong> Name, email, profile picture, Google ID
                </li>
                <li>
                  <strong>Facebook OAuth:</strong> Name, email, profile picture, Facebook ID
                </li>
                <li>
                  <strong>Firebase Auth:</strong> User ID, authentication tokens, verification status
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-3 font-semibold">Automatically Collected Information</h4>
              <ul className="space-y-1 pl-6 list-disc">
                <li>IP address and location data</li>
                <li>Browser type and version</li>
                <li>Device information</li>
                <li>Pages visited and time spent</li>
                <li>Referral sources</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </div>

            <div>
              <h4 className="mb-3 font-semibold">User-Generated Content</h4>
              <ul className="space-y-1 pl-6 list-disc">
                <li>Comments and discussions posted on our platform</li>
                <li>Timestamps and metadata associated with your posts</li>
                <li>Interaction data (likes, replies, etc.)</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. How We Use Your Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>We use the information we collect for the following purposes:</p>

            <div className="gap-4 grid">
              <div className="p-4 border rounded-lg">
                <h5 className="mb-2 font-semibold">Account Management</h5>
                <ul className="space-y-1 pl-6 text-sm list-disc">
                  <li>Create and maintain your user account</li>
                  <li>Authenticate your identity</li>
                  <li>Send email verification and password reset emails</li>
                  <li>Provide customer support</li>
                </ul>
              </div>

              <div className="p-4 border rounded-lg">
                <h5 className="mb-2 font-semibold">Service Provision</h5>
                <ul className="space-y-1 pl-6 text-sm list-disc">
                  <li>Display your comments and user-generated content</li>
                  <li>Enable community features and discussions</li>
                  <li>Personalize your experience</li>
                  <li>Provide access to novels, blogs, and announcements</li>
                </ul>
              </div>

              <div className="p-4 border rounded-lg">
                <h5 className="mb-2 font-semibold">Communication</h5>
                <ul className="space-y-1 pl-6 text-sm list-disc">
                  <li>Send important service notifications</li>
                  <li>Respond to your inquiries and support requests</li>
                  <li>Send updates about new content (with your consent)</li>
                </ul>
              </div>

              <div className="p-4 border rounded-lg">
                <h5 className="mb-2 font-semibold">Analytics and Improvement</h5>
                <ul className="space-y-1 pl-6 text-sm list-disc">
                  <li>Analyze website usage and performance</li>
                  <li>Improve our services and user experience</li>
                  <li>Monitor for security threats and abuse</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. Information Sharing and Disclosure</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-yellow-50 p-4 border border-yellow-200 rounded-lg">
              <h5 className="mb-2 font-semibold">🔍 Public Information</h5>
              <p className="text-sm">
                <strong>Your comments are publicly visible</strong> to all users of our website. This includes your
                display name and the content of your comments. Please be mindful of what information you share in public
                comments.
              </p>
            </div>

            <h4 className="font-semibold">We may share your information in the following situations:</h4>

            <ul className="space-y-2 pl-6 list-disc">
              <li>
                <strong>Public Comments:</strong> Your display name and comments are visible to all users
              </li>
              <li>
                <strong>Service Providers:</strong> With trusted third parties who help us operate our website
                (Firebase, Google Analytics)
              </li>
              <li>
                <strong>Legal Requirements:</strong> When required by law or to protect our rights
              </li>
              <li>
                <strong>Business Transfers:</strong> In connection with a merger, sale, or acquisition
              </li>
              <li>
                <strong>Consent:</strong> With your explicit consent for other purposes
              </li>
            </ul>

            <p className="mt-4 text-muted-foreground text-sm">
              We do not sell, trade, or rent your personal information to third parties for marketing purposes.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5. Data Storage and Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="mb-3 font-semibold">Where We Store Your Data</h4>
              <ul className="space-y-1 pl-6 list-disc">
                <li>
                  <strong>Firebase Firestore:</strong> User profiles, comments, and application data
                </li>
                <li>
                  <strong>Firebase Authentication:</strong> Login credentials and authentication tokens
                </li>
                <li>
                  <strong>Google Cloud Platform:</strong> Hosting and data processing
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-3 font-semibold">Security Measures</h4>
              <ul className="space-y-1 pl-6 list-disc">
                <li>Encryption in transit and at rest</li>
                <li>Secure authentication protocols</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and monitoring</li>
                <li>Email verification for account security</li>
              </ul>
            </div>

            <div className="bg-blue-50 p-4 border border-blue-200 rounded-lg">
              <p className="text-sm">
                <strong>Note:</strong> While we implement robust security measures, no method of transmission over the
                internet is 100% secure. We cannot guarantee absolute security of your data.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>6. Your Privacy Rights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Depending on your location, you may have the following rights:</p>

            <div className="gap-4 grid">
              <div className="p-4 border rounded-lg">
                <h5 className="mb-2 font-semibold">Access and Portability</h5>
                <p className="text-sm">Request a copy of your personal data and download your information</p>
              </div>

              <div className="p-4 border rounded-lg">
                <h5 className="mb-2 font-semibold">Correction</h5>
                <p className="text-sm">Update or correct inaccurate personal information</p>
              </div>

              <div className="p-4 border rounded-lg">
                <h5 className="mb-2 font-semibold">Deletion</h5>
                <p className="text-sm">Request deletion of your personal data (subject to legal requirements)</p>
              </div>

              <div className="p-4 border rounded-lg">
                <h5 className="mb-2 font-semibold">Restriction</h5>
                <p className="text-sm">Limit how we process your personal information</p>
              </div>

              <div className="p-4 border rounded-lg">
                <h5 className="mb-2 font-semibold">Objection</h5>
                <p className="text-sm">Object to certain types of processing</p>
              </div>
            </div>

            <div className="bg-green-50 p-4 border border-green-200 rounded-lg">
              <h5 className="mb-2 font-semibold">How to Exercise Your Rights</h5>
              <p className="text-sm">
                To exercise any of these rights, please contact us at privacy@silver-prince.com. We will respond to your
                request within 30 days.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>7. Cookies and Tracking</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>We use cookies and similar technologies to:</p>
            <ul className="space-y-1 pl-6 list-disc">
              <li>Maintain your login session</li>
              <li>Remember your preferences</li>
              <li>Analyze website usage</li>
              <li>Improve website performance</li>
            </ul>

            <div className="bg-gray-50 p-4 border rounded-lg">
              <h5 className="mb-2 font-semibold">Types of Cookies We Use</h5>
              <ul className="space-y-1 text-sm">
                <li>
                  <strong>Essential:</strong> Required for website functionality
                </li>
                <li>
                  <strong>Authentication:</strong> Keep you logged in
                </li>
                <li>
                  <strong>Analytics:</strong> Help us understand usage patterns
                </li>
                <li>
                  <strong>Preferences:</strong> Remember your settings
                </li>
              </ul>
            </div>

            <p className="text-sm">
              You can control cookies through your browser settings, but disabling certain cookies may affect website
              functionality.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>8. Children&apos;s Privacy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Our Service is not intended for children under 13 years of age. We do not knowingly collect personal
              information from children under 13. If you are a parent or guardian and believe your child has provided us
              with personal information, please contact us.
            </p>
            <p>
              If we discover that a child under 13 has provided us with personal information, we will delete such
              information from our servers immediately.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>9. International Data Transfers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Your information may be transferred to and processed in countries other than your own. These countries may
              have different data protection laws than your jurisdiction.
            </p>
            <p>
              We ensure appropriate safeguards are in place to protect your personal information in accordance with
              applicable data protection laws.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>10. Data Retention</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>We retain your personal information for as long as necessary to:</p>
            <ul className="space-y-1 pl-6 list-disc">
              <li>Provide our services to you</li>
              <li>Comply with legal obligations</li>
              <li>Resolve disputes</li>
              <li>Enforce our agreements</li>
            </ul>

            <div className="bg-gray-50 p-4 border rounded-lg">
              <h5 className="mb-2 font-semibold">Specific Retention Periods</h5>
              <ul className="space-y-1 text-sm">
                <li>
                  <strong>Account Data:</strong> Until account deletion
                </li>
                <li>
                  <strong>Comments:</strong> Indefinitely (unless deleted by user or us)
                </li>
                <li>
                  <strong>Analytics Data:</strong> 26 months
                </li>
                <li>
                  <strong>Security Logs:</strong> 12 months
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>11. Changes to This Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page and updating the &quot;Last updated&quot; date.
            </p>
            <p>
              For significant changes, we may provide additional notice such as email notification or a prominent notice
              on our website.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>12. Contact Us</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
            <div className="bg-muted p-4 rounded-lg">
              <p>
                <strong>The Silver Prince - Privacy Team</strong>
              </p>
              <p>Email: privacy@silver-prince.com</p>
              <p>Website: silver-prince.com</p>
              <p>Response Time: Within 30 days</p>
            </div>

            <div className="text-muted-foreground text-sm">
              <p>
                For EU residents: You also have the right to lodge a complaint with your local data protection
                authority.
              </p>
            </div>
          </CardContent>
        </Card>

        <Separator />

        <div className="space-y-4 text-center">
          <div className="text-muted-foreground text-sm">
            <p>
              This Privacy Policy is effective as of the date stated above and will remain in effect except with respect
              to any changes in its provisions in the future.
            </p>
          </div>

          <div className="flex justify-center gap-4 text-sm">
            <Link href="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/contact" className="text-primary hover:underline">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
