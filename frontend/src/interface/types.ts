
// types.ts
export interface PriceInfo {
  profit: null;
  total_price: number;
  discounted_price: null;
  price_per_servings: number;
  discount_percentage: null;
}
export interface Product {
  rating: number;
  name: string;
  short_explanation: string;
  slug: string;
  price_info: PriceInfo;
  photo_src: string;
  comment_count: number;
  average_star: number;
  id: number;
 description:string; 
}
export interface ProductDetails {
  id: number;
  name: string;
  slug: string;
  short_explanation: string;
  explanation: Explanation;
  main_category_id: string;
  sub_category_id: string;
  tags: string[];
  variants: Variant[];
  comment_count: number;
  average_star: number;
}
export interface Explanation {
  usage: string;
  features: string;
  description: string;
  nutritional_content: NutritionalContent;
}
export interface NutritionalContent {
  ingredients: Ingredient[];
  nutrition_facts: NutritionFacts;
  amino_acid_facts: Ingredients[];
}
export interface Ingredients{
  name:string;
  amounts:number;
}
export interface Ingredient {
  aroma: string;
  value: string;
}
export interface NutritionFacts {
  ingredients: NutritionFactIngredient[];
  portion_sizes: string[];
}
export interface NutritionFactIngredient {
  name: string;
  amounts: string[];
}
export interface Variant {
  id: string;
  size: Size;
  aroma: string;
  price: VariantPrice;
  photo_src: string;
  is_available: boolean;
}
export interface Size {
  pieces: number;
  total_services: number;
  gram:number;
}
export interface VariantPrice {
  profit:null;
  total_price: number;
  discounted_price:null;
  price_per_servings: number;
  discount_percentage: null;
}
export interface ProductCardProps {
  product: Product;
}
export interface ProductDetailsProps {
  selectedVariant: Variant;
  count: number;
  handleAddToCart: () => void;
  decrease: () => void; 
  increase: () => void; 
}

export class ProductUtils {
  static getMainImage(product: ProductDetails): string {
    return product.variants && product.variants.length > 0
      ? product.variants[0].photo_src
      : "";
  }
}
/* adres */
export interface Address {
  id?: number;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_primary: boolean;
  UserId: number; // Gerekli olan userId tipini buraya yerleştirin.
}