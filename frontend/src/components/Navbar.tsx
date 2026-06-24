import { Search, MapPin, User, Phone, Menu } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const isActive = (path: string) => {
    return location.pathname === path ? "text-primary font-semibold" : "text-foreground/80 hover:text-foreground";
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/properties?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/properties');
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto grid h-20 max-w-[1600px] grid-cols-3 items-center px-4 lg:h-28 lg:px-8">
        
        {/* Left: Navigation Links */}
        <nav className="hidden items-center gap-6 md:flex justify-start">
          <Link to="/" className={`text-sm transition-colors ${isActive('/')}`}>
            Home
          </Link>
          <Link to="/properties" className={`text-sm transition-colors ${isActive('/properties')}`}>
            Properties
          </Link>
          <Link to="/contact" className={`text-sm transition-colors ${isActive('/contact')}`}>
            Contact
          </Link>
        </nav>
        
        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex justify-start">
          <button className="p-2">
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Center: Logo */}
        <div className="flex justify-center">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-display text-2xl font-black tracking-tight text-primary">Coimbatore Properties</span>
          </Link>
        </div>

        {/* Right: Search & Actions */}
        <div className="flex items-center justify-end gap-4">
          <form 
            onSubmit={handleSearch}
            className="hidden w-full max-w-xs items-center rounded-full border border-border bg-card shadow-[var(--shadow-soft)] lg:flex"
          >
            <div className="flex flex-1 items-center gap-2 px-4 py-2">
              <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search location..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
            <button type="submit" className="m-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90">
              <Search className="h-3.5 w-3.5" />
            </button>
          </form>

          <div className="hidden items-center gap-3 lg:flex">
            {/* Login button temporarily removed */}
            <Link to="/contact" className="flex items-center gap-2 rounded-full bg-foreground px-4 py-2.5 text-sm font-semibold text-background transition-transform hover:scale-[1.02]">
              <Phone className="h-4 w-4" /> Contact Us
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
