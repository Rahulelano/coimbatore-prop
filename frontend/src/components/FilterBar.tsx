import { useState } from "react";
import { SlidersHorizontal, ChevronDown, Check } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const FILTER_CATEGORIES = {
  listingType: ["Rent", "Sale"],
  propertyType: ["House", "Villa", "Apartment", "Plot", "Commercial Land"],
  bedrooms: ["1BHK", "2BHK", "3BHK", "4+BHK"],
  furnishing: ["Furnished", "Semi-furnished", "Unfurnished"],
  propertyAge: ["New", "1-5 years", "5-10 years", "10+ years"]
};

interface FilterBarProps {
  filters: any;
  setFilters: (filters: any) => void;
}

export function FilterBar({ filters, setFilters }: FilterBarProps) {
  const handleSelect = (category: string, value: string) => {
    setFilters((prev: any) => ({
      ...prev,
      [category]: prev[category] === value ? "" : value // toggle
    }));
  };

  return (
    <div className="sticky top-20 z-30 border-b border-border bg-background/80 backdrop-blur-xl lg:top-28">
      <div className="mx-auto flex max-w-[1600px] items-center gap-2 px-4 py-3 lg:px-8">
        <button className="chip shrink-0 bg-primary/5 text-primary">
          <SlidersHorizontal className="h-3.5 w-3.5" /> All filters
        </button>
        <div className="flex flex-1 items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {Object.entries(FILTER_CATEGORIES).map(([category, options]) => (
            <Popover key={category}>
              <PopoverTrigger asChild>
                <button className={`chip whitespace-nowrap ${filters[category] ? "chip-active bg-primary text-primary-foreground border-primary" : "hover:bg-secondary"}`}>
                  {filters[category] || category.replace(/([A-Z])/g, ' $1').trim().replace(/^\w/, c => c.toUpperCase())} 
                  <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-48 p-2" align="start">
                <div className="grid gap-1">
                  {options.map((opt) => (
                    <Button
                      key={opt}
                      variant="ghost"
                      className={`justify-start ${filters[category] === opt ? 'bg-secondary' : ''}`}
                      onClick={() => handleSelect(category, opt)}
                    >
                      {filters[category] === opt && <Check className="h-4 w-4 mr-2" />}
                      <span className={filters[category] === opt ? '' : 'ml-6'}>{opt}</span>
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          ))}
          
          {/* Price Range */}
          <Popover>
            <PopoverTrigger asChild>
              <button className={`chip whitespace-nowrap ${(filters.minPrice || filters.maxPrice) ? "chip-active bg-primary text-primary-foreground border-primary" : "hover:bg-secondary"}`}>
                Price Range <ChevronDown className="h-3.5 w-3.5 opacity-60" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-4" align="start">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Min Price</h4>
                  <input 
                    type="number" 
                    placeholder="₹ 0" 
                    className="w-full p-2 border rounded-md"
                    value={filters.minPrice || ""}
                    onChange={(e) => setFilters((p: any) => ({ ...p, minPrice: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Max Price</h4>
                  <input 
                    type="number" 
                    placeholder="₹ Any" 
                    className="w-full p-2 border rounded-md"
                    value={filters.maxPrice || ""}
                    onChange={(e) => setFilters((p: any) => ({ ...p, maxPrice: e.target.value }))}
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>

        </div>
      </div>
    </div>
  );
}
