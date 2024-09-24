import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { LuPackageOpen } from "react-icons/lu";
import { CiFaceSmile } from "react-icons/ci";
import { AiOutlineSafety } from "react-icons/ai";

interface InformationInterface {
  id: number;
  icon: React.ReactNode;
  title: string;
  text: string;
}

const Informationdata: InformationInterface[] = [
  {
    id: 1,
    icon: <LuPackageOpen size={16} />, // İkon boyutu küçültüldü
    title: "AYNI GÜN KARGO",
    text: "16:00'DAN ÖNCEKİ SİPARİŞLERDE",
  },
  {
    id: 2,
    icon: <CiFaceSmile size={16} />, // İkon boyutu küçültüldü
    title: "ÜCRETSİZ KARGO",
    text: "100 TL ÜZERİ SİPARİŞLERDE",
  },
  {
    id: 3,
    icon: <AiOutlineSafety size={16} />, // İkon boyutu küçültüldü
    title: "GÜVENLİ ALIŞVERİŞ",
    text: "GÜVENLİ ÖDEME SİSTEMİ",
  },
];

const AdvantagesSection: React.FC = () => {
  return (
    <Box
      sx={{
        display: { xs: "none", sm: "flex" }, // Mobilde gizle, küçük ve büyük ekranlarda göster
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "center",
         marginTop:'-23px',
         padding:'10px',
         backgroundColor:'#F7F7F7'
      }}
    >
      <Grid  container spacing={2} justifyContent="center" alignItems={"center"}>
        {Informationdata.map((info) => (
          <Grid
            item
            key={info.id}
            xs={12}
            sm={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box display="flex" flexDirection="row" alignItems="center">
              <Box>{info.icon}</Box> {/* İkon ve yazı arası boşluk */}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  textAlign="center"
                  sx={{ fontSize: "14px", mx: "10px" }} // Başlık yazı boyutu küçültüldü
                >
                  {info.title}
                </Typography>
                <Typography
                  variant="body2"
                  textAlign="center"
                  color="textSecondary"
                  sx={{ fontSize: "12px" }} // Alt yazı boyutu küçültüldü
                >
                  {info.text}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AdvantagesSection;
