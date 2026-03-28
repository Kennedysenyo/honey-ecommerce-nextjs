import { Banner } from "@/components/Banner";
import { Mail, MapPin, Phone, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <>
      <Banner
        title="Get in Touch"
        subtitle="Have questions about our honey? We'd love to hear from you."
        image="/images/contact-banner.jpg"
      />

      <section className="section-py-one bg-linear-to-br from-cream to-background">
        <div className="section-max-w section-px-one mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8 h-fit">
              <h2 className="font-heading title-two">Contact Information</h2>
              <p className="max-w-md leading-6 font-medium text-lg">
                Whether you're a customer, potential partner, or just curious
                about our honey, we're here to help. Reach out to us through any
                of these channels.
              </p>

              <ul className="space-y-6 ">
                <li className="flex items-start gap-4 bg-background p-4 rounded-2xl shadow-md">
                  <span className="p-3 rounded-full gradient-to-br">
                    <MapPin className="icon2 text-cream" />
                  </span>
                  <div>
                    <p className="font-semibold text-lg">Our Location</p>
                    <p className="font-medium text-lg">Somanya, E/R, Ghana</p>
                    <p className="font-medium text-lg">West Africa</p>
                  </div>
                </li>
                <li className="flex items-start gap-4 bg-background p-4 rounded-2xl shadow-md">
                  <span className="p-3 rounded-full gradient-to-br">
                    <Phone className="icon2 text-cream" />
                  </span>
                  <div>
                    <p className="font-semibold text-lg">Phone</p>
                    <p className="font-medium text-lg">+233 123 456 789</p>
                  </div>
                </li>
                <li className="flex items-start gap-4 bg-background p-4 rounded-2xl shadow-md">
                  <span className="p-3 rounded-full gradient-to-br">
                    <Mail className="icon2 text-cream" />
                  </span>
                  <div>
                    <p className="font-semibold text-lg">Email</p>
                    <p className="font-medium text-lg">info@ghoneyman.com</p>
                  </div>
                </li>
              </ul>

              <div className="space-y-2 p-6 rounded-2xl gradient-to-br text-cream">
                <h4 className="font-heading title-four text-background">
                  Business Hours
                </h4>
                <ul className="space-y-1">
                  <li className="font-medium text-lg">
                    Monday - Friday: 8:00 AM - 6:00 PM
                  </li>
                  <li className="font-medium text-lg">
                    Saturday: 9:00 AM - 4:00 PM
                  </li>
                  <li className="font-medium text-lg">Sunday: Closed</li>
                </ul>
              </div>
            </div>

            <div className="bg-background p-8 rounded-2xl shadow-lg">
              <form className="space-y-6">
                <h2 className="font-heading title-two">Send Us a Message</h2>
                <div className="space-y-6">
                  <div className="space-y-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="font-semibold text-base block mb-2"
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        id="name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-lg placehold:font-medium placeholder:text-semibold focus:outline-none focus:ring-1 focus:ring-gold"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="font-semibold text-base block mb-2"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="john@example.com"
                        id="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-lg placehold:font-medium placeholder:text-semibold focus:outline-none focus:ring-1 focus:ring-gold"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="subject"
                        className="font-semibold text-base block mb-2"
                      >
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        placeholder="Product inquiry"
                        id="subject"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-lg placehold:font-medium placeholder:text-semibold focus:outline-none focus:ring-1 focus:ring-gold"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="font-semibold text-base block mb-2"
                      >
                        Message
                      </label>
                      <textarea
                        name="subject"
                        id="message"
                        placeholder="Tell us how we can help you..."
                        rows={5}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-lg placehold:font-medium placeholder:text-semibold focus:outline-none focus:ring-1 focus:ring-gold resize-none "
                      ></textarea>
                    </div>
                  </div>
                  <button className="flex w-full justify-center items-center gap-2 rounded-full bg-gold hover:bg-amber hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 cursor-pointer transition-all duration-300 px-8 py-4 text-cream leading-tight">
                    Send Message <Send className="icon3" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
