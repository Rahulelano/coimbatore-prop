import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  BedDouble,
  Bath,
  Maximize,
  BadgeCheck,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Phone,
} from "lucide-react";
import { formatINR } from "@/lib/properties";

type Props = {
  property: any; // MongoDB Property Document
  onHover?: (id: string | null) => void;
};

export function PropertyCard({ property, onHover }: Props) {
  const [idx, setIdx] = useState(0);
  const [saved, setSaved] = useState(false);

  const imagesList = property.photos || property.images || [];
  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (imagesList.length > 0) {
      setIdx((i) => (i + 1) % imagesList.length);
    }
  };
  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (imagesList.length > 0) {
      setIdx((i) => (i - 1 + imagesList.length) % imagesList.length);
    }
  };

  return (
    <article
      onMouseEnter={() => onHover?.(property._id)}
      onMouseLeave={() => onHover?.(null)}
      className="card-lift group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] sm:flex-row"
    >
      {/* Image carousel */}
      <div className="relative h-56 w-full shrink-0 overflow-hidden sm:h-auto sm:w-[44%] sm:min-h-[260px]">
        <img
          src={imagesList.length > 0 ? (imagesList[idx].startsWith('http') ? imagesList[idx] : `http://localhost:9000${imagesList[idx]}`) : "https://via.placeholder.com/400x300?text=No+Image"}
          alt={property.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {property.isVerified && (
            <span className="flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-[11px] font-semibold text-success backdrop-blur-md">
              <BadgeCheck className="h-3 w-3" /> Verified
            </span>
          )}
          {property.listingType === 'Sale' && (
            <span className="flex items-center gap-1 rounded-full bg-foreground/90 px-2.5 py-1 text-[11px] font-semibold text-background backdrop-blur-md">
              <Sparkles className="h-3 w-3" /> For Sale
            </span>
          )}
        </div>
        {/* Save */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSaved((s) => !s);
          }}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-background/90 text-foreground shadow-[var(--shadow-soft)] backdrop-blur-md transition-transform hover:scale-110"
          aria-label="Save"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              saved ? "fill-destructive text-destructive" : ""
            }`}
          />
        </button>
        {/* Carousel arrows */}
        <button
          onClick={prev}
          className="absolute left-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-background/90 opacity-0 shadow-[var(--shadow-soft)] backdrop-blur-md transition-opacity group-hover:opacity-100"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          onClick={next}
          className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-background/90 opacity-0 shadow-[var(--shadow-soft)] backdrop-blur-md transition-opacity group-hover:opacity-100"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1">
          {imagesList.map((_: any, i: number) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === idx ? "w-4 bg-background" : "w-1.5 bg-background/60"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="font-display text-2xl font-bold leading-tight">
              {formatINR(property.price)}
              <span className="text-sm font-medium text-muted-foreground">/month</span>
            </p>
            <h3 className="mt-1 truncate text-base font-semibold">
              {property.title}
            </h3>
            <p className="mt-0.5 truncate text-sm text-muted-foreground">
              {property.location}
            </p>
          </div>
        </div>

        {/* Specs */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <BedDouble className="h-4 w-4" /> {property.bedrooms}
          </span>
          <span className="flex items-center gap-1.5">
            <Bath className="h-4 w-4" /> {property.furnishing}
          </span>
          <span className="flex items-center gap-1.5">
            <Maximize className="h-4 w-4" /> {property.area}
          </span>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-1.5">
          {property.amenities && property.amenities.slice(0, 3).map((a: string) => (
            <span
              key={a}
              className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium text-secondary-foreground"
            >
              {a}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-2 pt-2">
          <a 
            href={`tel:${property?.ownerDetails?.phone || "9364629168"}`}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-[var(--shadow-lift)]"
          >
            <Phone className="h-4 w-4" /> Contact Owner
          </a>
          <Link 
            to={`/property/${property._id}`}
            className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-secondary"
          >
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}

export function PropertyCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card sm:flex-row">
      <div className="skeleton h-56 w-full sm:h-64 sm:w-[44%]" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="skeleton h-7 w-32" />
        <div className="skeleton h-4 w-3/4" />
        <div className="skeleton h-4 w-1/2" />
        <div className="mt-auto flex gap-2">
          <div className="skeleton h-10 flex-1" />
          <div className="skeleton h-10 w-24" />
        </div>
      </div>
    </div>
  );
}
