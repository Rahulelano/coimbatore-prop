import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { 
  Phone, Share2, MapPin, BedDouble, Bath, Maximize, 
  BadgeCheck, MessageCircle, CalendarDays, Camera, Map 
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export function PropertyDetailPage() {
  const { id } = useParams();
  const { api, user } = useAuth();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Visit scheduling
  const [visitDate, setVisitDate] = useState(new Date());
  const [visitorName, setVisitorName] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');
  const [visitMessage, setVisitMessage] = useState('');

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const { data } = await api.get(`/properties/${id}`);
        setProperty(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id, api]);

  const handleScheduleVisit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implementation for scheduling visit API call goes here
    setVisitMessage('Visit scheduled successfully! We will contact you shortly.');
  };

  const handleWhatsApp = () => {
    const phone = property?.ownerDetails?.phone || "9364629168";
    const text = encodeURIComponent(`Hi, I am interested in your property: ${property?.title}`);
    window.open(`https://wa.me/91${phone}?text=${text}`, '_blank');
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="loader"></div></div>;
  if (!property) return <div className="min-h-screen flex items-center justify-center">Property not found</div>;

  const imagesList = property.photos || property.images || [];
  
  const getImgSrc = (idx: number, fallback: string) => {
    const src = imagesList[idx];
    if (!src) return fallback;
    if (src.startsWith('http')) return src;
    return `http://localhost:9000${src}`;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="mx-auto w-full max-w-[1200px] px-4 py-8 lg:px-8">
        
        {/* Header & Badges */}
        <header className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex gap-2 mb-2">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
                For {property.listingType}
              </span>
              {property.isVerified && (
                <span className="px-3 py-1 bg-green-500/10 text-green-600 rounded-full text-xs font-semibold flex items-center gap-1">
                  <BadgeCheck className="h-3 w-3" /> Verified
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-bold leading-tight">{property.title}</h1>
            <p className="flex items-center gap-1.5 mt-2 text-muted-foreground text-lg">
              <MapPin className="h-5 w-5" /> {property.location}
            </p>
          </div>
          <div className="text-left md:text-right">
            <p className="text-4xl font-bold text-primary">₹{property.price.toLocaleString('en-IN')}</p>
          </div>
        </header>

        {/* Media Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 h-[400px] md:h-[500px]">
          <div className="md:col-span-3 rounded-2xl overflow-hidden relative group">
            <img src={getImgSrc(0, "https://via.placeholder.com/800x600?text=No+Image")} className="w-full h-full object-cover" alt="Main" />
            {property.threeSixtyView && (
              <button className="absolute bottom-4 left-4 bg-background/80 backdrop-blur px-4 py-2 rounded-full flex items-center gap-2 font-semibold">
                <Camera className="h-5 w-5" /> 360° View Available
              </button>
            )}
          </div>
          <div className="hidden md:flex flex-col gap-4">
            <img src={getImgSrc(1, "https://via.placeholder.com/400x300?text=No+Image")} className="flex-1 rounded-2xl object-cover" alt="Thumb 1" />
            <img src={getImgSrc(2, "https://via.placeholder.com/400x300?text=No+Image")} className="flex-1 rounded-2xl object-cover" alt="Thumb 2" />
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-3 gap-12">
          
          <div className="md:col-span-2 space-y-8">
            {/* Overview */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-card border border-border rounded-2xl p-6">
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Bedrooms</p>
                  <p className="font-semibold flex items-center gap-2"><BedDouble className="h-4 w-4"/> {property.bedrooms}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Furnishing</p>
                  <p className="font-semibold flex items-center gap-2"><Bath className="h-4 w-4"/> {property.furnishing}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Area</p>
                  <p className="font-semibold flex items-center gap-2"><Maximize className="h-4 w-4"/> {property.area}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Age</p>
                  <p className="font-semibold">{property.propertyAge}</p>
                </div>
              </div>
            </section>

            {/* Description */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </section>

            {/* Amenities */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Amenities</h2>
              <div className="flex flex-wrap gap-2">
                {property.amenities.map((a: string) => (
                  <span key={a} className="px-4 py-2 bg-secondary rounded-xl font-medium text-sm">
                    {a}
                  </span>
                ))}
              </div>
            </section>
            
            {/* Documents & Maps */}
            <section className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
              <h2 className="text-xl font-bold mb-2">Property Verification</h2>
              <p className="text-muted-foreground flex items-center gap-2">
                Documents Status: <span className="font-semibold text-foreground">{property.documentsStatus}</span>
              </p>
            </section>
          </div>

          {/* Right Sidebar - Action Panel */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm sticky top-32">
              <h3 className="font-bold text-xl mb-6">Interested?</h3>
              
              <div className="flex flex-col gap-3 mb-6">
                <button onClick={handleWhatsApp} className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-xl font-semibold hover:bg-[#128C7E] transition">
                  <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
                </button>
                <a 
                  href={`tel:${property?.ownerDetails?.phone || "9364629168"}`} 
                  className="w-full flex items-center justify-center gap-2 border border-border bg-background py-3 rounded-xl font-semibold hover:bg-secondary transition"
                >
                  <Phone className="h-5 w-5" /> Call Owner
                </a>
                <button 
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title: property.title, url: window.location.href });
                    }
                  }}
                  className="w-full flex items-center justify-center gap-2 border border-border bg-background py-3 rounded-xl font-semibold hover:bg-secondary transition"
                >
                  <Share2 className="h-5 w-5" /> Share Property
                </button>
              </div>

              <hr className="border-border my-6" />

              <Dialog>
                <DialogTrigger asChild>
                  <button className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-4 rounded-xl font-semibold hover:bg-primary/90 transition shadow-lg shadow-primary/20">
                    <CalendarDays className="h-5 w-5" /> Schedule Visit
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Schedule a Visit</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleScheduleVisit} className="space-y-4 mt-4">
                    {visitMessage && <div className="p-3 bg-green-500/10 text-green-600 rounded-lg text-sm">{visitMessage}</div>}
                    <div>
                      <label className="text-sm font-medium">Name</label>
                      <input type="text" required value={visitorName} onChange={e=>setVisitorName(e.target.value)} className="w-full p-2 border rounded-md mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Phone Number</label>
                      <input type="tel" required value={visitorPhone} onChange={e=>setVisitorPhone(e.target.value)} className="w-full p-2 border rounded-md mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Select Date & Time</label>
                      <DatePicker 
                        selected={visitDate} 
                        onChange={(date: Date) => setVisitDate(date)} 
                        showTimeSelect 
                        dateFormat="Pp"
                        className="w-full p-2 border rounded-md mt-1"
                        required
                      />
                    </div>
                    <button type="submit" className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold mt-4">
                      Confirm Visit
                    </button>
                  </form>
                </DialogContent>
              </Dialog>

            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
