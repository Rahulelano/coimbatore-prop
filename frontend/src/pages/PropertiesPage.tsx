import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Map, List, ArrowUpDown } from "lucide-react";
import { PropertyCard, PropertyCardSkeleton } from "@/components/PropertyCard";
import { MapView } from "@/components/MapView";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FilterBar } from "@/components/FilterBar";
import { useAuth } from "@/context/AuthContext";

export function PropertiesPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const { api } = useAuth();
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mobileMap, setMobileMap] = useState(false);
  
  const [filters, setFilters] = useState({
    listingType: "",
    propertyType: "",
    bedrooms: "",
    furnishing: "",
    propertyAge: "",
    minPrice: "",
    maxPrice: ""
  });

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (query) params.append('location', query); // Strictly search by location
        if (filters.listingType) params.append('listingType', filters.listingType);
        if (filters.propertyType) params.append('propertyType', filters.propertyType);
        if (filters.bedrooms) params.append('bedrooms', filters.bedrooms);
        if (filters.furnishing) params.append('furnishing', filters.furnishing);
        if (filters.propertyAge) params.append('propertyAge', filters.propertyAge);
        if (filters.minPrice) params.append('minPrice', filters.minPrice);
        if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);

        const { data } = await api.get(`/properties?${params.toString()}`);
        setProperties(data);
      } catch (error) {
        console.error("Failed to fetch properties", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [query, filters, api]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <FilterBar filters={filters} setFilters={setFilters} />

      <main className="mx-auto flex-1 w-full max-w-[1600px] px-4 py-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          {/* List */}
          <section className={`${mobileMap ? "hidden" : "block"} lg:block`}>
            <header className="mb-5 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
              <div className="min-w-0">
                <h1 className="font-display text-2xl font-bold leading-tight sm:text-3xl">
                  {query ? `Search results for "${query}"` : "Available Properties"}
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  {properties.length} properties found
                </p>
              </div>
              <button className="flex shrink-0 items-center gap-2 rounded-full border border-border bg-card px-3.5 py-2 text-sm font-medium shadow-[var(--shadow-soft)] transition-colors hover:bg-secondary">
                <ArrowUpDown className="h-4 w-4" /> Sort
              </button>
            </header>

            <div className="flex flex-col gap-5 pb-20 lg:pb-0">
              {loading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <PropertyCardSkeleton key={i} />
                  ))
                : properties.map((p: any) => (
                    <PropertyCard key={p._id} property={p} onHover={setHoveredId} />
                  ))}
              
              {!loading && properties.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-border rounded-2xl">
                  <h3 className="text-xl font-semibold mb-2">No properties found</h3>
                  <p className="text-muted-foreground max-w-md">We couldn't find any properties matching your exact criteria. Try removing some filters or searching a different area.</p>
                </div>
              )}
            </div>
          </section>

          {/* Map */}
          <aside className={`${mobileMap ? "block" : "hidden"} lg:sticky lg:top-40 lg:block lg:h-[calc(100vh-10rem)]`}>
            <div className="h-[calc(100vh-12rem)] lg:h-full rounded-2xl overflow-hidden">
              <MapView 
                properties={properties.map((p: any) => ({
                  ...p, 
                  id: p._id,
                  lat: p.lat || Math.floor(Math.random() * 80) + 10,
                  lng: p.lng || Math.floor(Math.random() * 80) + 10
                }))}
                hoveredId={hoveredId}
                onHover={setHoveredId}
              />
            </div>
          </aside>
        </div>
      </main>

      {/* Floating map/list toggle — mobile */}
      <button
        onClick={() => setMobileMap((v) => !v)}
        className="fixed bottom-20 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background shadow-[var(--shadow-lift)] transition-transform active:scale-95 lg:hidden"
      >
        {mobileMap ? (
          <>
            <List className="h-4 w-4" /> List View
          </>
        ) : (
          <>
            <Map className="h-4 w-4" /> Map View
          </>
        )}
      </button>

      <Footer />
    </div>
  );
}
