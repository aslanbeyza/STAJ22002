import React from "react";
import { Box, Typography, Button } from "@mui/material";
import QuantitySelector from "./QuantitySelector"; // İlgili yolu kullanın
import { Variant } from "../../interface/types";

interface ProductDetailsProps {
  selectedVariant: Variant;
  count: number;
  handleAddToCart: () => void;
  decrease: () => void;
  increase: () => void;
}

const PDetails: React.FC<ProductDetailsProps> = ({
  selectedVariant,
  count,
  decrease,
  increase,
  handleAddToCart,
}) => (
  <Box>
    <Typography variant="h5" sx={{ fontWeight: "bold",boxShadow:'none' }}>
      {(selectedVariant.price.total_price * count).toFixed(2)} TL
    </Typography>
    <Typography variant="body1" sx={{ fontWeight: "500" }}>
      {(selectedVariant.price.price_per_servings * count).toFixed(2)} TL /
      Servis
    </Typography>

    <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
      <QuantitySelector
        count={count}
        onIncrease={increase}
        onDecrease={decrease}
      />

      <Button
        variant="contained"
        onClick={handleAddToCart}
        sx={{
          backgroundColor: "black",
          color: "white",
          width: "100%",
          "&:hover": {
            backgroundColor: "black",
          },
        }}
      >
        Sepete Ekle
      </Button>
    </Box>
  </Box>
);

export default PDetails;