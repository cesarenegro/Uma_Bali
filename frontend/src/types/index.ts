export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  category: string;
  price?: number;
  images: string[];
  primaryImage?: ProductImage; // keep for legacy UI compatibility
  
  dimensions?: {
    width: number;
    depth: number;
    height: number;
    rawString?: string;
  };
  
  materials?: string[];
  upholstery?: string;
  weight?: number;
  volume?: number;
  inStock?: boolean;
  isCustomizable?: boolean;
  
  tags?: string[];
  slug?: string;
  collectionId?: string;
  designerId?: string | null;
  categoryIds?: string[];
  shortDescription?: string;
  
  technicalDrawing?: string | null;
  videoUrl?: string | null;
  variants?: ProductVariant[];
  weatherproofingRating?: string | null;
  suitableEnvironments?: EnvironmentTag[];
  styleTagIds?: string[];
  isNew?: boolean;
  isFeatured?: boolean;
  isAvailableForContract?: boolean;
  catalogYear?: number;
  relatedProductIds?: string[];
  projectIds?: string[];
  aiMeta?: ProductAIMeta;
  metaTitle?: string;
  metaDescription?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductImage {
  url: string;
  altText: string;
  type: 'lifestyle' | 'cutout' | 'detail' | 'technical' | 'context';
  variantId?: string;
  isProcessed: boolean;
  originalUrl?: string;
}

export interface ProductVariant {
  id: string;
  label: string;
  sku: string;
  dimensions: Dimensions;
  weight: number | null;
  frameFinish: string;
  fabricCode: string | null;
  fabricColor: string | null;
  woodFinish: string | null;
  isDefault: boolean;
  isAvailable: boolean;
  priceIndicator: 'on_request' | 'contact_dealer' | number | null;
  image: string | null;
}

export interface Dimensions {
  widthCm: number;
  depthCm: number;
  heightCm: number;
  seatHeightCm?: number;
  armHeightCm?: number;
  tableTopHeightCm?: number;
}

export interface MaterialSpec {
  component: string;
  material: string;
  notes: string | null;
}

export interface ProductAIMeta {
  boundingBoxCm: { w: number; d: number; h: number };
  productType: ProductAIType;
  anchorPoint: 'floor' | 'wall' | 'ceiling';
  sceneCategories: string[];
  primaryCutoutImageUrl: string;
}

export type ProductAIType =
  | 'sofa' | 'lounge_chair' | 'dining_chair' | 'barstool'
  | 'dining_table' | 'coffee_table' | 'side_table'
  | 'sunlounger' | 'daybed' | 'parasol' | 'pergola'
  | 'outdoor_kitchen' | 'lighting' | 'planter' | 'rug' | 'accessory';

export type EnvironmentTag = 'garden' | 'terrace' | 'poolside' | 'rooftop' | 'contract' | 'nautical' | 'indoor';

export interface Category {
  id: string;
  slug: string;
  name: string;
  parentId: string | null;
  description: string;
  coverImage: string;
  sortOrder: number;
  isVisible: boolean;
  productCount: number;
}

export interface Collection {
  id: string;
  slug: string;
  name: string;
  designerId: string | null;
  year: number;
  coverImage: string;
  heroImage: string;
  description: string;
  narrative: string;
  productIds: string[];
  materialIds: string[];
  tagIds: string[];
  isNew: boolean;
  isFeatured: boolean;
  catalogueUrl: string | null;
  metaTitle: string;
  metaDescription: string;
}

export interface Designer {
  id: string;
  slug: string;
  name: string;
  nationality: string;
  portrait: string;
  bio: string;
  collectionIds: string[];
  productIds: string[];
  websiteUrl: string | null;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  location: string;
  country: string;
  year: number;
  context: 'residential' | 'hospitality' | 'contract' | 'yacht' | 'public';
  coverImage: string;
  heroImage: string;
  galleryImages: string[];
  description: string;
  productIds: string[];
  collectionIds: string[];
  environmentTags: EnvironmentTag[];
  isFeatured: boolean;
  metaTitle: string;
  metaDescription: string;
}

export interface AIProductPayload {
  id: string;
  name: string;
  productType: ProductAIType;
  primaryCutoutImageUrl: string;
  boundingBoxCm: { w: number; d: number; h: number };
  anchorPoint: 'floor' | 'wall' | 'ceiling';
  sceneCategories: string[];
  materials: string[];
  primaryMaterialColor: string;
}

export interface SpaceConfig {
  type: string;
  widthM?: number;
  depthM?: number;
  environment: string;
}

export interface StyleParams {
  timeOfDay: string;
  season: string;
  mood: string;
  lightingStyle: string;
}
