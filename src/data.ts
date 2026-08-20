import {
  Speaker,
  Contrast,
  LifeBuoy,
  MoveVertical,
  Truck,
  Tv,
  type LucideIcon,
} from "lucide-react";

export const INFO = {
  name: "Sound Proof Inc.",
  tagline: "The Right Equipment, The Right Price, The Right Sound.",
  phoneDisplay: "770.920.0077",
  phoneHref: "tel:+17709200077",
  street: "7015 Douglas Blvd",
  city: "Douglasville, GA 30135",
  mapsEmbed:
    "https://www.google.com/maps?q=7015+Douglas+Blvd,+Douglasville,+GA+30135&output=embed",
  directions:
    "https://www.google.com/maps/dir/?api=1&destination=7015+Douglas+Blvd,+Douglasville,+GA+30135",
};

export type Service = {
  icon: LucideIcon;
  title: string;
  tag: string;
  points: string[];
};

export const SERVICES: Service[] = [
  {
    icon: Speaker,
    title: "Custom Car Audio",
    tag: "From factory-speaker upgrades to competition-caliber multimedia builds.",
    points: [
      "Head units & multimedia receivers",
      "Amplifiers, subs & custom enclosures",
      "Factory system integration",
      "DSP tuning & full system design",
    ],
  },
  {
    icon: Contrast,
    title: "Window Tinting",
    tag: "Professionally installed film — heat rejection, UV block, privacy.",
    points: [
      "Ceramic & dyed film options",
      "Heat & glare reduction",
      "UV protection for interiors",
      "Precision computer-cut patterns",
    ],
  },
  {
    icon: LifeBuoy,
    title: "Wheels & Tires",
    tag: "Custom wheels and rubber, sized right for your stance and your budget.",
    points: [
      "Custom & factory-plus fitments",
      "Mount, balance & rotation",
      "Staggered & off-road setups",
      "All major brands available",
    ],
  },
  {
    icon: MoveVertical,
    title: "Suspension & Lifts",
    tag: "Lift kits, leveling and lowering — stance done right, aligned true.",
    points: [
      "Lift & leveling kits",
      "Lowering springs & coilovers",
      "Shocks, struts & bushings",
      "Off-road ready packages",
    ],
  },
  {
    icon: Truck,
    title: "Truck Accessories",
    tag: "A full line of gear to make your truck work harder and look meaner.",
    points: [
      "Bed covers & liners",
      "Steps, bars & bumpers",
      "LED lighting & light bars",
      "Towing & utility gear",
    ],
  },
  {
    icon: Tv,
    title: "Home Theater",
    tag: "The same obsession with clean sound, tuned for your living room.",
    points: [
      "Surround sound design",
      "TV mounting & concealment",
      "Whole-home audio zones",
      "Subwoofer calibration",
    ],
  },
];

export const EXTRAS = [
  "Custom Marine Audio",
  "Navigation Systems",
  "Security & Keyless Entry",
  "Remote Start",
  "Factory Speaker Upgrades",
  "Backup Cameras",
];

export const BRANDS = [
  "ALPINE",
  "SONY",
  "JL AUDIO",
  "KENWOOD",
  "PIONEER",
  "JVC",
  "MEMPHIS",
];

export const TICKER = [
  "Custom Car Audio",
  "Window Tinting",
  "Wheels & Tires",
  "Suspension & Lifts",
  "Truck Accessories",
  "Home Theater",
  "Marine Audio",
  "Remote Start & Security",
];

export const HOURS = [
  { days: "Monday — Friday", match: [1, 2, 3, 4, 5], time: "9:30 AM — 6:00 PM" },
  { days: "Saturday", match: [6], time: "9:30 AM — 4:00 PM" },
  { days: "Sunday", match: [0], time: "Closed" },
];

export const AREAS = [
  "Douglasville",
  "Hiram",
  "Lithia Springs",
  "Atlanta",
  "Villa Rica",
  "Carrollton",
  "Bremen",
  "Marietta",
];

export type GalleryItem = {
  src: string;
  title: string;
  tag: string;
  span: string;
};

export const GALLERY: GalleryItem[] = [
  {
    src: "https://images.pexels.com/photos/13811121/pexels-photo-13811121.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    title: "Trunk Wall Build",
    tag: "Car Audio",
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    src: "https://images.pexels.com/photos/9323739/pexels-photo-9323739.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    title: "Forged Fitment",
    tag: "Wheels",
    span: "lg:row-span-2",
  },
  {
    src: "https://images.pexels.com/photos/12955830/pexels-photo-12955830.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    title: "Component Detail",
    tag: "Audio",
    span: "",
  },
  {
    src: "https://images.pexels.com/photos/12959477/pexels-photo-12959477.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    title: "Door Stage Two",
    tag: "Speakers",
    span: "",
  },
  {
    src: "https://images.pexels.com/photos/15763806/pexels-photo-15763806.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    title: "Head-Unit Swap",
    tag: "Multimedia",
    span: "lg:col-span-2",
  },
  {
    src: "https://images.pexels.com/photos/16033912/pexels-photo-16033912.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    title: "Lifted & Loaded",
    tag: "Suspension",
    span: "lg:col-span-2",
  },
  {
    src: "https://images.pexels.com/photos/28794445/pexels-photo-28794445.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    title: "After Dark",
    tag: "Styling",
    span: "lg:col-span-2",
  },
  {
    src: "https://images.pexels.com/photos/12777409/pexels-photo-12777409.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    title: "Night Reflections",
    tag: "Tint & Detail",
    span: "lg:col-span-2",
  },
];

export const ABOUT_IMAGE =
  "https://images.pexels.com/photos/30638265/pexels-photo-30638265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

export const STATS = [
  { value: "25+", label: "Years in the game" },
  { value: "08", label: "West-GA towns served" },
  { value: "07", label: "Pro brands on the wall" },
  { value: "MECP", label: "Certified installers" },
];
