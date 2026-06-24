import { MapPin, Phone, Mail, Instagram } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export function ContactPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="mx-auto flex-1 w-full max-w-[1200px] px-4 py-12 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl">
            Get in <span className="text-primary">Touch</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you're looking to rent, buy, or sell, we are here to help you find the perfect property in Coimbatore.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
          {/* Contact Information */}
          <section className="flex flex-col gap-8">
            <div className="rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-card)]">
              <h2 className="mb-6 font-display text-2xl font-bold">Contact Details</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Office Address</h3>
                    <p className="mt-1 text-muted-foreground">
                      Coimbatore RS Puram
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Phone & WhatsApp</h3>
                    <p className="mt-1 text-muted-foreground">+91 86081 77777</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email Address</h3>
                    <a href="mailto:onecoimbatore@gmail.com" className="mt-1 inline-block text-primary hover:underline">
                      onecoimbatore@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Inquiry Form */}
          <section>
            <div className="rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-card)] sm:p-10">
              <div className="mb-8">
                <h2 className="font-display text-3xl font-bold">Property Inquiry</h2>
                <p className="mt-2 text-muted-foreground">Looking for a specific property? Fill out the form below.</p>
              </div>
              
              <form className="grid gap-6 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Name</label>
                  <input type="text" id="name" className="w-full rounded-xl border border-input bg-transparent px-4 py-3 text-sm shadow-sm outline-none transition-colors focus:border-primary" placeholder="John Doe" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="place" className="text-sm font-medium">Place</label>
                  <input type="text" id="place" className="w-full rounded-xl border border-input bg-transparent px-4 py-3 text-sm shadow-sm outline-none transition-colors focus:border-primary" placeholder="E.g. Govinda Salai" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact" className="text-sm font-medium">Contact Details</label>
                  <input type="text" id="contact" className="w-full rounded-xl border border-input bg-transparent px-4 py-3 text-sm shadow-sm outline-none transition-colors focus:border-primary" placeholder="+91 86081 77777" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <input type="email" id="email" className="w-full rounded-xl border border-input bg-transparent px-4 py-3 text-sm shadow-sm outline-none transition-colors focus:border-primary" placeholder="onecoimbatore@gmail.com" />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <label htmlFor="comments" className="text-sm font-medium">Comments</label>
                  <textarea id="comments" rows={4} className="w-full resize-none rounded-xl border border-input bg-transparent px-4 py-3 text-sm shadow-sm outline-none transition-colors focus:border-primary" placeholder="Tell us what you are looking for..." />
                </div>

                <button type="submit" className="mt-2 w-full rounded-xl bg-primary py-3.5 font-semibold text-primary-foreground shadow-[var(--shadow-lift)] transition-transform active:scale-95 sm:col-span-2">
                  Submit Inquiry
                </button>
              </form>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
