import React from "react";
import { ProductUtils, ProductDetails } from "../../interface/types";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { GlassMagnifier } from "react-image-magnifiers";

interface ProductImageProps {
  product: ProductDetails;
}

const ProductImage: React.FC<ProductImageProps> = ({ product }) => {
  const imgSrc = `https://fe1111.projects.academy.onlyjs.com${ProductUtils.getMainImage(
    product
  )}`;

  return (
    <div
      style={{
        width: "400px",
        height: "400px",
        position: "relative",
      }}
    >
      <GlassMagnifier
        imageSrc={imgSrc}
        imageAlt="Product Image"
        largeImageSrc={imgSrc} // Büyük resim kaynağı (zoom)
        magnifierSize="60%" // Büyütecin boyutu
        magnifierBorderSize={5} // Büyütecin kenarlık kalınlığı
        magnifierBorderColor="rgba(255, 255, 255, .5)" // Büyütecin kenarlık rengi
        square="{true}" // Büyüteç şekli kare olarak ayarlanır bunu ayarlamadı bilmiyorum
      />
    </div>
  );
};

export default ProductImage;
