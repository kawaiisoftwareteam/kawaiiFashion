export interface Product {
  id: string;
  name: string;
  category: string;
  price: number; // Numeric price for cart calculations
  rating: number;
  reviewsCount: number;
  image: string;
  hoverImage: string;
  badge?: string;
  tagline: string;
  description: string;
  ingredients: string;
  usage: string;
  brandId: string;
  collections: string[];
  isPreorder?: boolean;
  availableDate?: string;
  releaseSchedule?: string;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  description: string;
  philosophy: string;
  accentColor: string; // Hex color for CSS custom themes
  accentColorLight: string; // Light tint for backgrounds
  bgGradient: string; // CSS gradient for header/hero
  heroBanner: string; // Placeholder or generated banner
  tagline: string; // Short descriptor for dropdown menus
}

export interface Collection {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  accentColor: string;
  bgGradient: string;
  steps: string[]; // Steps for routine building
  tagline: string; // Short descriptor for dropdown menus
}

export const brands: Brand[] = [
  {
    id: "kome-rituals",
    name: "Kome Rituals",
    logo: "/brand_kome.svg",
    description: "Time-honored Japanese rice fermentation skincare crafted to build a strong skin barrier and promote a translucent, porcelain complexion.",
    philosophy: "Harnessing the natural enzymes and amino acids of fermented rice bran to nourish and gently brighten skin according to traditional Japanese beauty rituals.",
    accentColor: "#D4AF37",
    accentColorLight: "#FCF9EE",
    bgGradient: "linear-gradient(135deg, #FBF8F0 0%, #EFEAD8 100%)",
    heroBanner: "/banner_kome.png",
    tagline: "Fermented Rice Radiance"
  },
  {
    id: "tsubaki-labs",
    name: "Tsubaki Labs",
    logo: "/brand_tsubaki.svg",
    description: "Premium skincare powered by pure, cold-pressed Camellia Japonica seed oil from Oshima Island to deeply moisturize, protect, and soften fine lines.",
    philosophy: "Blending traditional, hand-harvested Camellia oil with modern cellular science to deliver rich, skin-identical lipids for ultimate nourishment.",
    accentColor: "#A62B2B",
    accentColorLight: "#FFF5F5",
    bgGradient: "linear-gradient(135deg, #FFF0F0 0%, #FFE0E0 100%)",
    heroBanner: "/banner_tsubaki.png",
    tagline: "Oshima Camellia Oil"
  },
  {
    id: "uji-matcha-co",
    name: "Uji Matcha Co.",
    logo: "/brand_matcha.svg",
    description: "Antioxidant-rich, detoxifying treatments formulated with shade-grown stone-ground Uji green tea to clarify pores and soothe sensitive skin.",
    philosophy: "Utilizing the extreme calming and active antioxidant benefits of pure Matcha leaves to fight environmental stressors and achieve balanced skin.",
    accentColor: "#4E6E58",
    accentColorLight: "#F0F5F1",
    bgGradient: "linear-gradient(135deg, #EFF5EF 0%, #D4E2D4 100%)",
    heroBanner: "/banner_matcha.png",
    tagline: "Kyoto Green Tea Purify"
  },
  {
    id: "momo-glow",
    name: "Momo Glow",
    logo: "/brand_momo.svg",
    description: "Fun, hydrating, and skin-plumping formulations infused with fresh Japanese peach blossom extracts and hyaluronic acid.",
    philosophy: "Capturing the playful essence of Kawaii beauty with high-performance ingredients that lock in dewiness and give skin a bouncy, peach-like texture.",
    accentColor: "#D66B78",
    accentColorLight: "#FFF2F3",
    bgGradient: "linear-gradient(135deg, #FFF0F1 0%, #FFE0E3 100%)",
    heroBanner: "/brand_momo.png",
    tagline: "Peach Blossom Plump"
  }
];

export const collections: Collection[] = [
  {
    id: "glass-skin-routine",
    name: "The Glass Skin Routine",
    subtitle: "Refined, translucent & glowing skin",
    description: "A highly curated routine combining gentle oil cleansing and deep rice ferment hydration. Ideal for fading dark spots, tightening pores, and restoring natural radiance.",
    accentColor: "#E09C96",
    bgGradient: "linear-gradient(135deg, #FFF4F2 0%, #F5D3CF 100%)",
    steps: [
      "Double Cleanse: Dissolve impurities with Peach Blossom Cleansing Oil.",
      "Tone: Hydrate skin deeply with Kome Rice Ferment Toner.",
      "Treat: Apply Rice Ferment Brightening Serum for deep radiance.",
      "Mist: Lock in moisture with Sakura Soothing Mist."
    ],
    tagline: "4 Steps to Glass Skin"
  },
  {
    id: "pore-detox-ritual",
    name: "The Pore Detox Ritual",
    subtitle: "Clear, balanced & calm complexion",
    description: "A clarifying ritual focused on purifying pores without stripping skin. Infused with antioxidant-rich green tea and clay to balance sebum and soothe irritation.",
    accentColor: "#4E6E58",
    bgGradient: "linear-gradient(135deg, #EFF5EF 0%, #D4E2D4 100%)",
    steps: [
      "Detox Mask: Apply Matcha Green Tea Clay Mask for 10 minutes to clarify pores.",
      "Soothe: Mist skin with Sakura Soothing Mist to calm redness.",
      "Eye Care: Nourish delicate under-eyes with Matcha Peptide Eye Cream."
    ],
    tagline: "Calming Pore Purifier"
  },
  {
    id: "double-hydration-kit",
    name: "Double Hydration Kit",
    subtitle: "Velvety soft & deeply nourished skin barrier",
    description: "The ultimate solution for dry, flaky skin or a compromised skin barrier. Utilizing premium botanical lipids, ceramides, and natural milk proteins.",
    accentColor: "#D4AF37",
    bgGradient: "linear-gradient(135deg, #FBF8F0 0%, #EFEAD8 100%)",
    steps: [
      "Moisturize: Smooth Camellia Nourishing Cream onto face and neck.",
      "Intense Care: Treat extra dry areas with Hokkaido Milk Whipped Cream.",
      "Lip Care: Lock in lip moisture with Yuzu Brightening Lip Balm."
    ],
    tagline: "Intense Barrier Repair"
  }
];

export const products: Product[] = [
  // Kome Rituals products
  {
    id: "serum",
    name: "Rice Ferment Brightening Serum",
    category: "serum",
    price: 36,
    rating: 5,
    reviewsCount: 48,
    image: "/product_serum.png",
    hoverImage: "/product_serum_hover.png",
    badge: "Best Seller",
    tagline: "Hydrate & Illuminate",
    description: "Infused with traditional Japanese Sake extract and Niacinamide, this lightweight serum deeply penetrates to fade dark spots, refine texture, and deliver a translucent, glass-skin glow.",
    ingredients: "Sake Extract (Rice Ferment Filtrate), Niacinamide (5%), Hyaluronic Acid, Licorice Root Extract, Green Tea Extract, Glycerin.",
    usage: "Apply 2-3 drops onto clean, damp skin morning and night. Pat gently until fully absorbed before applying moisturizer.",
    brandId: "kome-rituals",
    collections: ["glass-skin-routine"]
  },
  {
    id: "kome_toner",
    name: "Rice Ferment Refining Toner",
    category: "toner",
    price: 32,
    rating: 5,
    reviewsCount: 22,
    image: "/product_serum.png", // Reuse existing serum asset
    hoverImage: "/product_serum_hover.png",
    badge: "New",
    tagline: "Hydrate & Balance PH",
    description: "A milky, alcohol-free toner packed with organic fermented rice filtrate. It balances skin pH, gently exfoliates dead skin cells, and preps your skin to absorb serum efficiently.",
    ingredients: "Sake Extract (Rice Ferment Filtrate), Galactomyces Ferment Filtrate, Glycerin, Centella Asiatica Extract, Panthenol.",
    usage: "Pour a few drops into palms and press gently into clean face and neck, or apply with a cotton pad. Use morning and night.",
    brandId: "kome-rituals",
    collections: ["glass-skin-routine"]
  },

  // Tsubaki Labs products
  {
    id: "cream",
    name: "Camellia Nourishing Cream",
    category: "moisturizer",
    price: 42,
    rating: 5,
    reviewsCount: 36,
    image: "/product_cream.png",
    hoverImage: "/product_cream_hover.png",
    badge: "Award Winner",
    tagline: "Deep Moisture Lock",
    description: "A rich, velvety cream enriched with premium cold-pressed Camellia Japonica seed oil. It wraps the skin in a protective layer of intense moisture, repairing the lipid barrier and softening fine lines.",
    ingredients: "Camellia Japonica Seed Oil, Shea Butter, Squalane, Ceramide NP, Vitamin E, Centella Asiatica (Cica) Extract.",
    usage: "Warm a pea-sized amount between fingertips and press gently into face and neck as the final step of your evening routine.",
    brandId: "tsubaki-labs",
    collections: ["double-hydration-kit"]
  },
  {
    id: "tsubaki_oil",
    name: "Camellia Hair & Body Oil",
    category: "oil",
    price: 46,
    rating: 4.8,
    reviewsCount: 19,
    image: "/product_serum.png", // Re-use styling
    hoverImage: "/product_serum_hover.png",
    tagline: "Multipurpose Satin Nourishment",
    description: "A lightweight, dry-touch oil that locks in skin moisture and repairs hair cuticles. Rich in oleic acid and skin-identical lipids for a satin-soft finish.",
    ingredients: "100% Pure Cold-Pressed Camellia Japonica Seed Oil, Sweet Almond Oil, Jojoba Oil, Tocopherol (Vitamin E), Natural Fragrance.",
    usage: "Rub 2-3 drops into damp hair ends, or massage onto body skin after showering for a luxurious, satin-smooth feel.",
    brandId: "tsubaki-labs",
    collections: []
  },

  // Uji Matcha Co. products
  {
    id: "mask",
    name: "Matcha Green Tea Clay Mask",
    category: "mask",
    price: 34,
    rating: 4.7,
    reviewsCount: 41,
    image: "/product_mask.png",
    hoverImage: "/product_mask_hover.png",
    badge: "Detox Specialist",
    tagline: "Purify & Soothe Pores",
    description: "A creamy clay mask formulated with organic Uji Matcha and mineral-rich Kaolin clay. It detoxifies pores, absorbs excess oil, and gently exfoliates without stripping or drying the skin.",
    ingredients: "Uji Matcha (Camellia Sinensis Leaf Powder), Kaolin Clay, Bentonite, Aloe Vera Juice, Panthenol, Allantoin.",
    usage: "Apply an even layer to clean skin, avoiding eyes and lips. Leave on for 10-12 minutes, then rinse with warm water. Use 1-2 times weekly.",
    brandId: "uji-matcha-co",
    collections: ["pore-detox-ritual"]
  },
  {
    id: "preorder_eyecream",
    name: "Matcha Peptide Eye Cream",
    category: "eyecream",
    price: 38,
    rating: 5,
    reviewsCount: 15,
    image: "/product_mask.png", // Reuse
    hoverImage: "/product_mask_hover.png",
    badge: "Pre-order",
    tagline: "Brighten & Depuff",
    description: "Formulated with pure Uji Matcha extract and active tripeptides, this luxury cooling eye cream melts into the skin to fade dark circles, reduce puffiness, and smooth fine lines.",
    ingredients: "Uji Matcha Extract, Palmitoyl Tripeptide-5, Hyaluronic Acid, Caffeine, Niacinamide, Shea Butter.",
    usage: "Gently pat a tiny amount around the entire eye area using your ring finger. Use morning and night.",
    brandId: "uji-matcha-co",
    collections: ["pore-detox-ritual"],
    isPreorder: true,
    availableDate: "August 15, 2026"
  },

  // Momo Glow products
  {
    id: "cleanser",
    name: "Peach Blossom Cleansing Oil",
    category: "cleanser",
    price: 28,
    rating: 4.9,
    reviewsCount: 52,
    image: "/product_cleanser.png",
    hoverImage: "/product_cleanser_hover.png",
    badge: "Must Have",
    tagline: "Gentle Melting Balm",
    description: "A lightweight oil cleanser that emulsifies instantly upon contact with water, dissolving waterproof makeup, sebum, and sunscreens while nourishing with Peach Kernel oil.",
    ingredients: "Peach Kernel Oil, Olive Fruit Oil, Jojoba Esters, PEG-20 Glyceryl Triisostearate, Tocopherol, Peach Blossom Extract.",
    usage: "Massage 1-2 pumps onto dry face. Apply warm water to emulsify into a milky lotion, then rinse thoroughly.",
    brandId: "momo-glow",
    collections: ["glass-skin-routine"]
  },
  {
    id: "momo_mask",
    name: "Momo Moisture Plumping Mask",
    category: "mask",
    price: 30,
    rating: 4.8,
    reviewsCount: 27,
    image: "/product_cream.png", // Reuse
    hoverImage: "/product_cream_hover.png",
    badge: "Plump & Bounce",
    tagline: "Overnight Jelly Infusion",
    description: "An ultra-hydrating jelly sleep mask packed with Peach water and Ceramide complexes. It restores skin elasticity, plumps lines, and leaves skin bouncy by morning.",
    ingredients: "Prunus Persica (Peach) Fruit Water, Glycerin, Ceramide NP, Squalane, Hyaluronic Acid, Honey Extract.",
    usage: "Apply a generous layer as the last step of your evening routine. Leave on overnight and rinse in the morning.",
    brandId: "momo-glow",
    collections: []
  },

  // Other dynamic products (e.g. Preorder/Upcoming)
  {
    id: "preorder_milk",
    name: "Hokkaido Milk Whipped Cream",
    category: "moisturizer",
    price: 48,
    rating: 0,
    reviewsCount: 0,
    image: "/product_cream.png",
    hoverImage: "/product_cream_hover.png",
    badge: "Pre-order",
    tagline: "Ultra Hydration & Restore",
    description: "A rich whipped moisturizer utilizing fresh Hokkaido organic milk lipids, ceramides, and beta-glucan to soothe dry skin and lock in moisture for 48 hours.",
    ingredients: "Hokkaido Milk Lipids, Ceramide EOP/AP/NP, Beta-Glucan, Shea Butter, Centella Asiatica Extract.",
    usage: "Massage into face and neck morning and night, or layer on extra dry spots.",
    brandId: "kome-rituals", // Put under Kome/Hokkaido Japanese line
    collections: ["double-hydration-kit"],
    isPreorder: true,
    availableDate: "September 1, 2026"
  },
  {
    id: "upcoming_sakura",
    name: "Sakura Soothing Mist",
    category: "mist",
    price: 24,
    rating: 0,
    reviewsCount: 0,
    image: "/product_cleanser.png",
    hoverImage: "/product_cleanser_hover.png",
    badge: "Upcoming",
    tagline: "Calm & Balance",
    description: "An ultra-fine hydration mist infused with fresh cherry blossom distillate and centella asiatica. Instantly calms redness, balances oil-water levels, and sets makeup with a dewy glow.",
    ingredients: "Sakura Flower Distillate, Centella Asiatica Extract, Green Tea Extract, Sodium Hyaluronate.",
    usage: "Spray onto face from 8 inches away whenever skin feels dry or hot. Can be used under or over makeup.",
    brandId: "momo-glow",
    collections: ["glass-skin-routine", "pore-detox-ritual"],
    releaseSchedule: "Releasing Autumn 2026"
  },
  {
    id: "upcoming_yuzu",
    name: "Yuzu Glow Ampoule",
    category: "serum",
    price: 45,
    rating: 0,
    reviewsCount: 0,
    image: "/product_serum.png",
    hoverImage: "/product_serum_hover.png",
    badge: "Upcoming",
    tagline: "Revitalize & Energize",
    description: "A highly concentrated vitamin ampoule containing 70% cold-pressed Yuzu extract and stabilized vitamin C. Fades pigmentation, boosts cellular energy, and awakens dull complexions.",
    ingredients: "Yuzu (Citrus Junos) Fruit Extract (70%), Ascorbyl Glucoside, Niacinamide, Tranexamic Acid, Glutathione.",
    usage: "Apply 2-3 drops onto clean skin after toning. Follow with moisturizer and sun protection. Use daily.",
    brandId: "kome-rituals",
    collections: [],
    releaseSchedule: "Releasing Winter 2026"
  },
  {
    id: "yuzu_lip",
    name: "Yuzu Brightening Lip Balm",
    category: "lip",
    price: 18,
    rating: 4.7,
    reviewsCount: 33,
    image: "/product_cleanser.png", // Reuse
    hoverImage: "/product_cleanser_hover.png",
    tagline: "Vitamin C Overnight Lip Treatment",
    description: "A buttery, citrus-infused lip balm that gently exfoliates flaky lips, locks in deep moisture overnight, and naturally brightens lip tone.",
    ingredients: "Yuzu Seed Oil, Shea Butter, Macadamia Seed Oil, Squalane, Vitamin C (Tetrahexyldecyl Ascorbate).",
    usage: "Apply a generous layer onto lips before sleeping, or swipe on during the day as needed.",
    brandId: "kome-rituals",
    collections: ["double-hydration-kit"]
  }
];
