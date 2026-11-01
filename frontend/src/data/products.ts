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

export interface CategoryInfo {
  id: string;
  name: string;
  tagline: string;
  description: string;
  heroImage: string;
  accentColor: string;
}

export const categories: CategoryInfo[] = [
  {
    id: "alkaline-water",
    name: "Alkaline Water",
    tagline: "Ionized pH 9.0+ Mineral Hydration",
    description: "Naturally filtered through volcanic strata and gently ionized to an optimal pH 9.0 - 9.5+ for deep cellular hydration, bio-active electrolytes, and body balance.",
    heroImage: "/product_alkaline_water.png",
    accentColor: "#0B7285"
  },
  {
    id: "drinking-water",
    name: "Drinking Water",
    tagline: "Mt. Fuji & Hokkaido Spring Purity",
    description: "Crystal-pure mountain spring water filtered through porous alpine basalt layers for decades to produce velvety-soft, untainted daily hydration.",
    heroImage: "/product_drinking_water.png",
    accentColor: "#026F98"
  },
  {
    id: "chocolate",
    name: "Chocolates & Confectionery",
    tagline: "Artisanal Nama Ganache & Cacao",
    description: "Handcrafted Japanese Nama chocolate made with fresh Hokkaido double cream, ceremonial Uji matcha, and single-origin dark cacao that melts on the tongue.",
    heroImage: "/product_chocolate.png",
    accentColor: "#78350F"
  },
  {
    id: "gadgets",
    name: "Smart Gadgets",
    tagline: "Precision Japanese Beauty & Tech",
    description: "Cutting-edge Japanese wellness devices: nano-ionic facial steamers, ultrasonic EMS lifting wands, and portable hydrogen electrolysis generators.",
    heroImage: "/product_gadget_steamer.png",
    accentColor: "#CF3642"
  },
  {
    id: "serum",
    name: "Serums & Essences",
    tagline: "Translucent Glass-Skin Radiance",
    description: "Concentrated bioactive formulas featuring traditional Japanese fermented rice, sakura flower distillate, and brightening actives.",
    heroImage: "/product_serum.png",
    accentColor: "#D4AF37"
  },
  {
    id: "moisturizer",
    name: "Moisturizers & Creams",
    tagline: "Deep Barrier Nourishment",
    description: "Rich, skin-identical lipid creams powered by pure cold-pressed Camellia Japonica seed oil and soothing milk ceramides.",
    heroImage: "/product_cream.png",
    accentColor: "#A62B2B"
  },
  {
    id: "cleanser",
    name: "Cleansers & Balms",
    tagline: "Gentle Purity & Pore Clarity",
    description: "Silky melting cleansing oils and stone-ground matcha washes that purify makeup and environmental impurities without stripping skin.",
    heroImage: "/product_cleanser.png",
    accentColor: "#D66B78"
  },
  {
    id: "mask",
    name: "Masks & Treatments",
    tagline: "Detoxifying Clay & Overnight Jelly",
    description: "Organic green tea clarifying clay treatments and sleeping hydration masks for a bouncy, revived complexion.",
    heroImage: "/product_mask.png",
    accentColor: "#4E6E58"
  }
];

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
  image?: string; // Optional collection banner image
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
  },
  {
    id: "fuji-springs",
    name: "Fuji Pure Springs",
    logo: "/brand_fuji.svg",
    description: "Pristine volcanic mountain spring waters and micro-clustered ionized alkaline waters harvested from the sacred slopes of Mt. Fuji.",
    philosophy: "Filtering through decades of natural volcanic basalt strata to deliver ultra-soft, cellular-hydrating mineral purity direct from Japan.",
    accentColor: "#0B7285",
    accentColorLight: "#E3FAFC",
    bgGradient: "linear-gradient(135deg, #E6FCFF 0%, #C5F6FA 100%)",
    heroBanner: "/product_drinking_water.png",
    tagline: "Volcanic Alpine Purity"
  },
  {
    id: "hokkaido-cacao",
    name: "Hokkaido Cacao",
    logo: "/brand_cacao.svg",
    description: "Master confectionery blending single-origin ethical cacao with fresh Hokkaido double cream and traditional Japanese ganache artistry.",
    philosophy: "Honoring the delicate melt-in-mouth perfection of Japanese Nama chocolate and subtle infusion of Kyoto botanicals.",
    accentColor: "#78350F",
    accentColorLight: "#FEF3C7",
    bgGradient: "linear-gradient(135deg, #FFFBEB 0%, #FDE68A 100%)",
    heroBanner: "/product_chocolate.png",
    tagline: "Artisanal Nama Ganache"
  },
  {
    id: "mirai-tech",
    name: "Mirai Tokyo Tech",
    logo: "/brand_mirai.svg",
    description: "Pioneering Japanese biomedical engineering and ultrasonic beauty devices designed to elevate everyday self-care routines.",
    philosophy: "Merging clinical micro-vibration, nano-steam atomization, and modern Tokyo minimalism for effortless vitality.",
    accentColor: "#CF3642",
    accentColorLight: "#FFF5F5",
    bgGradient: "linear-gradient(135deg, #FFF5F5 0%, #FFE0E0 100%)",
    heroBanner: "/product_gadget_steamer.png",
    tagline: "Precision Beauty Tech"
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
    tagline: "4 Steps to Glass Skin",
    image: "/product_serum.png"
  },
  {
    id: "wellness-hydration",
    name: "Pure Hydration & Longevity",
    subtitle: "Cellular rejuvenation & alkaline balance",
    description: "An invigorating daily hydration ritual combining Mt. Fuji ionized alkaline water, antioxidant matcha infusions, and pristine alpine spring water.",
    accentColor: "#0B7285",
    bgGradient: "linear-gradient(135deg, #E6FCFF 0%, #C5F6FA 100%)",
    steps: [
      "Awaken: Drink chilled Mt. Fuji Ionized Alkaline Water pH 9.5+ upon waking to balance acidity.",
      "Revitalize: Midday antioxidant lift with Uji Matcha Bio-Alkaline Infusion.",
      "Restore: Evening pure hydration with Mt. Fuji Pristine Mountain Spring Water."
    ],
    tagline: "3 Steps to Cellular Hydration",
    image: "/product_drinking_water.png"
  },
  {
    id: "artisan-confections",
    name: "Artisanal Sweet Indulgence",
    subtitle: "Melt-in-mouth Nama chocolate & matcha ganache",
    description: "A sensory tasting journey through the finest Japanese confectionery. Experience velvety fresh-cream Nama chocolate, bittersweet ceremonial matcha, and zesty citrus cacao.",
    accentColor: "#78350F",
    bgGradient: "linear-gradient(135deg, #FFFBEB 0%, #FDE68A 100%)",
    steps: [
      "Matcha Harmony: Savor silky Uji Matcha Nama Chocolate with hot green tea.",
      "Dark Ganache: Melt-in-mouth indulgence with Hokkaido 72% Dark Cacao Truffles.",
      "Citrus Zest: Crisp crunch and aromatic perfume of Kochi Yuzu Dark Cacao."
    ],
    tagline: "3 Decadent Confectionery Moments",
    image: "/product_chocolate.png"
  },
  {
    id: "smart-beauty-tech",
    name: "Smart Tech & Hydration Ritual",
    subtitle: "Nano-steam, ultrasonic sculpting & hydrogen pure water",
    description: "An advanced ritual marrying ancient botanical serums with high-tech Japanese skincare devices for visible firming and maximum hydration.",
    accentColor: "#CF3642",
    bgGradient: "linear-gradient(135deg, #FFF5F5 0%, #FFE0E0 100%)",
    steps: [
      "Steam & Open: Prep pores with 10 minutes of Mirai Nano-Ionic Facial Hydration Steam.",
      "Treat & Infuse: Apply Rice Ferment Serum and sculpt with Ultrasonic EMS Wand.",
      "Hydrate: Replenish internally with antioxidant hydrogen water from the Mirai Smart Tumbler."
    ],
    tagline: "3 Steps to Tech-Powered Glow",
    image: "/product_gadget_steamer.png"
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
    tagline: "Calming Pore Purifier",
    image: "/product_mask.png"
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
    tagline: "Intense Barrier Repair",
    image: "/product_cream.png"
  },
  {
    id: "ladies-care",
    name: "Ladies' Luxury Collection",
    subtitle: "Illuminate, firm & plumping overnight care",
    description: "A luxurious skincare experience that restores youthful vitality and glass-skin radiance. Packed with antioxidant-rich Sakura, collagen-boosting peptides, and hydrating peach nectar.",
    accentColor: "#CF3642",
    bgGradient: "linear-gradient(135deg, #FDF7F8 0%, #F5DDE1 100%)",
    steps: [
      "Treat: Boost radiance with Porcelain Sakura Glow Serum.",
      "Moisturize: Firm and restore skin barrier with Tsubaki Blossom Anti-Aging Cream.",
      "Overnight Mask: Lock in hydration with Momo Rosewater Hydra-Gel Mask."
    ],
    tagline: "3 Steps to Glass-Skin Youth",
    image: "/collection_ladies.png"
  },
  {
    id: "men-care",
    name: "Men's Care Collection",
    subtitle: "Cleanse, soothe & control shine",
    description: "A simple, high-performance skincare routine designed for men. Formulated to control excess sebum, soothe razor burn, and keep skin deeply hydrated with a velvet-matte finish.",
    accentColor: "#026F98",
    bgGradient: "linear-gradient(135deg, #F0F4F5 0%, #D4E3EA 100%)",
    steps: [
      "Cleanse: Purify pores with Uji Matcha Charcoal Wash.",
      "Soothe: Calm razor irritation using Tsubaki Men's Shave & Beard Balm.",
      "Moisturize: Hydrate and control shine with Rice Ferment Matte Moisturizer."
    ],
    tagline: "3 Steps to Refined Skin",
    image: "/collection_men.png"
  },
  {
    id: "baby-care",
    name: "Baby & Kids Gentle Collection",
    subtitle: "Pure, allergen-free & ultra-soothing protection",
    description: "Pediatrician-tested, fragrance-free formulations crafted for hyper-sensitive infant skin. Combines comforting oatmeal, natural milk lipids, and nourishing camellia seed oil.",
    accentColor: "#D4AF37",
    bgGradient: "linear-gradient(135deg, #FDFBF7 0%, #F3ECE0 100%)",
    steps: [
      "Bath: Cleanse skin gently head-to-toe with Hokkaido Milk & Oat Baby Wash.",
      "Soothe: Protect dry patches or diaper rash with Sweet Peach Calming Baby Balm.",
      "Lotion: Nourish and soften skin with Camellia Seed Ultra-Soft Baby Lotion."
    ],
    tagline: "3 Steps to Comfort Baby",
    image: "/collection_baby.png"
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
  },
  // Men's Skincare Collection
  {
    id: "men_matcha_wash",
    name: "Uji Matcha Charcoal Wash",
    category: "cleanser",
    price: 29,
    rating: 4.8,
    reviewsCount: 34,
    image: "/product_cleanser.png",
    hoverImage: "/product_cleanser_hover.png",
    badge: "Oil Control",
    tagline: "Purify & Mattify",
    description: "A high-performance foaming cleanser combining stone-ground Uji Matcha with active binchotan charcoal. It deep cleanses pores, balances sebum, and prevents razor bumps without stripping.",
    ingredients: "Uji Matcha (Camellia Sinensis Leaf Powder), Binchotan Charcoal, Salicylic Acid (0.5%), Licorice Root Extract, Aloe Vera Leaf Juice.",
    usage: "Lather a small amount between wet hands and massage onto face in circular motions. Rinse thoroughly with lukewarm water. Use morning and night.",
    brandId: "uji-matcha-co",
    collections: ["men-care"]
  },
  {
    id: "men_tsubaki_balm",
    name: "Tsubaki Men's Shave & Beard Balm",
    category: "moisturizer",
    price: 35,
    rating: 4.9,
    reviewsCount: 26,
    image: "/product_cream.png",
    hoverImage: "/product_cream_hover.png",
    badge: "Soothe & Soften",
    tagline: "Post-Shave Recovery",
    description: "A fast-absorbing, cooling balm packed with cold-pressed Camellia oil and soothing centella. It instantly calms razor burn, hydrates skin, and conditions facial hair for a soft finish.",
    ingredients: "Camellia Japonica Seed Oil, Centella Asiatica (Cica) Extract, Allantoin, Witch Hazel, Hyaluronic Acid, Menthol.",
    usage: "Apply 1-2 pumps onto freshly shaved skin or throughout beard. Smooth gently over face and neck until fully absorbed.",
    brandId: "tsubaki-labs",
    collections: ["men-care"]
  },
  {
    id: "men_kome_matte",
    name: "Rice Ferment Matte Moisturizer",
    category: "moisturizer",
    price: 32,
    rating: 4.7,
    reviewsCount: 42,
    image: "/product_cream.png",
    hoverImage: "/product_cream_hover.png",
    badge: "Zero Shine",
    tagline: "Ultra-Lightweight Hydration",
    description: "Formulated with fermented rice water and oil-absorbing minerals, this weightless gel-cream delivers 24-hour hydration while leaving a clean, velvet-matte finish.",
    ingredients: "Rice Ferment Filtrate (Sake Extract), Niacinamide (3%), Green Tea Extract, Sodium Hyaluronate, Silica.",
    usage: "Smooth a pea-sized amount onto face and neck after cleansing or toning. Ideal for daytime use to control oil.",
    brandId: "kome-rituals",
    collections: ["men-care"]
  },
  // Ladies' Skincare Collection
  {
    id: "ladies_sakura_serum",
    name: "Porcelain Sakura Glow Serum",
    category: "serum",
    price: 45,
    rating: 5.0,
    reviewsCount: 78,
    image: "/product_serum.png",
    hoverImage: "/product_serum_hover.png",
    badge: "Top Rated",
    tagline: "Instant Glass-Skin Luminosity",
    description: "A luxury brightening serum infused with hand-harvested Sakura distillate and arbutin. It targets hyperpigmentation, uneven skin tone, and dullness for a glowing, porcelain complexion.",
    ingredients: "Sakura Flower Distillate, Alpha-Arbutin (2%), Niacinamide (5%), Pearl Powder, Hyaluronic Acid.",
    usage: "Dispense 3-4 drops onto palms and pat gently into clean face and neck. For maximum glass-skin glow, use morning and night.",
    brandId: "momo-glow",
    collections: ["ladies-care"]
  },
  {
    id: "ladies_tsubaki_cream",
    name: "Tsubaki Blossom Anti-Aging Cream",
    category: "moisturizer",
    price: 58,
    rating: 4.9,
    reviewsCount: 64,
    image: "/product_cream.png",
    hoverImage: "/product_cream_hover.png",
    badge: "Luxury Care",
    tagline: "Firm & Restore Resilience",
    description: "A rich, indulgent cream combining island Camellia seed oil with botanical peptides. It targets fine lines, boosts collagen production, and restores youthful plumpness to mature or dry skin.",
    ingredients: "Camellia Japonica Seed Oil, Acetyl Hexapeptide-8, Adenosine, Rice Bran Extract, Ceramide NP.",
    usage: "Warm a small amount between fingertips and massage onto face and neck in upward, lifting motions. Use as the final step in your evening routine.",
    brandId: "tsubaki-labs",
    collections: ["ladies-care"]
  },
  {
    id: "ladies_momo_mask",
    name: "Momo Rosewater Hydra-Gel Mask",
    category: "mask",
    price: 36,
    rating: 4.8,
    reviewsCount: 47,
    image: "/product_mask.png",
    hoverImage: "/product_mask_hover.png",
    badge: "Hydration Boost",
    tagline: "Overnight Petal Plump",
    description: "An overnight jelly-gel mask infused with Japanese peach extract and rose distillate. It locks in moisture while you sleep, revealing bouncy, deeply hydrated, peach-soft skin by morning.",
    ingredients: "Prunus Persica (Peach) Fruit Water, Rose Flower Distillate, Honey Extract, Squalane, Centella Asiatica, Beta-Glucan.",
    usage: "Smooth a generous layer over skin as the final step of your evening routine. Leave on overnight and rinse with warm water in the morning. Use 2-3 times a week.",
    brandId: "momo-glow",
    collections: ["ladies-care"]
  },
  // Baby Skincare Collection
  {
    id: "baby_oat_wash",
    name: "Hokkaido Milk & Oat Baby Wash",
    category: "cleanser",
    price: 24,
    rating: 4.9,
    reviewsCount: 55,
    image: "/product_cleanser.png",
    hoverImage: "/product_cleanser_hover.png",
    badge: "Tear-Free",
    tagline: "Gentle Head-to-Toe Care",
    description: "An ultra-gentle, soap-free body wash and shampoo formulated for newborns and toddlers. Enriched with nourishing Hokkaido milk lipids and colloidal oatmeal to protect delicate skin barriers.",
    ingredients: "Hokkaido Organic Milk Lipids, Colloidal Oatmeal, Aloe Vera Extract, Chamomile Extract, Glycerin.",
    usage: "Apply a small amount to wet skin and hair, lather gently, and rinse thoroughly. Perfect for daily bath time.",
    brandId: "kome-rituals",
    collections: ["baby-care"]
  },
  {
    id: "baby_peach_balm",
    name: "Sweet Peach Calming Baby Balm",
    category: "moisturizer",
    price: 22,
    rating: 5.0,
    reviewsCount: 39,
    image: "/product_cream.png",
    hoverImage: "/product_cream_hover.png",
    badge: "Hypoallergenic",
    tagline: "Immediate Dry Patch Relief",
    description: "A rich, protective barrier balm that relieves eczema, cradle cap, and dry, irritated patches. Formulated with skin-calming peach extract and organic chamomile oil.",
    ingredients: "Peach Kernel Oil, Organic Chamomile Extract, Shea Butter, Sunflower Seed Wax, Calendula Extract.",
    usage: "Apply a thin layer to affected dry patches, cheeks, or diaper area. Repeat as needed throughout the day.",
    brandId: "momo-glow",
    collections: ["baby-care"]
  },
  {
    id: "baby_camellia_lotion",
    name: "Camellia Seed Ultra-Soft Baby Lotion",
    category: "moisturizer",
    price: 26,
    rating: 4.9,
    reviewsCount: 41,
    image: "/product_cream.png",
    hoverImage: "/product_cream_hover.png",
    badge: "Pediatrician Tested",
    tagline: "Soothing 24Hr Moisture",
    description: "A lightweight, fragrance-free moisturizing lotion crafted with organic Camellia seed oil to nourish delicate skin and maintain natural pH balance.",
    ingredients: "Camellia Japonica Seed Oil, Jojoba Seed Oil, Squalane, Tocopherol (Vitamin E), Panthenol.",
    usage: "Gently massage onto baby's face and body after a bath, or anytime skin feels dry. Suitable for daily use.",
    brandId: "tsubaki-labs",
    collections: ["baby-care"]
  },

  // Alkaline Water Collection
  {
    id: "alkaline_fuji_95",
    name: "Mt. Fuji Ionized Alkaline Water pH 9.5+",
    category: "alkaline-water",
    price: 18,
    rating: 5,
    reviewsCount: 64,
    image: "/product_alkaline_water.png",
    hoverImage: "/product_alkaline_water_hover.png",
    badge: "Top Rated",
    tagline: "Micro-Clustered Electrolyte Hydration",
    description: "Naturally filtered through 60 years of Mt. Fuji volcanic basalt layers and gently ionized to an optimal pH 9.5+. Delivers rapid cellular hydration, bio-available minerals, and a crisp, silky taste.",
    ingredients: "100% Japanese Volcanic Spring Water, Ionized Electrolytes (Potassium, Magnesium, Calcium, Natural Silica). pH 9.5+.",
    usage: "Drink chilled throughout the day for daily cellular hydration, post-workout recovery, or to restore body pH balance after meals.",
    brandId: "fuji-springs",
    collections: ["wellness-hydration"]
  },
  {
    id: "alkaline_matcha_bio",
    name: "Uji Matcha Bio-Alkaline Infusion",
    category: "alkaline-water",
    price: 24,
    rating: 5,
    reviewsCount: 48,
    image: "/product_alkaline_water.png",
    hoverImage: "/product_alkaline_water_hover.png",
    badge: "Antioxidant Rich",
    tagline: "Clean Catechins & pH 9.2",
    description: "A restorative fusion of pH 9.2 alkaline spring water cold-steeped with ceremonial grade Uji matcha catechins and organic bamboo silica for an inner vitality glow.",
    ingredients: "Ionized Alkaline Spring Water (pH 9.2), Cold-Brewed Ceremonial Uji Matcha, Bamboo Extract (Organic Silica), Marine Ionic Minerals.",
    usage: "Gently invert before opening. Best served crisp and cold in the morning or as an invigorating afternoon revitalizer.",
    brandId: "uji-matcha-co",
    collections: ["wellness-hydration"]
  },
  {
    id: "alkaline_kochi_ocean",
    name: "Kochi Deep Ocean Alkaline Mineral Water",
    category: "alkaline-water",
    price: 22,
    rating: 4.8,
    reviewsCount: 37,
    image: "/product_alkaline_water.png",
    hoverImage: "/product_alkaline_water_hover.png",
    badge: "Deep Sea Minerals",
    tagline: "Purity from 600m Deep Waters",
    description: "Drawn from pristine Pacific deep ocean currents off the coast of Kochi at depths of 600 meters, naturally alkalized and enriched with over 70 bio-active trace minerals.",
    ingredients: "Deep Sea Mineral Water, Magnesium Chloride, Calcium Carbonate, Potassium Bicarbonate, Trace Ocean Elements (pH 9.0).",
    usage: "Sip throughout the day to boost alkalinity, replenish trace electrolytes, and support digestive harmony.",
    brandId: "fuji-springs",
    collections: ["wellness-hydration"]
  },

  // Drinking Water Collection
  {
    id: "fuji_pristine_spring",
    name: "Mt. Fuji Pristine Mountain Spring Water",
    category: "drinking-water",
    price: 16,
    rating: 5,
    reviewsCount: 88,
    image: "/product_drinking_water.png",
    hoverImage: "/product_drinking_water_hover.png",
    badge: "Best Seller",
    tagline: "Naturally Filtered for 60 Years",
    description: "Drawn directly from protected alpine springs nestled on Mt. Fuji's pristine northern slopes. Filtered naturally for over 60 years through porous volcanic rock strata to produce ultra-soft, crystal-pure drinking water.",
    ingredients: "100% Natural Japanese Mountain Spring Water. Hardness 25mg/L (Ultra-Soft). Naturally Contains Vanadium and Silica.",
    usage: "Serve at room temperature or lightly chilled. Exceptional for brewing premium Japanese green tea, pour-over coffee, and daily pure hydration.",
    brandId: "fuji-springs",
    collections: ["wellness-hydration"]
  },
  {
    id: "hokkaido_glacier_water",
    name: "Hokkaido Snowmelt Glacier Drinking Water",
    category: "drinking-water",
    price: 19,
    rating: 4.9,
    reviewsCount: 53,
    image: "/product_drinking_water.png",
    hoverImage: "/product_drinking_water_hover.png",
    badge: "Pure Alpine",
    tagline: "Untouched Northern Wilderness",
    description: "Sourced from protected snowmelt springs in the Daisetsuzan mountain range of Hokkaido. Renowned for its velvety texture, crisp sweet finish, and untouched natural purity.",
    ingredients: "100% Hokkaido Natural Alpine Spring Water. Low sodium, mineral balanced, ultra-soft mountain water.",
    usage: "Enjoy chilled straight from the glass bottle for the ultimate crisp, refreshing drinking experience.",
    brandId: "fuji-springs",
    collections: ["wellness-hydration"]
  },
  {
    id: "sakura_blossom_spring",
    name: "Sakura Blossom Infused Spring Water",
    category: "drinking-water",
    price: 21,
    rating: 4.8,
    reviewsCount: 39,
    image: "/product_drinking_water.png",
    hoverImage: "/product_drinking_water_hover.png",
    badge: "Seasonal Edition",
    tagline: "Subtle Floral Botanical Refreshment",
    description: "Pristine Japanese spring water delicately vapor-infused with hand-harvested Sakura cherry blossoms. Zero sugar, zero calories, with an enchanting whispering aroma of Japanese springtime.",
    ingredients: "Natural Mountain Spring Water, Organic Sakura Flower Essence (Prunus Lannesiana), Citric Acid.",
    usage: "Serve chilled in a tall stemmed glass over clear ice cubes for an elegant, aromatic hydration ritual.",
    brandId: "momo-glow",
    collections: ["wellness-hydration"]
  },
  {
    id: "preorder_hokkaido_sparkling",
    name: "Hokkaido Sparkling Alpine Spring Water",
    category: "drinking-water",
    price: 20,
    rating: 0,
    reviewsCount: 0,
    image: "/product_drinking_water.png",
    hoverImage: "/product_drinking_water_hover.png",
    badge: "Pre-order",
    tagline: "Effervescent Volcano Bubbles",
    description: "Naturally effervescent micro-bubbles blended into pure Hokkaido snowmelt water. Delivers a champagne-fine bubble texture that cleanses the palate.",
    ingredients: "Hokkaido Spring Water, Carbon Dioxide, Natural Mineral Bicarbonates.",
    usage: "Pour over ice and garnish with fresh yuzu or lemon peel alongside gourmet dining.",
    brandId: "fuji-springs",
    collections: ["wellness-hydration"],
    isPreorder: true,
    availableDate: "September 15, 2026"
  },

  // Chocolates & Confectionery Collection
  {
    id: "matcha_nama_chocolate",
    name: "Kyoto Uji Matcha Nama Chocolate Ganache",
    category: "chocolate",
    price: 28,
    rating: 5,
    reviewsCount: 112,
    image: "/product_chocolate.png",
    hoverImage: "/product_chocolate_hover.png",
    badge: "Award Winner",
    tagline: "Melt-in-Your-Mouth Velvet Luxury",
    description: "Handcrafted artisanal Japanese Nama chocolate made with pure Hokkaido fresh double cream and stone-ground ceremonial Uji matcha. Dusted in vibrant green matcha powder for a sublime bittersweet balance that melts instantly on the tongue.",
    ingredients: "White Chocolate (Cocoa Butter, Sugar, Whole Milk Powder), Hokkaido Fresh Cream, Ceremonial Uji Matcha Powder, Butter, Glucose.",
    usage: "Keep refrigerated at 10°C (50°F). Enjoy slightly below room temperature paired with green tea, espresso, or dry champagne.",
    brandId: "uji-matcha-co",
    collections: ["artisan-confections"]
  },
  {
    id: "hokkaido_dark_truffles",
    name: "Hokkaido 72% Dark Cacao Truffles",
    category: "chocolate",
    price: 26,
    rating: 5,
    reviewsCount: 85,
    image: "/product_chocolate.png",
    hoverImage: "/product_chocolate_hover.png",
    badge: "Best Seller",
    tagline: "Rich Ganache & Flaked Sea Salt",
    description: "Intense 72% single-origin dark cacao blended with rich farm-fresh Hokkaido butter and flaked sea salt crystals from the Okhotsk Sea. Deep roasted aromatic notes with a silky smooth ganache finish.",
    ingredients: "72% Dark Cacao Mass, Cocoa Butter, Unrefined Cane Sugar, Hokkaido Butter, Okhotsk Sea Salt, Natural Vanilla Bean.",
    usage: "Savor slowly one truffle at a time to experience the gradual melting of bitter cacao into rich creamy sweetness.",
    brandId: "hokkaido-cacao",
    collections: ["artisan-confections"]
  },
  {
    id: "momo_ruby_chocolate",
    name: "Momo Ruby & White Peach Chocolate Bark",
    category: "chocolate",
    price: 22,
    rating: 4.9,
    reviewsCount: 47,
    image: "/product_chocolate.png",
    hoverImage: "/product_chocolate_hover.png",
    badge: "Artisanal",
    tagline: "Natural Berry Notes & Crispy Peach",
    description: "Crafted from naturally pink Ruby cocoa beans layered with velvety white chocolate and freeze-dried Yamanashi white peach slivers. Fruity, tangy, and decadently creamy.",
    ingredients: "Ruby Cacao Mass, Cocoa Butter, Whole Milk Powder, Freeze-Dried Yamanashi White Peach, Citric Acid, Soy Lecithin.",
    usage: "Snap off a crisp piece for a delightfully fruity afternoon sweet treat or pair with sparkling rosé.",
    brandId: "momo-glow",
    collections: ["artisan-confections"]
  },
  {
    id: "yuzu_dark_chocolate",
    name: "Kochi Yuzu & Roasted Dark Cacao Bar",
    category: "chocolate",
    price: 19,
    rating: 4.8,
    reviewsCount: 38,
    image: "/product_chocolate.png",
    hoverImage: "/product_chocolate_hover.png",
    badge: "Citrus Zest",
    tagline: "Candied Citrus Peel & 68% Cacao",
    description: "Sun-dried candied Kochi Yuzu citrus peel folded into single-estate 68% dark chocolate. Zesty, aromatic citrus blossoms dance against deep roasted cacao.",
    ingredients: "Cacao Beans, Cane Sugar, Candied Yuzu Peel (Yuzu, Sugar, Honey), Cocoa Butter, Sea Salt.",
    usage: "Break into squares and let melt on the palate to release the vibrant yuzu citrus essential oils.",
    brandId: "kome-rituals",
    collections: ["artisan-confections"]
  },
  {
    id: "upcoming_nama_gold",
    name: "Kyoto 24K Gold Leaf Dark Nama Ganache",
    category: "chocolate",
    price: 36,
    rating: 0,
    reviewsCount: 0,
    image: "/product_chocolate.png",
    hoverImage: "/product_chocolate_hover.png",
    badge: "Upcoming",
    tagline: "Kanazawa Gold Leaf Edition",
    description: "Ultra-luxury dark ganache squares crafted from 80% grand cru cacao and finished with hand-applied Kanazawa 24-karat edible gold leaf. The ultimate luxury indulgence.",
    ingredients: "Grand Cru 80% Cacao Mass, Hokkaido Cream, Kanazawa Edible 24K Gold Leaf, Organic Cane Sugar, Madagascar Vanilla.",
    usage: "Best presented as an extraordinary gift or saved for special celebration tastings.",
    brandId: "hokkaido-cacao",
    collections: ["artisan-confections"],
    releaseSchedule: "Releasing Winter 2026"
  },

  // Smart Beauty & Lifestyle Gadgets
  {
    id: "gadget_nano_steamer",
    name: "Mirai Nano-Ionic Facial Hydration Steamer",
    category: "gadgets",
    price: 89,
    rating: 5,
    reviewsCount: 92,
    image: "/product_gadget_steamer.png",
    hoverImage: "/product_gadget_steamer_hover.png",
    badge: "Best Seller",
    tagline: "Ultra-Fine Warm Ionic Steam",
    description: "Engineered with advanced Japanese ceramic heating elements to generate nano-sized steam particles 10x smaller than regular steam. Penetrates deep into pores to melt impurities, prep skin for serums, and boost hydration by 130%.",
    ingredients: "BPA-Free Medical-Grade Polymers, Ceramic PTC Heating Element, Nano-Atomizing Ultrasonic Nozzle.",
    usage: "Fill tank with distilled or Mt. Fuji spring water. Position face 8 inches away and enjoy a soothing 10-minute facial steam session before applying serums or masks.",
    brandId: "mirai-tech",
    collections: ["smart-beauty-tech"]
  },
  {
    id: "gadget_ultrasonic_wand",
    name: "Mirai Ultrasonic EMS Facial Sculpting Wand",
    category: "gadgets",
    price: 120,
    rating: 5,
    reviewsCount: 74,
    image: "/product_gadget_wand.png",
    hoverImage: "/product_gadget_wand_hover.png",
    badge: "Top Tech",
    tagline: "Micro-Current EMS & 24kHz Sonic Lift",
    description: "Delivers 24,000 ultrasonic oscillations per minute combined with gentle micro-current EMS stimulation. Firms facial contours, lifts jawlines, and drives active serum nutrients deep into dermal layers.",
    ingredients: "Hypoallergenic Titanium Applicator Head, Aerospace-Grade Aluminum Alloy, Wireless Magnetic Charging Dock.",
    usage: "Apply Rice Ferment Serum or Camellia Oil to clean skin. Glide the wand along jawline, cheekbones, and forehead in upward motions for 5 minutes daily.",
    brandId: "mirai-tech",
    collections: ["smart-beauty-tech"]
  },
  {
    id: "gadget_hydrogen_bottle",
    name: "Mirai Smart Hydrogen & Alkaline Water Bottle",
    category: "gadgets",
    price: 145,
    rating: 4.9,
    reviewsCount: 58,
    image: "/product_gadget_hydrogen.png",
    hoverImage: "/product_gadget_hydrogen_hover.png",
    badge: "Innovation Award",
    tagline: "SPE/PEM Platinum Electrolysis up to 3000ppb",
    description: "Featuring state-of-the-art Japanese SPE/PEM platinum titanium electrolysis technology. Generates therapeutic concentrations of antioxidant molecular hydrogen (up to 3000 ppb) and optimizes drinking water alkalinity in just 3 minutes.",
    ingredients: "Thermal Shock-Resistant Borosilicate Glass, Medical Platinum-Coated Titanium Plates, DuPont SPE Membrane, OLED Digital Display.",
    usage: "Fill with Mt. Fuji drinking water or filtered water, press the one-touch sensor, and drink immediately once electrolysis cycle completes.",
    brandId: "mirai-tech",
    collections: ["wellness-hydration", "smart-beauty-tech"]
  },
  {
    id: "gadget_heated_eye_mask",
    name: "ZenFlow Heated Smart Eye Acupressure Mask",
    category: "gadgets",
    price: 68,
    rating: 4.9,
    reviewsCount: 41,
    image: "/product_gadget_steamer.png",
    hoverImage: "/product_gadget_steamer_hover.png",
    badge: "Sleep & Relief",
    tagline: "Thermal Airbag Compression & Ambient Audio",
    description: "Combines 42°C constant soothing thermal warmth with multi-frequency airbag acupressure around temples and ocular acupoints to eliminate digital eye fatigue, tension headaches, and dark under-eye circles.",
    ingredients: "Soft Breathable Cloud Protein Leather, Graphene Fast-Heating Element, Built-in Zen Audio Soundscapes.",
    usage: "Wear comfortably over eyes before bedtime or during screen breaks. Select from 5 preset thermal modes for a 15-minute restorative session.",
    brandId: "mirai-tech",
    collections: ["smart-beauty-tech"]
  }
];
