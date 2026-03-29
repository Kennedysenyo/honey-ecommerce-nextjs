import { Banner } from "@/components/Banner";

export default function TermsPage() {
  const date = new Date().toDateString();

  return (
    <>
      <Banner
        title="Term & Conditions"
        subtitle={`Last updated: ${date}`}
        image="/images/terms-banner.jpg"
      />

      <section className="section-py-one">
        <div className="max-w-lg md:max-w-2xl section-px-one mx-auto space-y-12 text-base md:text-lg font-medium leading-8">
          <p className="">
            <span className="font-bold ">Welcome</span> to{" "}
            <span className="text-gold font-medium">Honey Man</span>. These
            Terms and Conditions govern your use of our website and services. By
            accessing or using our website, placing an order, or interacting
            with any part of our platform, you agree to be bound by these terms.{" "}
            <br /> <br />{" "}
            <span className="font-semibold">
              If you do not agree with any part of these Terms and Conditions,
              please do not use our website
            </span>
            .
          </p>

          <div>
            <h2 className="title-two font-heading mb-2">About</h2>
            <p className="">
              <span className="text-gold font-medium">Honey Man</span> is an
              online platform that offers natural honey and related products for
              sale. We also provide information and services related to our
              products and operations.
            </p>
          </div>

          <div>
            <h2 className="title-two font-heading mb-2">Eligibility</h2>

            <p>By using this website, you confirm that:</p>
            <ul className="list disc-gold">
              <li>
                You are at least 18 years old, or using the website under the
                supervision of a parent or legal guardian.
              </li>
              <li>
                You have the legal capacity to enter into a binding agreement.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading title-two mb-2">Use of the Website</h2>
            <p>
              You agree to use this website only for lawful purposes. You must
              not:
            </p>
            <ul className="list disc-gold">
              <li>
                Use the website in any way that may damage or disrupt its
                functionality.
              </li>
              <li>
                Attempt to gain unauthorized access to any part of the system.
              </li>
              <li>Use the platform for fraudulent or harmful activities.</li>
            </ul>
            <p>
              We reserve the right to suspend or terminate access if misuse is
              detected.
            </p>
          </div>

          <div>
            <h2 className="font-heading title-two mb-2">
              Products and Availability
            </h2>
            <p>
              We specialize in natural honey and related products. While we
              strive to ensure accuracy:
            </p>
            <ul className="list disc-gold">
              <li>
                Product descriptions, images, and pricing may be updated at any
                time without notice.
              </li>
              <li>
                Availability of products is not guaranteed and may change.
              </li>
              <p>
                We reserve the right to discontinue any product at any time.
              </p>
            </ul>
          </div>

          <div>
            <h2 className="font-heading title-three mb-2">
              Orders and Acceptance
            </h2>
            <p>When you place an order:</p>
            <ul className="list disc-gold">
              <li>
                You agree that all information provided is accurate and
                complete.
              </li>
              <li>Your order is considered an offer to purchase.</li>
            </ul>
            <p>We reserve the right to:</p>
            <ul className="list disc-gold">
              <li>Accept or reject any order at our discretion.</li>
              <li>
                Cancel orders due to pricing errors, stock issues, or suspected
                fraud.
              </li>
            </ul>
            <p>
              If your order is canceled after payment, you will be refunded
              accordingly.
            </p>
          </div>

          <div>
            <h2 className="font-heading title-three mb-2">
              Pricing and Payments
            </h2>
            <p>
              All prices are listed in Ghana Cedis (GHS) unless stated
              otherwise.
            </p>
            <p>
              Payments must be completed through our approved payment methods.
              By making a payment, you confirm that:
            </p>
            <ul className="list disc-gold">
              <li>You are authorized to use the payment method provided.</li>
              <li>The information submitted is accurate.</li>
            </ul>
            <p>We do not store sensitive payment information.</p>
          </div>

          <div>
            <h2 className="font-heading title-two mb-2">
              Delivery and Shipping
            </h2>
            <p>We aim to process and deliver orders promptly. However:</p>
            <ul className="list disc-gold">
              <li>
                Delivery times are estimates and may vary depending on location.
              </li>
              <li>
                We are not responsible for delays caused by third-party
                logistics providers.
              </li>
            </ul>
            <p>Risk of loss or damage transfers to you upon delivery.</p>
          </div>

          <div>
            <h2 className="font-heading title-two mb-2">Returns and Refunds</h2>
            <p>Due to the nature of our products (consumable goods):</p>
            <ul className="list disc-gold">
              <li>
                Returns may only be accepted for defective or incorrect items.
              </li>
              <li>
                Requests must be made within <b>48 hours</b> of delivery.
              </li>
            </ul>
            <p>
              Approved refunds will be processed using the original payment
              method within a reasonable timeframe.
            </p>
          </div>

          <div>
            <h2 className="font-heading title-two">User Accounts</h2>
            <p>If you create an account on our platform:</p>
            <ul className="list disc-gold">
              <li>
                You are responsible for maintaining the confidentiality of your
                login details.
              </li>
              <li>
                You agree to accept responsibility for all activities under your
                account.
              </li>
            </ul>
            <p>
              We reserve the right to suspend or terminate accounts that violate
              these terms.
            </p>
          </div>

          <div>
            <h2 className="font-heading title-two mb-2">
              Intellectual Property
            </h2>
            <p>To the fullest extent permitted by law:</p>
            <ul className="list disc-gold">
              <li>
                We are not liable for any indirect, incidental, or consequential
                damages arising from your use of the website or products.
              </li>
              <li>
                Our liability is limited to the amount paid for the product in
                question.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading title-three mb-2">
              Limitation of Liability
            </h2>
            <p>To the fullest extent permitted by law:</p>
            <ul className="list disc-gold">
              <li>
                We are not liable for any indirect, incidental, or consequential
                damages arising from your use of the website or products
              </li>
              <li>
                Our liability is limited to the amount paid for the product in
                question.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading title-three mb-2">Health Disclaimer</h2>
            <p>
              Our honey products are natural and intended for general
              consumption. However:
            </p>
            <ul className="list disc-gold">
              <li>We do not provide medical advice.</li>
              <li>
                Individuals with allergies or specific health conditions should
                consult a professional before use.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading title-three mb-2">Privacy</h2>
            <p>
              Your use of our website is also governed by our Privacy Policy,
              which explains how we collect and use your data
            </p>
          </div>

          <div>
            <h2 className="font-heading title-three mb-2">
              Changes to These Terms
            </h2>
            <p>
              We reserve the right to update or modify these Terms and
              Conditions at any time. Changes will take effect immediately upon
              posting.
            </p>
            <p>It is your responsibility to review this page periodically.</p>
          </div>

          <div>
            <h2 className="font-heading title-three">Governing Law</h2>
            <p>These Terms and Conditions are governed by the laws of Ghana</p>
          </div>

          <div>
            <h2 className="font-heading title-three mb-2">Contact Us</h2>
            <p>
              If you have any questions about these Terms and Conditions, please
              contact us:
            </p>
            <ul className="list disc-gold">
              <li>
                <span className="font-semibold">Email</span>: info@honeyman.com
              </li>
              <li>
                <span className="font-semibold">Phone</span>: +233 123 456 789
              </li>
              <li>
                <span className="font-semibold">Location</span>: Somanya, E/R,
                Ghana
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
