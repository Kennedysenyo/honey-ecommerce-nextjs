import { Banner } from "@/components/Banner";

export default function PrivacyPage() {
  const date = new Date().toDateString();
  return (
    <>
      <Banner
        title="Privacy Policy"
        subtitle={`Last Updated: ${date}`}
        image="/images/privacy-banner.jpg"
      />

      <section className="section-py-one">
        <div className="max-w-lg md:max-w-2xl section-px-one mx-auto space-y-12 text-base md:text-lg font-medium leading-8">
          <p>
            At <span className="text-gold">Honey Man</span>, we value your
            privacy and are committed to protecting your personal information.
            This Privacy Policy explains how we collect, use, store, and protect
            your data when you use our website and services.
            <br />
            <br />
            <span className="font-semibold">
              By using our website, you agree to the terms outlined in this
              Privacy Policy.
            </span>
          </p>

          <div>
            <h2 className="font-heading title-two mb-2">
              Information We Collect
            </h2>
            <p className="">
              We may collect the following types of information:
            </p>
            <ol className="list-alphabets">
              <li className="mt-2">
                <span className="font-semibold">a. Personal Information</span>
                <br />
                <span>
                  When you create an account, place an order, or contact us, we
                  may collect:
                  <ul className="list disc-gold translate-x-4">
                    <li>Full name</li>
                    <li>Email address</li>
                    <li>Phone number</li>
                    <li>Delivery address</li>
                  </ul>
                </span>
              </li>

              <li className=" mt-2">
                <span className="font-semibold">b. Account Information</span>
                <br />
                <span>
                  If you sign up:
                  <ul className="list disc-gold translate-x-4">
                    <li>
                      Login credentials (securely handled via authentication
                      systems such as Better Auth)
                    </li>
                    <li>Account preferences</li>
                  </ul>
                </span>
              </li>

              <li className="mt-2">
                <span className="font-semibold">
                  c. Order and Transaction Information
                </span>{" "}
                <br />
                <span>Automatically collected data may include:</span>
                <ul className="translate-x-4 list disc-gold">
                  <li>IP address</li>
                  <li>Browser type</li>
                  <li>Device information</li>
                  <li>Pages visited and interactions</li>
                </ul>
              </li>
            </ol>
          </div>

          <div>
            <h2 className="font-heading title-two mb-2">
              How We Use Your Information
            </h2>
            <p>We use your information to:</p>
            <ul className="list disc-gold">
              <li>Process and fulfill your orders</li>
              <li>Communicate with you about your orders or inquiries</li>
              <li>Provide customer support</li>
              <li>Improve our website and user experience</li>
              <li>
                Send updates, promotions, or important notifications (if you opt
                in)
              </li>
              <li>Prevent fraud and ensure platform security</li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading title-two mb-2">
              Authentication and Security
            </h2>
            <p>
              We use secure authentication systems (such as Better Auth) to
              manage user accounts. Your login credentials are handled securely
              and are not accessible to us in plain form.
            </p>
            <p>
              We implement reasonable security measures to protect your data
              from unauthorized access, loss, or misuse.
            </p>
          </div>

          <div>
            <h2 className="font-heading title-two mb-2">Payments</h2>
            <p>
              All payments are processed through trusted third-party payment
              providers. We do not store your card or payment details on our
              servers.
            </p>
            <p>
              Payment providers may collect and process your data according to
              their own privacy policies.
            </p>
          </div>

          <div>
            <h2 className="font-heading title-three mb-2">
              Cookies and Tracking
            </h2>
            <p>We may use cookies and similar technologies to:</p>
            <ul className="list disc-gold">
              <li>Enhance your browsing experience</li>
              <li>Remember your preferences</li>
              <li>Analyze website traffic and usage</li>
            </ul>
            <p>
              You can choose to disable cookies through your browser settings,
              though this may affect some functionality of the website.
            </p>
          </div>

          <div>
            <h2 className="font-heading title-two mb-2">
              Sharing of Information
            </h2>
            <p>We do not sell your personal data.</p>

            <p>We may share your information with:</p>

            <ul className="list disc-gold">
              <li>Delivery partners (to fulfill your orders)</li>
              <li>Payment processors (to complete transactions)</li>
              <li>Service providers who help us operate the website</li>
            </ul>
            <p>
              These parties are only given the information necessary to perform
              their services.
            </p>
          </div>

          <div>
            <h2 className="font-heading title-two mb-2">Data Retention</h2>
            <p>We retain your information only as long as necessary to:</p>
            <ul className="list disc-gold">
              <li>Fulfill orders</li>
              <li>Comply with legal obligations</li>
              <li>Resolve disputes</li>
            </ul>
            <p>
              You may request deletion of your data at any time (see Section 9).
            </p>
          </div>

          <div>
            <h2 className="font-heading title-two mb-2">Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list disc-gold">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your data</li>
              <li>Withdraw consent for communications</li>
            </ul>
            <p>
              To exercise any of these rights, please contact us using the
              details below.
            </p>
          </div>

          <div>
            <h2 className="font-heading title-two mb-2">Account Deletion</h2>
            <p>If you wish to delete your account, you may:</p>
            <ul className="list disc-gold">
              <li>Use available account settings (if provided), or</li>
              <li>Contact us directly</li>
            </ul>
            <p>
              We will process your request within a reasonable timeframe,
              subject to legal requirements.
            </p>
          </div>

          <div>
            <h2 className="font-heading title-two mb-2">Children's Privacy</h2>
            <p>
              Our services are not intended for individuals under the age of 18.
              We do not knowingly collect personal data from children.
            </p>
          </div>

          <div>
            <h2 className="font-heading title-two mb-2">
              Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page with an updated date.
            </p>
          </div>

          <div>
            <h2 className="font-heading title-two mb-2">Contact Us</h2>
            <p>
              {" "}
              If you have any questions or concerns about this Privacy Policy,
              please contact us:
            </p>
            <ul className="list disc-gold">
              <li>
                <span className="font-semibold">Email:</span>info@honeyman.com
              </li>
              <li>
                <span className="font-semibold">Phone:</span>+233 123 456 789
              </li>
              <li>
                <span className="font-semibold">Location:</span>Somanya, E/R,
                Ghana
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
