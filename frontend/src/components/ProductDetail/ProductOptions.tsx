import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Variant, ProductDetails } from "../../interface/types";

interface ProductOptionsProps {
  flavors: { name: string; color: string }[];
  sizeOptions: number[]; // sizeOptions is now a number array
  selectedAroma: string;
  selectedVariant: Variant | null;
  handleAromaChange: (aroma: string) => void;
  handleVariantChange: (variant: Variant) => void;
  product: ProductDetails; // Changed from Product to ProductDetails
}

const ProductOptions: React.FC<ProductOptionsProps> = ({
  flavors,
  sizeOptions,
  selectedAroma,
  selectedVariant,
  handleAromaChange,
  handleVariantChange,
  product,
}) => {
  return (
    <Box>
      {/* Aroma Options */}
      <Typography variant="h6">Aroma:</Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", marginTop: "10px" }}>
        {flavors.map((flavor, index) => (
          <Button
            key={index}
            variant="outlined"
            sx={{
              border: "2px solid",
              borderColor: flavor.color,
              color: "black",
              margin: "5px",
              position: "relative",
              "&:hover": {
                backgroundColor: flavor.color,
                color: "white",
              },
              "&.selected": {
                backgroundColor: flavor.color,
                color: "white",
              },
            }}
            onClick={() => handleAromaChange(flavor.name)}
            className={selectedAroma === flavor.name ? "selected" : ""}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {flavor.name}
              {selectedAroma === flavor.name && (
                <Box
                  className="tick"
                  sx={{
                    position: "absolute",
                    top: -7,
                    right: -7,
                    color: "white",
                    fontSize: "0.8rem",
                    fontWeight: "bolder",
                    backgroundColor: "gray",
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  ✓
                </Box>
              )}
              <Box
                sx={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: flavor.color,
                  marginLeft: "5px",
                  borderRadius: "4px",
                }}
              ></Box>
            </Box>
          </Button>
        ))}
      </Box>

      {/* Size Options */}
      <Box className="product-size" sx={{ marginTop: "20px" }}>
        <Typography variant="h6">Boyut:</Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {sizeOptions.map((size, index) => (
            <Button
              key={index}
              variant="outlined"
              sx={{
                border: "2px solid",
                borderColor: "#888",
                color: "black",
                padding: "10px",
                position: "relative",
                "&:hover": {
                  backgroundColor: "#888",
                  color: "white",
                },
                "&.selected": {
                  backgroundColor: "#b9b9b9",
                  color: "white",
                },
              }}
              onClick={() => {
                // Ensure product and product.variants are defined before accessing them
                if (product && product.variants) {
                  const variant = product.variants.find(
                    (v) => v.size.pieces === size
                  );
                  if (variant) handleVariantChange(variant);
                }
              }}
              className={
                selectedVariant?.size.pieces === size ? "selected" : ""
              }
            >
              {size}G
              {selectedVariant?.size.pieces === size && (
                <Box
                  className="tick"
                  sx={{
                    position: "absolute",
                    top: -7,
                    right: -7,
                    color: "white",
                    fontSize: "0.8rem",
                    fontWeight: "bolder",
                    backgroundColor: "gray",
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  ✓
                </Box>
              )}
            </Button>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ProductOptions;
