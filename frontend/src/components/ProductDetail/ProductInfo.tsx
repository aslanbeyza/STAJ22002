import React from "react";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ProductDetails } from "../../interface/types";

interface ProductInfoProps {
  product: ProductDetails; // Updated to ProductDetails
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => (
  <Box sx={{boxShadow:'none' }}>
    <Accordion sx={{ marginTop: "50px" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        ÖZELLİKLER
      </AccordionSummary>
      <AccordionDetails>{product.explanation.features || " "}</AccordionDetails>
    </Accordion>
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2-content"
        id="panel2-header"
      >
        BESİN İÇERİĞİ
      </AccordionSummary>
      <AccordionDetails>
        {product.explanation.description || " "}
      </AccordionDetails>
    </Accordion>
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel3-content"
        id="panel3-header"
      >
        KULLANIM ŞEKLİ
      </AccordionSummary>
      <AccordionDetails>{product.explanation.usage || " "}</AccordionDetails>
    </Accordion>
  </Box>
);

export default ProductInfo;
