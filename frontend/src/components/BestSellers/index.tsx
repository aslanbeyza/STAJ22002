import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";

import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Skeleton,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // useNavigate hook'unu import edin
import { Product } from "../../interface/types";
import StarRating from "../StarRating/StarRating";

const BestSellers: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate(); // useNavigate hook'unu kullanarak yönlendirme fonksiyonunu oluşturun

  useEffect(() => {
    axios
      .get(
        "https://fe1111.projects.academy.onlyjs.com/api/v1/products/best-sellers"
      )
      .then((response) => {
        setProducts(response.data.data);
        setLoading(false); // Yükleme tamamlandığında loading durumunu güncelle
      })
      .catch((error) => {
        console.error(
          "En çok satılan verileri alınırken bir hata oluştu!",
          error
        );
        setLoading(false); // Hata durumunda da loading'i kapat
      });
  }, []);

  const handleCardClick = (id: number) => {
    navigate(`/product/${id}`, { state: { fromBestSellers: true } }); // state ile yönlendirme
  };

  return (
    <Container>
      <Grid container spacing={3} mt={3} mb={3}>
        {loading
          ? Array.from(new Array(6)).map((_, index) => (
              <Grid item key={`skeleton-${index}`} xs={6} sm={4} md={4}>
                <Card className="card">
                  <Skeleton variant="rectangular" height="60%" width="100%" />
                  <CardContent className="cardContent">
                    <Skeleton variant="text" height={30} width="80%" />
                    <Skeleton variant="text" height={20} width="60%" />
                    <Skeleton variant="text" height={20} width="60%" />
                    <Skeleton variant="text" height={20} width="40%" />
                    <Skeleton variant="text" height={20} width="60%" />
                    <Skeleton variant="text" height={30} width="40%" />
                  </CardContent>
                </Card>
              </Grid>
            ))
          : products.map((product) => (
              <Grid item key={product.id} xs={6} sm={4} md={4} lg={2}>
                <Card
                  className="card"
                  onClick={() => handleCardClick(product.id)} // Card'a tıklama olayını ekleyin
                >
                  <CardMedia
                    sx={{
                      transition: "transform 0.2s ease",
                      "&:hover": {
                        transform: "scale(1.1)",
                      },
                      height: { xs: "40%", sm: "40%", md: "40%" },
                      width: { xs: "100%", sm: "100%", md: "100%" },
                      objectFit: "fill",
                    }}
                    component="img"
                    image={`https://fe1111.projects.academy.onlyjs.com/${product.photo_src}`}
                    alt={product.name}
                  />
                  <CardContent
                    className="cardContent"
                    sx={{
                      height: { xs: "60%", sm: "60%", md: "60%" },
                      width: { xs: "100%", sm: "100%", md: "100%" },
                    }}
                  >
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      className="productName"
                      sx={{
                        fontSize: "16px",
                        fontWeight: "600",
                        lineHeight: "18px",
                      }}
                    >
                      {product.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        overflow: "visible",
                        whiteSpace: "normal",
                        fontWeight: "500",
                        fontSize: "12px",
                        color: "#888888",
                        lineHeight: "16px",
                      }}
                    >
                      {product.short_explanation}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={1}>
                      <StarRating value={2} />
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        color: "#333333",
                        fontWeight: 500,
                        lineHeight: "17px",
                        fontSize: "12.66px",
                      }}
                    >
                      Yorum
                    </Typography>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{
                        color: "#000000",
                        fontWeight: 400,
                        lineHeight: "32px",
                        fontSize: "19.69px",
                      }}
                    >
                      {product.price_info?.total_price ?? "N/A"} TL
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
      </Grid>
    </Container>
  );
};

export default BestSellers;
