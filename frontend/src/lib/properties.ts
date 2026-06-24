export type Property = {
  id: string;
  title: string;
  type: string;
  bhk: string;
  price: number;
  location: string;
  neighborhood: string;
  city: string;
  beds: number;
  baths: number;
  area: number;
  verified: boolean;
  premium?: boolean;
  images: string[];
  lat: number; // 0-100 (percent on the map)
  lng: number; // 0-100
  amenities: string[];
  owner: string;
};

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

export const PROPERTIES: Property[] = [
  {
    id: "p1",
    title: "2 BHK Independent House",
    type: "Independent House",
    bhk: "2 BHK",
    price: 22000,
    location: "Indiranagar, 12th Main Road",
    neighborhood: "Indiranagar",
    city: "Bengaluru",
    beds: 2, baths: 2, area: 1180,
    verified: true, premium: true,
    images: [
      img("photo-1568605114967-8130f3a36994"),
      img("photo-1600585154340-be6161a56a0c"),
      img("photo-1600596542815-ffad4c1539a9"),
    ],
    lat: 28, lng: 32,
    amenities: ["Parking", "Power Backup", "Lift"],
    owner: "Rajesh K.",
  },
  {
    id: "p2",
    title: "3 BHK Luxury Apartment",
    type: "Apartment",
    bhk: "3 BHK",
    price: 48000,
    location: "Powai, Hiranandani Gardens",
    neighborhood: "Powai",
    city: "Mumbai",
    beds: 3, baths: 3, area: 1620,
    verified: true, premium: true,
    images: [
      img("photo-1600607687939-ce8a6c25118c"),
      img("photo-1560448204-e02f11c3d0e2"),
      img("photo-1600566753190-17f0baa2a6c3"),
    ],
    lat: 18, lng: 64,
    amenities: ["Gym", "Pool", "Club House"],
    owner: "Priya Hiranandani Estates",
  },
  {
    id: "p3",
    title: "1 BHK Studio Apartment",
    type: "Studio",
    bhk: "1 BHK",
    price: 15000,
    location: "Koramangala 4th Block",
    neighborhood: "Koramangala",
    city: "Bengaluru",
    beds: 1, baths: 1, area: 620,
    verified: true,
    images: [
      img("photo-1502672260266-1c1ef2d93688"),
      img("photo-1505691938895-1758d7feb511"),
      img("photo-1493809842364-78817add7ffb"),
    ],
    lat: 52, lng: 22,
    amenities: ["Furnished", "Wifi"],
    owner: "Anand S.",
  },
  {
    id: "p4",
    title: "4 BHK Garden Villa",
    type: "Villa",
    bhk: "4 BHK",
    price: 95000,
    location: "Jubilee Hills, Road No. 36",
    neighborhood: "Jubilee Hills",
    city: "Hyderabad",
    beds: 4, baths: 4, area: 3400,
    verified: true, premium: true,
    images: [
      img("photo-1600585154526-990dced4db0d"),
      img("photo-1613490493576-7fde63acd811"),
      img("photo-1564013799919-ab600027ffc6"),
    ],
    lat: 64, lng: 78,
    amenities: ["Garden", "Pool", "Servant Room"],
    owner: "Mehra Properties",
  },
  {
    id: "p5",
    title: "2 BHK Modern Flat",
    type: "Apartment",
    bhk: "2 BHK",
    price: 28000,
    location: "HSR Layout, Sector 2",
    neighborhood: "HSR Layout",
    city: "Bengaluru",
    beds: 2, baths: 2, area: 1050,
    verified: true,
    images: [
      img("photo-1522708323590-d24dbb6b0267"),
      img("photo-1583847268964-b28dc8f51f92"),
      img("photo-1598928506311-c55ded91a20c"),
    ],
    lat: 38, lng: 48,
    amenities: ["Lift", "Security", "Parking"],
    owner: "Suresh M.",
  },
  {
    id: "p6",
    title: "3 BHK Sea-Facing Apartment",
    type: "Apartment",
    bhk: "3 BHK",
    price: 75000,
    location: "Bandra West, Carter Road",
    neighborhood: "Bandra West",
    city: "Mumbai",
    beds: 3, baths: 3, area: 1480,
    verified: true, premium: true,
    images: [
      img("photo-1512917774080-9991f1c4c750"),
      img("photo-1600210492486-724fe5c67fb0"),
      img("photo-1580587771525-78b9dba3b914"),
    ],
    lat: 22, lng: 14,
    amenities: ["Sea View", "Gym", "Concierge"],
    owner: "Coastline Realty",
  },
  {
    id: "p7",
    title: "2 BHK Builder Floor",
    type: "Builder Floor",
    bhk: "2 BHK",
    price: 35000,
    location: "Greater Kailash 2, M Block",
    neighborhood: "Greater Kailash",
    city: "New Delhi",
    beds: 2, baths: 2, area: 1250,
    verified: true,
    images: [
      img("photo-1600566753086-00f18fb6b3ea"),
      img("photo-1600566753376-12c8ab7fb75b"),
      img("photo-1616486338812-3dadae4b4ace"),
    ],
    lat: 48, lng: 88,
    amenities: ["Modular Kitchen", "Parking"],
    owner: "Kapoor & Sons",
  },
  {
    id: "p8",
    title: "1 BHK Cozy Apartment",
    type: "Apartment",
    bhk: "1 BHK",
    price: 18500,
    location: "Viman Nagar, Clover Park",
    neighborhood: "Viman Nagar",
    city: "Pune",
    beds: 1, baths: 1, area: 720,
    verified: false,
    images: [
      img("photo-1554995207-c18c203602cb"),
      img("photo-1556909114-f6e7ad7d3136"),
      img("photo-1567767292278-a4f21aa2d36e"),
    ],
    lat: 70, lng: 42,
    amenities: ["Wifi", "Furnished"],
    owner: "Neha R.",
  },
];

export const formatINR = (n?: number) => {
  if (n === undefined || n === null) return "Price on Request";
  return "₹" + Number(n).toLocaleString("en-IN");
};
