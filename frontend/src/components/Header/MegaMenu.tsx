import React, { useState, useEffect } from "react";
import { Box, Link, Paper, Typography, Grid } from "@mui/material";
import axios from "axios";

interface SubItem {
  name: string;
  slug: string;
  order: number;
}

interface TopSeller {
  name: string;
  slug: string;
  description: string;
  picture_src: string;
}

interface MenuItem {
  id: string;
  name: string;
  slug: string;
  order: number;
  children: Array<{ id: string; name: string; sub_children: SubItem[] }>;
  top_sellers: TopSeller[]; // Popüler ürünler burada yer alacak
}

const MegaMenu: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [openMenuItem, setOpenMenuItem] = useState<MenuItem | null>(null);
  const [hoveringMenu, setHoveringMenu] = useState(false);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(
          "https://fe1111.projects.academy.onlyjs.com/api/v1/categories"
        );
        setMenuItems(response.data.data.data); // API'den gelen veriyi state'e atıyoruz.
        console.log(response.data.data.data);
      } catch (error) {
        console.error("Kategori verileri alınırken hata oluştu:", error);
      }
    };

    fetchMenuItems();
  }, []);

  const handleMouseEnterMenu = (item: MenuItem) => {
    setOpenMenuItem(item);
    setHoveringMenu(true);
  };

   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const handleMouseLeaveMenu = () => {
    setHoveringMenu(false);
  };

  // Global mouseleave işlemi: menü dışında herhangi bir alana hover yapıldığında menüyü kapatır
  useEffect(() => {
    const handleGlobalMouseLeave = () => {
      if (!hoveringMenu) {
        setOpenMenuItem(null);
      }
    };

    // Mouse tıklama ve hareket olaylarını dinle
    document.addEventListener("mouseenter", handleGlobalMouseLeave);
    document.addEventListener("mouseleave", handleGlobalMouseLeave);

    return () => {
      // Cleanup
      document.removeEventListener("mouseenter", handleGlobalMouseLeave);
      document.removeEventListener("mouseleave", handleGlobalMouseLeave);
    };
  }, [hoveringMenu]);

  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          display: "flex",
          backgroundColor: "#333",
          padding: "10px 0",
          justifyContent: "space-evenly",
          "& a": { color: "white", textDecoration: "none" },
          "& a:hover": {
            textDecoration: "underline",
            backgroundColor: "rgba(255,255,255,0.1)",
          },
        }}
      >
        {menuItems.map((item) => (
          <Link
            key={item.id}
            href="#"
            onMouseEnter={() => handleMouseEnterMenu(item)}
            sx={{ padding: "5px 10px" }}
          >
            {item.name}
          </Link>
        ))}
      </Box>

      {openMenuItem && (
        <Paper
          sx={{
            position: "absolute",
            top: "130%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "80%",
            maxWidth: 1100,
            minHeight: 450,
            mt: 1,
            p: 2,
            backgroundColor: "white",
            zIndex: 1,
            boxShadow: 3,
          }}
          onMouseEnter={() => setHoveringMenu(true)}
          onMouseLeave={() => setHoveringMenu(false)}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            {openMenuItem.name} Alt Menüsü
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              {openMenuItem.children.length > 0 ? (
                openMenuItem.children.map((child) => (
                  <Box key={child.id} sx={{ mb: 2 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", mb: 1 }}
                    >
                      {child.name}
                    </Typography>
                    {child.sub_children.length > 0 ? (
                      child.sub_children.map((subItem) => (
                        <Typography key={subItem.slug} sx={{ mb: 1 }}>
                          <Link href={`#`} color="inherit">
                            {subItem.name}
                          </Link>
                        </Typography>
                      ))
                    ) : (
                      <Typography>
                        Bu kategoride alt menü bulunmamaktadır.
                      </Typography>
                    )}
                  </Box>
                ))
              ) : (
                <Typography>Bu kategoride alt menü bulunmamaktadır.</Typography>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Popüler Ürünler
              </Typography>
              {openMenuItem.top_sellers.length > 0 ? (
                openMenuItem.top_sellers.map((product) => (
                  <Box key={product.slug} sx={{ mb: 2 }}>
                    <img
                      src={`https://fe1111.projects.academy.onlyjs.com${product.picture_src}`}
                      alt={product.name}
                      style={{
                        width: "100px",
                        marginRight: "10px",
                        float: "left",
                      }}
                    />
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      <Link href={`#`} color="inherit">
                        {product.name}
                      </Link>
                    </Typography>
                    <Typography variant="body2" sx={{ color: "gray" }}>
                      {product.description}
                    </Typography>
                    <Box sx={{ clear: "both" }} />
                  </Box>
                ))
              ) : (
                <Typography>
                  Bu kategoride popüler ürün bulunmamaktadır.
                </Typography>
              )}
            </Grid>
          </Grid>
        </Paper>
      )}
    </Box>
  );
};

export default MegaMenu;
