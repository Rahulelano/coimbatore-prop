import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { ArrowRight, Search, Building, CheckCircle2 } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { PROPERTIES } from "@/lib/properties";
import { PropertyCard } from "@/components/PropertyCard";

const HERO_IMAGES = [
  "/hero_house.png",
  "/hero_house_2.png",
  "/hero_house_3.png"
];

export function HomePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Interactive Hero Slider */}
        <section className="relative w-full overflow-hidden">
          <Carousel 
            opts={{ loop: true }} 
            plugins={[Autoplay({ delay: 5000, stopOnInteraction: false })]}
            className="w-full"
          >
            <CarouselContent>
              {HERO_IMAGES.map((img, index) => (
                <CarouselItem key={index}>
                  <div className="relative h-[75vh] w-full lg:h-[85vh]">
                    <img 
                      src={img} 
                      alt={`Premium Property ${index + 1}`} 
                      className="absolute inset-0 h-full w-full object-cover brightness-[0.4]"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* Custom overlaid controls */}
            <div className="absolute inset-x-8 top-1/2 z-20 flex -translate-y-1/2 justify-between px-4 pointer-events-none hidden md:flex">
              <CarouselPrevious className="pointer-events-auto relative left-0 top-0 translate-x-0 translate-y-0 border-none bg-background/20 text-white backdrop-blur hover:bg-background/40 hover:text-white" />
              <CarouselNext className="pointer-events-auto relative right-0 top-0 translate-x-0 translate-y-0 border-none bg-background/20 text-white backdrop-blur hover:bg-background/40 hover:text-white" />
            </div>
          </Carousel>

          {/* Hero Content Overlay */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center pointer-events-none">
            <div className="mx-auto max-w-4xl pointer-events-auto">
              <h1 className="font-display text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
                Find Your Dream <br className="hidden sm:block" />
                <span className="text-primary drop-shadow-lg">Property in Coimbatore</span>
              </h1>
              
              <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90 sm:text-xl">
                Home rent and land & property sales. Proudly serving you in real estate.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link 
                  to="/properties" 
                  className="flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-transform hover:-translate-y-1 active:scale-95"
                >
                  <Search className="h-5 w-5" /> Browse Properties
                </Link>
                <Link 
                  to="/contact" 
                  className="flex items-center gap-2 rounded-full border border-white/30 bg-black/30 backdrop-blur-md px-8 py-4 text-base font-semibold text-white shadow-sm transition-colors hover:bg-white/20 active:scale-95"
                >
                  <Building className="h-5 w-5" /> Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Properties Section */}
        <section className="py-24 px-4 lg:px-8 max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="font-display text-4xl font-bold tracking-tight">Featured Listings</h2>
              <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
                Take a glimpse at some of our most exclusive properties available for rent and sale.
              </p>
            </div>
            <Link 
              to="/properties" 
              className="flex shrink-0 items-center gap-2 font-semibold text-primary hover:underline"
            >
              View All Properties <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PROPERTIES.slice(0, 3).map((property) => (
              <PropertyCard key={property.id} property={property} onHover={() => {}} />
            ))}
          </div>
        </section>

        {/* About Us Glimpse Section */}
        <section className="border-t border-border bg-card/50 py-24">
          <div className="mx-auto max-w-[1200px] px-4 lg:px-8">
            <div className="grid gap-16 lg:grid-cols-2 items-center">
              <div className="space-y-6">
                <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
                  About Us
                </div>
                <h2 className="font-display text-4xl font-bold leading-tight sm:text-5xl">
                  Your Trusted Partner in <span className="text-primary">Real Estate</span>
                </h2>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  We specialize in helping individuals and families find their perfect spaces in the Coimbatore market. From premium rental homes to valuable land and property sales, we ensure a seamless, transparent, and rewarding experience for every client.
                </p>
                <ul className="space-y-4 pt-4">
                  {[
                    "Verified, premium property listings",
                    "Dedicated home rental services",
                    "Expert land and property sales",
                    "Transparent pricing with no hidden fees"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-muted-foreground">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="aspect-square overflow-hidden rounded-3xl bg-secondary">
                  <img 
                    src="/about_house.png" 
                    alt="Premium Coimbatore Real Estate" 
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sticky Enquire Now Button & Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <button className="fixed right-4 bottom-24 lg:right-8 lg:bottom-8 z-50 flex items-center gap-2 rounded-full bg-primary px-5 py-3.5 font-semibold text-primary-foreground shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-transform hover:-translate-y-1 active:scale-95">
              Enquire Now
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Property Inquiry</DialogTitle>
              <DialogDescription>
                Looking for a specific property? Fill out the form below and we'll get back to you.
              </DialogDescription>
            </DialogHeader>
            
            <form className="mt-4 grid gap-4" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Name</label>
                <input type="text" id="name" className="w-full rounded-xl border border-input bg-transparent px-4 py-2 text-sm shadow-sm outline-none transition-colors focus:border-primary" placeholder="John Doe" />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="place" className="text-sm font-medium">Place</label>
                <input type="text" id="place" className="w-full rounded-xl border border-input bg-transparent px-4 py-2 text-sm shadow-sm outline-none transition-colors focus:border-primary" placeholder="E.g. Govinda Salai" />
              </div>

              <div className="space-y-2">
                <label htmlFor="contact" className="text-sm font-medium">Contact Details</label>
                <input type="text" id="contact" className="w-full rounded-xl border border-input bg-transparent px-4 py-2 text-sm shadow-sm outline-none transition-colors focus:border-primary" placeholder="+91 86081 77777" />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <input type="email" id="email" className="w-full rounded-xl border border-input bg-transparent px-4 py-2 text-sm shadow-sm outline-none transition-colors focus:border-primary" placeholder="onecoimbatore@gmail.com" />
              </div>

              <div className="space-y-2">
                <label htmlFor="comments" className="text-sm font-medium">Comments</label>
                <textarea id="comments" rows={3} className="w-full resize-none rounded-xl border border-input bg-transparent px-4 py-2 text-sm shadow-sm outline-none transition-colors focus:border-primary" placeholder="Tell us what you are looking for..." />
              </div>

              <button type="submit" className="mt-2 w-full rounded-xl bg-primary py-3 font-semibold text-primary-foreground shadow-[var(--shadow-lift)] transition-transform active:scale-95">
                Submit Inquiry
              </button>
            </form>
          </DialogContent>
        </Dialog>
      </main>

      <Footer />
    </div>
  );
}
