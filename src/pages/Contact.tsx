
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Phone, Mail, MapPin, MessageSquare } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Contact & Help Center
            </h1>
            <p className="text-lg text-muted-foreground mb-10">
              Have questions or need assistance? Our team is here to help you. 
              Reach out to us through any of the channels below.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h2 className="text-xl font-semibold mb-6">Send us a message</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="name">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full p-2 rounded-lg border border-border bg-background"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="phone">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full p-2 rounded-lg border border-border bg-background"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="email">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full p-2 rounded-lg border border-border bg-background"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="message">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full p-2 rounded-lg border border-border bg-background"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  <button type="submit" className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                    Send Message
                  </button>
                </form>
              </div>

              <div>
                <div className="bg-card rounded-2xl p-6 border border-border mb-6">
                  <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Phone size={20} className="text-primary mr-3 mt-1" />
                      <div>
                        <p className="font-medium">Phone Support</p>
                        <p className="text-muted-foreground">+91 8955672580</p>
                        <p className="text-sm text-muted-foreground">Mon-Sat: 9am - 6pm</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Mail size={20} className="text-primary mr-3 mt-1" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-muted-foreground">aayusharma1410a@gmail.com</p>
                        <p className="text-sm text-muted-foreground">We'll respond within 24 hours</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MapPin size={20} className="text-primary mr-3 mt-1" />
                      <div>
                        <p className="font-medium">Main Office</p>
                        <p className="text-muted-foreground">596, Barkat Nagar</p>
                        <p className="text-muted-foreground">Jaipur, Rajasthan, India 302015</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-2xl p-6 border border-border">
                  <h2 className="text-xl font-semibold mb-4">Live Chat Support</h2>
                  <div className="flex items-center mb-4">
                    <MessageSquare size={20} className="text-primary mr-3" />
                    <div>
                      <p className="font-medium">Chat with our team</p>
                      <p className="text-sm text-muted-foreground">Available 24/7 for urgent issues</p>
                    </div>
                  </div>
                  <button className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                    Start Live Chat
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 border border-border">
              <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div className="border-b border-border pb-4">
                  <h3 className="font-medium mb-2">How do I sign up for AgriSarthi?</h3>
                  <p className="text-muted-foreground">
                    You can sign up by clicking on the "Login" button in the top-right corner of the website 
                    and then selecting "Create Account". You'll need to provide some basic information to create your account.
                  </p>
                </div>
                <div className="border-b border-border pb-4">
                  <h3 className="font-medium mb-2">Is the AgriSarthi service free to use?</h3>
                  <p className="text-muted-foreground">
                    Yes, basic features of AgriSarthi are free for all farmers. We offer premium services 
                    with advanced features that have a subscription fee.
                  </p>
                </div>
                <div className="border-b border-border pb-4">
                  <h3 className="font-medium mb-2">How accurate are the crop yield predictions?</h3>
                  <p className="text-muted-foreground">
                    Our AI models have shown accuracy rates of 85-90% in predicting crop yields, based on 
                    historical data, weather patterns, and soil quality information.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Can I use AgriSarthi in my local language?</h3>
                  <p className="text-muted-foreground">
                    Yes, AgriSarthi is available in multiple languages including Hindi, English, and several regional languages.
                    You can change your language preference from the settings menu.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
