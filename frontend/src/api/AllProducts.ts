import axios from "axios";
import { Product, ProductDetails } from "../interface/types";

interface ApiResponse {
  data: {
    results: Product[];
    count: number;
  };
}
/* all product  */
export const getAllProducts = async (
  page: number = 1
): Promise<ApiResponse> => {
  const limit = 12;
  const offset = (page - 1) * limit;
  try {
    const response = await axios.get(
      "https://fe1111.projects.academy.onlyjs.com/api/v1/products",
      {
        params: {
          limit,
          offset,
        },
      }
    );
    if (response.status !== 200) {
      throw new Error("Veri çekme hatası");
    }
    console.log(response.data); // API yanıtını konsolda loglama
    return response.data;
  } catch (error) {
    console.error("API hata:", error);
    throw new Error("Veri çekme hatası");
  }
};
/* ***************************************************************************************************************************** */
/* detail */
export const getProductById = async (id: string): Promise<ProductDetails> => {
  try {
    const response = await axios.get(
      `https://fe1111.projects.academy.onlyjs.com/api/v1/products/${id}`
    );
    const data = response.data.data;
    // API yanıtını ProductDetails yapısına uygun hale getir
    const productDetails: ProductDetails = {
      id: data.id,
      name: data.name,
      slug: data.slug,
      short_explanation: data.short_explanation,
      explanation: data.explanation, // Burada API'den gelen explanation verisini kullanıyoruz
      main_category_id: data.main_category_id,
      sub_category_id: data.sub_category_id,
      tags: data.tags,
      variants: data.variants.map(
        (variant: {
          id: number;
          size: { pieces: number; total_services: number };
          aroma: string;
          price: {
            profit: null;
            total_price: number;
            discounted_price: null;
            price_per_servings: number;
            discount_percentage: null;
          };
          photo_src: string;
          is_available: boolean;
        }) => ({
          id: variant.id,
          size: {
            pieces: variant.size.pieces,
            total_services: variant.size.total_services,
          },
          aroma: variant.aroma,
          price: {
            profit: variant.price.profit ?? null,
            total_price: variant.price.total_price,
            discounted_price: variant.price.discounted_price ?? null,
            price_per_servings: variant.price.price_per_servings,
            discount_percentage: variant.price.discount_percentage ?? null,
          },
          photo_src: variant.photo_src,
          is_available: variant.is_available,
        })
      ),
      comment_count: data.comment_count,
      average_star: data.average_star,
    };
    return productDetails;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        `Error: ${error.response?.status} - ${error.response?.statusText}`
      );
      console.error("Details:", error.response?.data);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

/* categories */
