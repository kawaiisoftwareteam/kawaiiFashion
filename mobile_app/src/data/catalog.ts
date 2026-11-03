import type { ImageSource } from "expo-image";

export const images = {
  landscape: require("../../assets/images/kawaii_beauty_landscape.png") as ImageSource,
  hero: require("../../assets/images/kawaii_beauty_hero.png") as ImageSource,
  serum: require("../../assets/images/product_serum.png") as ImageSource,
  cream: require("../../assets/images/product_cream.png") as ImageSource,
  cleanser: require("../../assets/images/product_cleanser.png") as ImageSource,
  mask: require("../../assets/images/product_mask.png") as ImageSource,
  alkaline: require("../../assets/images/product_alkaline_water.png") as ImageSource,
  water: require("../../assets/images/product_drinking_water.png") as ImageSource,
  chocolate: require("../../assets/images/product_chocolate.png") as ImageSource,
  steamer: require("../../assets/images/product_gadget_steamer.png") as ImageSource,
  wand: require("../../assets/images/product_gadget_wand.png") as ImageSource,
  hydrogen: require("../../assets/images/product_gadget_hydrogen.png") as ImageSource,
  ladies: require("../../assets/images/collection_ladies.png") as ImageSource,
  men: require("../../assets/images/collection_men.png") as ImageSource,
  baby: require("../../assets/images/collection_baby.png") as ImageSource,
};

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviewsCount: number;
  image: ImageSource;
  badge?: string;
  tagline: string;
  description: string;
  ingredients: string;
  usage: string;
  brandId: string;
  origin: string;
};

export type Category = {
  id: string;
  name: string;
  accent: string;
};

export type Collection = {
  id: string;
  name: string;
  subtitle: string;
  image: ImageSource;
  productIds: string[];
  accent: string;
};

export type Brand = {
  id: string;
  name: string;
  tagline: string;
};

export const categories: Category[] = [
  { id: "all", name: "All", accent: "#1C1714" },
  { id: "serum", name: "Serums", accent: "#B08D57" },
  { id: "moisturizer", name: "Creams", accent: "#A42B35" },
  { id: "cleanser", name: "Cleansers", accent: "#D66B78" },
  { id: "mask", name: "Masks", accent: "#4E6E58" },
  { id: "alkaline-water", name: "Alkaline", accent: "#0B7285" },
  { id: "drinking-water", name: "Spring", accent: "#026F98" },
  { id: "chocolate", name: "Nama", accent: "#78350F" },
  { id: "gadgets", name: "Tech", accent: "#CF3642" },
];

export const brands: Brand[] = [
  { id: "kome-rituals", name: "Kome Rituals", tagline: "Fermented rice radiance" },
  { id: "tsubaki-labs", name: "Tsubaki Labs", tagline: "Oshima camellia oil" },
  { id: "uji-matcha-co", name: "Uji Matcha Co.", tagline: "Kyoto green tea purify" },
  { id: "momo-glow", name: "Momo Glow", tagline: "Peach blossom plump" },
  { id: "fuji-springs", name: "Fuji Pure Springs", tagline: "Volcanic alpine purity" },
  { id: "hokkaido-cacao", name: "Hokkaido Cacao", tagline: "Artisanal nama ganache" },
  { id: "mirai-tech", name: "Mirai Tokyo Tech", tagline: "Precision beauty tech" },
];

export const products: Product[] = [
  {
    id: "serum",
    name: "Rice Ferment Brightening Serum",
    category: "serum",
    price: 36,
    rating: 5,
    reviewsCount: 48,
    image: images.serum,
    badge: "Best Seller",
    tagline: "Hydrate & illuminate",
    description:
      "Infused with traditional sake extract and niacinamide. A lightweight essence that refines texture and leaves a translucent glass-skin glow.",
    ingredients: "Sake extract, niacinamide 5%, hyaluronic acid, licorice root, green tea.",
    usage: "Press 2–3 drops into damp skin morning and night before moisturizer.",
    brandId: "kome-rituals",
    origin: "Niigata",
  },
  {
    id: "cream",
    name: "Camellia Nourishing Cream",
    category: "moisturizer",
    price: 42,
    rating: 5,
    reviewsCount: 36,
    image: images.cream,
    badge: "Award Winner",
    tagline: "Deep moisture lock",
    description:
      "Velvety cream with cold-pressed Camellia Japonica seed oil from Oshima. Restores the lipid barrier and softens fine lines.",
    ingredients: "Camellia Japonica seed oil, shea butter, squalane, ceramide NP, cica.",
    usage: "Warm a pea-sized amount and press into face and neck as the last evening step.",
    brandId: "tsubaki-labs",
    origin: "Oshima",
  },
  {
    id: "cleanser",
    name: "Peach Blossom Cleansing Oil",
    category: "cleanser",
    price: 28,
    rating: 4.9,
    reviewsCount: 52,
    image: images.cleanser,
    badge: "Must Have",
    tagline: "Gentle melting balm",
    description:
      "A lightweight oil that emulsifies on contact with water, dissolving makeup and sunscreen while nourishing with peach kernel oil.",
    ingredients: "Peach kernel oil, olive fruit oil, jojoba esters, peach blossom extract.",
    usage: "Massage onto dry skin, add water to emulsify, then rinse thoroughly.",
    brandId: "momo-glow",
    origin: "Yamanashi",
  },
  {
    id: "mask",
    name: "Matcha Green Tea Clay Mask",
    category: "mask",
    price: 34,
    rating: 4.7,
    reviewsCount: 41,
    image: images.mask,
    badge: "Detox",
    tagline: "Purify & soothe pores",
    description:
      "Creamy clay with ceremonial Uji matcha and kaolin. Detoxifies pores without stripping or drying the skin.",
    ingredients: "Uji matcha, kaolin, bentonite, aloe, panthenol, allantoin.",
    usage: "Apply evenly, leave 10–12 minutes, rinse with warm water. 1–2 times weekly.",
    brandId: "uji-matcha-co",
    origin: "Kyoto",
  },
  {
    id: "ladies_sakura_serum",
    name: "Porcelain Sakura Glow Serum",
    category: "serum",
    price: 45,
    rating: 5,
    reviewsCount: 78,
    image: images.serum,
    badge: "Top Rated",
    tagline: "Glass-skin luminosity",
    description:
      "Hand-harvested sakura distillate and arbutin target dullness and uneven tone for a porcelain complexion.",
    ingredients: "Sakura distillate, alpha-arbutin 2%, niacinamide 5%, pearl powder.",
    usage: "Pat 3–4 drops into clean skin morning and night.",
    brandId: "momo-glow",
    origin: "Yoshino",
  },
  {
    id: "alkaline_fuji_95",
    name: "Mt. Fuji Ionized Alkaline Water pH 9.5+",
    category: "alkaline-water",
    price: 18,
    rating: 5,
    reviewsCount: 64,
    image: images.alkaline,
    badge: "Top Rated",
    tagline: "Micro-clustered hydration",
    description:
      "Filtered through sixty years of Mt. Fuji volcanic basalt, then ionized to pH 9.5+ for silky, mineral-rich hydration.",
    ingredients: "Japanese volcanic spring water, potassium, magnesium, calcium, silica. pH 9.5+.",
    usage: "Drink chilled through the day, after meals, or post-training.",
    brandId: "fuji-springs",
    origin: "Mt. Fuji",
  },
  {
    id: "fuji_pristine_spring",
    name: "Mt. Fuji Pristine Mountain Spring Water",
    category: "drinking-water",
    price: 16,
    rating: 5,
    reviewsCount: 88,
    image: images.water,
    badge: "Best Seller",
    tagline: "Naturally filtered 60 years",
    description:
      "Drawn from protected alpine springs on Fuji’s northern slope. Ultra-soft, crystal-pure drinking water.",
    ingredients: "100% natural Japanese mountain spring water. Hardness 25mg/L.",
    usage: "Serve at room temperature or lightly chilled. Ideal for tea and daily sipping.",
    brandId: "fuji-springs",
    origin: "Mt. Fuji",
  },
  {
    id: "matcha_nama_chocolate",
    name: "Kyoto Uji Matcha Nama Chocolate",
    category: "chocolate",
    price: 28,
    rating: 5,
    reviewsCount: 112,
    image: images.chocolate,
    badge: "Award Winner",
    tagline: "Melt-in-mouth velvet",
    description:
      "Nama ganache of Hokkaido cream and stone-ground ceremonial Uji matcha. Dusted in vibrant green tea powder.",
    ingredients: "White chocolate, Hokkaido cream, ceremonial Uji matcha, butter.",
    usage: "Keep refrigerated. Enjoy slightly below room temperature with green tea.",
    brandId: "uji-matcha-co",
    origin: "Kyoto",
  },
  {
    id: "hokkaido_dark_truffles",
    name: "Hokkaido 72% Dark Cacao Truffles",
    category: "chocolate",
    price: 26,
    rating: 5,
    reviewsCount: 85,
    image: images.chocolate,
    badge: "Best Seller",
    tagline: "Ganache & Okhotsk salt",
    description:
      "72% single-origin cacao with Hokkaido butter and flaked Okhotsk sea salt. Deep roast, silk finish.",
    ingredients: "72% cacao, cocoa butter, Hokkaido butter, Okhotsk sea salt, vanilla.",
    usage: "Savor slowly, one truffle at a time.",
    brandId: "hokkaido-cacao",
    origin: "Hokkaido",
  },
  {
    id: "gadget_nano_steamer",
    name: "Mirai Nano-Ionic Facial Steamer",
    category: "gadgets",
    price: 89,
    rating: 5,
    reviewsCount: 92,
    image: images.steamer,
    badge: "Best Seller",
    tagline: "Ultra-fine warm ionic steam",
    description:
      "Japanese ceramic heating creates nano steam particles that open pores, melt impurities, and prep skin for serums.",
    ingredients: "Medical-grade polymers, ceramic PTC heater, nano-atomizing nozzle.",
    usage: "Fill with distilled or Fuji spring water. Steam 10 minutes before serums.",
    brandId: "mirai-tech",
    origin: "Tokyo",
  },
  {
    id: "gadget_ultrasonic_wand",
    name: "Mirai Ultrasonic EMS Sculpting Wand",
    category: "gadgets",
    price: 120,
    rating: 5,
    reviewsCount: 74,
    image: images.wand,
    badge: "Top Tech",
    tagline: "24kHz sonic lift",
    description:
      "24,000 ultrasonic oscillations with gentle EMS. Firms contours and drives serum deeper.",
    ingredients: "Titanium applicator, aerospace aluminum, magnetic charging dock.",
    usage: "Apply serum, then glide upward along jaw, cheek, and brow for 5 minutes.",
    brandId: "mirai-tech",
    origin: "Tokyo",
  },
  {
    id: "gadget_hydrogen_bottle",
    name: "Mirai Smart Hydrogen Water Bottle",
    category: "gadgets",
    price: 145,
    rating: 4.9,
    reviewsCount: 58,
    image: images.hydrogen,
    badge: "Innovation",
    tagline: "SPE/PEM electrolysis",
    description:
      "Platinum titanium electrolysis generates molecular hydrogen up to 3000 ppb in three minutes.",
    ingredients: "Borosilicate glass, platinum-coated titanium, DuPont SPE membrane.",
    usage: "Fill with Fuji water, tap the sensor, drink immediately after the cycle.",
    brandId: "mirai-tech",
    origin: "Tokyo",
  },
];

export const collections: Collection[] = [
  {
    id: "glass-skin",
    name: "Glass Skin Ritual",
    subtitle: "Rice ferment, sakura, peach blossom",
    image: images.serum,
    productIds: ["cleanser", "serum", "ladies_sakura_serum"],
    accent: "#E09C96",
  },
  {
    id: "hydration",
    name: "Fuji Hydration",
    subtitle: "Alkaline and alpine spring waters",
    image: images.water,
    productIds: ["alkaline_fuji_95", "fuji_pristine_spring"],
    accent: "#0B7285",
  },
  {
    id: "nama",
    name: "Nama Confection",
    subtitle: "Matcha ganache and dark cacao",
    image: images.chocolate,
    productIds: ["matcha_nama_chocolate", "hokkaido_dark_truffles"],
    accent: "#78350F",
  },
  {
    id: "tech",
    name: "Tokyo Beauty Tech",
    subtitle: "Steam, EMS lift, hydrogen water",
    image: images.steamer,
    productIds: ["gadget_nano_steamer", "gadget_ultrasonic_wand", "gadget_hydrogen_bottle"],
    accent: "#CF3642",
  },
  {
    id: "ladies",
    name: "Ladies Luxury",
    subtitle: "Illuminate, firm, overnight plump",
    image: images.ladies,
    productIds: ["ladies_sakura_serum", "cream", "mask"],
    accent: "#CF3642",
  },
  {
    id: "men",
    name: "Men’s Care",
    subtitle: "Cleanse, soothe, velvet matte",
    image: images.men,
    productIds: ["cleanser", "cream", "serum"],
    accent: "#026F98",
  },
  {
    id: "baby",
    name: "Baby Gentle",
    subtitle: "Fragrance-free, camellia-soft",
    image: images.baby,
    productIds: ["cleanser", "cream"],
    accent: "#B08D57",
  },
];

export function getProduct(id: string) {
  return products.find((item) => item.id === id);
}

export function getCollection(id: string) {
  return collections.find((item) => item.id === id);
}

export function getBrand(id: string) {
  return brands.find((item) => item.id === id);
}

export function formatPrice(value: number) {
  return `$${value.toFixed(2)}`;
}
