import React from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { ProductDetails, Variant } from "../../interface/types";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  cartItems: {
    product: ProductDetails;
    quantity: number;
    selectedVariant: Variant;
  }[];
  updateQuantity: (product: ProductDetails, quantity: number) => void;
  removeItem: (product: ProductDetails, selectedVariant: Variant) => void;
}
const CartDrawer: React.FC<CartDrawerProps> = ({
  open,
  onClose,
  cartItems,
  updateQuantity,
  removeItem,
}) => {
  const groupedItems = cartItems.reduce((acc, item) => {
    const key = `${item.product.id}-${item.selectedVariant.id}`;
    if (!acc[key]) {
      acc[key] = { ...item, totalQuantity: 0, totalPrice: 0 };
    }
    acc[key].totalQuantity += item.quantity;
    acc[key].totalPrice +=
      item.quantity * item.selectedVariant.price.total_price;
    return acc;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, {} as Record<string, any>);
  const groupedCartItems = Object.values(groupedItems);
  const handleDecreaseQuantity = (
    product: ProductDetails,
    selectedVariant: Variant,
    quantity: number
  ) => {
    if (quantity <= 1) {
      removeItem(product, selectedVariant);
    } else {
      updateQuantity(product, quantity - 1);
    }
  };
  const totalPrice = groupedCartItems.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 400, padding: 1, backgroundColor: "#f7f7f7" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
            SEPETİM
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        {groupedCartItems.length > 0 ? (
          <List>
            {groupedCartItems.map((item, index) => (
              <ListItem
                key={index}
                sx={{ display: "flex", alignItems: "flex-start" }}
              >
                <Box sx={{ marginRight: 2 }}>
                  <img
                    src={`https://fe1111.projects.academy.onlyjs.com/${item.selectedVariant.photo_src}`}
                    alt={item.product.name}
                    width="80"
                    height="80"
                  />
                </Box>
                <Box
                  sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
                >
                  <Typography variant="body1">{item.product.name}</Typography>
                  <Typography variant="body2">
                    {item.selectedVariant.aroma}
                  </Typography>
                  <Typography variant="body2">
                    {item.selectedVariant.size.pieces}g
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                  }}
                >
                  <Typography variant="body1">{item.totalPrice} TL</Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1.5 }}>
                    <IconButton
                      onClick={() =>
                        updateQuantity(item.product, item.totalQuantity + 1)
                      }
                    >
                      <AddIcon />
                    </IconButton>
                    <Typography variant="body2" sx={{ mx: 1 }}>
                      {item.totalQuantity}
                    </Typography>
                    <IconButton
                      onClick={() =>
                        handleDecreaseQuantity(
                          item.product,
                          item.selectedVariant,
                          item.totalQuantity
                        )
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </ListItem>
            ))}
          </List>
        ) : (
          <Box sx={{ textAlign: "center", marginTop: 23 }}>
            <Typography variant="body1">
              Sepetinizde Ürün Bulunmamaktadır
            </Typography>
          </Box>
        )}
        <Box sx={{ marginTop: 40, padding: 2, backgroundColor: "#f7f7f7" }}>
          <Typography variant="h6" sx={{ textAlign: "right" }}>
            Toplam: {totalPrice} TL
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ width: "100%", marginTop: 1 }}
            onClick={onClose}
          >
            Devam Et
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};
export default CartDrawer;
