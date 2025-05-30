import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function TermsOfServicePage() {
  return (
    <div className="mx-auto px-4 py-8 max-w-4xl container">
      <div className="space-y-8">
        <div className="space-y-4 text-center">
          <h1 className="font-bold text-4xl">Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>1. Acceptance of Terms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              By accessing and using The Silver Prince website (&quot;Service&quot;), you accept and agree to be bound
              by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use
              this service.
            </p>
            <p>
              These Terms of Service (&quot;Terms&quot;) govern your use of our website located at silver-prince.com
              (the &quot;Service&quot;) operated by The Silver Prince (&quot;us&quot;, &quot;we&quot;, or
              &quot;our&quot;).
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. Description of Service</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              The Silver Prince is a platform for sharing novels, blogs, and literary content. Our services include:
            </p>
            <ul className="space-y-2 pl-6 list-disc">
              <li>Access to novels and literary content</li>
              <li>Blog posts and announcements</li>
              <li>User account creation and management</li>
              <li>Community features including comments and discussions</li>
              <li>User-generated content sharing</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. User Accounts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h4 className="font-semibold">Account Creation</h4>
            <p>To access certain features of our Service, you must register for an account. You may register using:</p>
            <ul className="space-y-1 pl-6 list-disc">
              <li>Email and password</li>
              <li>Google OAuth</li>
              <li>Facebook OAuth</li>
            </ul>

            <h4 className="font-semibold">Account Responsibilities</h4>
            <p>You are responsible for:</p>
            <ul className="space-y-1 pl-6 list-disc">
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized use</li>
              <li>Providing accurate and complete information</li>
              <li>Keeping your account information updated</li>
            </ul>

            <h4 className="font-semibold">Email Verification</h4>
            <p>
              You must verify your email address to access certain features. We may restrict access to unverified
              accounts.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. User-Generated Content and Comments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h4 className="font-semibold">Comment System</h4>
            <p>
              Our website features a public comment system where users can share their thoughts and engage in
              discussions. By posting comments, you agree that:
            </p>
            <ul className="space-y-1 pl-6 list-disc">
              <li>Your comments will be publicly visible to all users</li>
              <li>You retain ownership of your content but grant us a license to display it</li>
              <li>You will not post inappropriate, offensive, or illegal content</li>
              <li>We reserve the right to moderate, edit, or remove comments</li>
            </ul>

            <h4 className="font-semibold">Prohibited Content</h4>
            <p>You may not post content that:</p>
            <ul className="space-y-1 pl-6 list-disc">
              <li>Is illegal, harmful, threatening, abusive, or defamatory</li>
              <li>Contains hate speech, discrimination, or harassment</li>
              <li>Infringes on intellectual property rights</li>
              <li>Contains spam, advertising, or promotional material</li>
              <li>Includes personal information of others without consent</li>
              <li>Contains malicious code or links</li>
            </ul>

            <h4 className="font-semibold">Content Moderation</h4>
            <p>
              We reserve the right to review, moderate, and remove any user-generated content at our discretion. We may
              also suspend or terminate accounts that violate these terms.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5. Data Collection and Privacy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              We collect and process personal information as described in our{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
              . This includes:
            </p>
            <ul className="space-y-1 pl-6 list-disc">
              <li>Account information (name, email, profile data)</li>
              <li>Authentication data from third-party providers</li>
              <li>Comments and user-generated content</li>
              <li>Usage analytics and website interaction data</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>6. Intellectual Property</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h4 className="font-semibold">Our Content</h4>
            <p>
              All content on The Silver Prince, including novels, blogs, design, and code, is owned by us or our
              licensors and is protected by copyright and other intellectual property laws.
            </p>

            <h4 className="font-semibold">User Content</h4>
            <p>
              You retain ownership of content you post, but grant us a non-exclusive, worldwide, royalty-free license to
              use, display, and distribute your content on our platform.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>7. Prohibited Uses</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>You may not use our Service:</p>
            <ul className="space-y-1 pl-6 list-disc">
              <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
              <li>
                To violate any international, federal, provincial, or state regulations, rules, laws, or local
                ordinances
              </li>
              <li>
                To infringe upon or violate our intellectual property rights or the intellectual property rights of
                others
              </li>
              <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
              <li>To submit false or misleading information</li>
              <li>To upload or transmit viruses or any other type of malicious code</li>
              <li>To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
              <li>For any obscene or immoral purpose</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>8. Account Termination</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              We reserve the right to terminate or suspend your account and bar access to the Service immediately,
              without prior notice or liability, for any reason whatsoever, including without limitation if you breach
              the Terms.
            </p>
            <p>
              Upon termination, your right to use the Service will cease immediately. If you wish to terminate your
              account, you may simply discontinue using the Service or contact us for account deletion.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>9. Disclaimers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              The information on this website is provided on an &quot;as is&quot; basis. To the fullest extent permitted
              by law, this Company excludes all representations, warranties, conditions and terms.
            </p>
            <p>
              We do not guarantee the accuracy, completeness, or usefulness of user-generated content, including
              comments and discussions posted by other users.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>10. Limitation of Liability</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              In no event shall The Silver Prince, nor its directors, employees, partners, agents, suppliers, or
              affiliates, be liable for any indirect, incidental, punitive, consequential, or special damages, including
              without limitation loss of profits, data, use, goodwill, or other intangible losses.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>11. Changes to Terms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision
              is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
            </p>
            <p>
              What constitutes a material change will be determined at our sole discretion. By continuing to access or
              use our Service after those revisions become effective, you agree to be bound by the revised terms.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>12. Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>If you have any questions about these Terms of Service, please contact us at:</p>
            <div className="bg-muted p-4 rounded-lg">
              <p>
                <strong>The Silver Prince</strong>
              </p>
              <p>Email: legal@silver-prince.com</p>
              <p>Website: silver-prince.com</p>
            </div>
          </CardContent>
        </Card>

        <Separator />

        <div className="text-muted-foreground text-sm text-center">
          <p>
            By using The Silver Prince, you acknowledge that you have read and understood these Terms of Service and
            agree to be bound by them.
          </p>
        </div>
      </div>
    </div>
  );
}
