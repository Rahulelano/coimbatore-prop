import { Instagram, MapPin, Mail, Phone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card pb-24 pt-16 lg:pb-16">
      <div className="mx-auto max-w-[1600px] px-4 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Info */}
          <div className="flex flex-col items-start gap-4 lg:col-span-2">
            <Link to="/" className="inline-block">
              <span className="font-display text-2xl font-black tracking-tight text-primary">Coimbatore Properties</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground max-w-sm">
              Your trusted partner for home rent, land, and property sales in Coimbatore. Committed to providing excellence and a seamless real estate experience.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display font-semibold text-foreground">Quick Links</h3>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              <li>
                <Link to="/" className="flex items-center gap-2 transition-colors hover:text-primary">
                  <ArrowRight className="h-3.5 w-3.5" /> Home
                </Link>
              </li>
              <li>
                <Link to="/properties" className="flex items-center gap-2 transition-colors hover:text-primary">
                  <ArrowRight className="h-3.5 w-3.5" /> Browse Properties
                </Link>
              </li>
              <li>
                <Link to="/contact" className="flex items-center gap-2 transition-colors hover:text-primary">
                  <ArrowRight className="h-3.5 w-3.5" /> Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display font-semibold text-foreground">Contact Us</h3>
            <ul className="flex flex-col gap-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 shrink-0 text-primary" />
                <span>Coimbatore RS Puram</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <span>+91 86081 77777</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <a href="mailto:onecoimbatore@gmail.com" className="transition-colors hover:text-primary">
                  onecoimbatore@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} coimbatore.properties. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
