import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // jwtDecode importu
import Cookies from "js-cookie";
import { CustomJwtPayload } from "../../interface/ReviewModelTypes"; // Token tipi
import { Box, Grid, TextField, Button, Alert } from "@mui/material";
import Typography from "@mui/material/Typography";

// Form verisi için tip
interface AddressFormData {
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  UserId?: number; // UserId optional hale getirildi
}

interface AddressFormProps {
  onAddressAdded: () => void; // onAddressAdded callback prop
}

const AddressForm: React.FC<AddressFormProps> = ({ onAddressAdded }) => {
  const [formData, setFormData] = useState<AddressFormData>({
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
    UserId: undefined, // Başlangıçta UserId undefined olarak ayarlandı
  });

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      try {
        const decoded = jwtDecode<CustomJwtPayload>(token); // Token çözme
        setFormData((prevData) => ({
          ...prevData,
          UserId: decoded.userId, // UserId'yi formData'ya ekliyoruz
        }));
      } catch (error) {
        console.error("Token çözülürken hata oluştu:", error);
      }
    } else {
      console.error("Token bulunamadı.");
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { UserId, ...restOfFormData } = formData;
    console.log("beyza", UserId);
    if (UserId !== undefined) {
      try {
        await axios.post(`http://localhost:5000/api/address`, {
          ...restOfFormData,
          UserId: UserId, // UserId'yi form verilerine ekliyoruz
        });
        console.log("Address added successfully");
        onAddressAdded();
        // Başarıyla eklenirse, formu temizle veya diğer aksiyonları al
      } catch (error) {
        console.error("Error adding address", error);
      }
    } else {
      console.error("UserId is not defined");
    }
  };

  return (
    <>
      <Box  sx={{ paddingX: 6 }}>
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
            Adres Oluştur
          </Typography>
          <Alert
            severity="info"
            sx={{ backgroundColor: "#f4f1ff", border: "1px solid #9C27B0" }}
          >
            Kayıtlı bir adresiniz yok. Lütfen aşağıdaki kısımdan adres
            oluşturunuz.
          </Alert>
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={1} sx={{ marginTop: 1 }}>
            <Grid item xs={12} md={6}>
              <Typography
                variant="body1"
                sx={{ fontWeight: "500", color: "#222222" }}
              >
                *Adres Başlığı
              </Typography>
              <TextField
                onChange={handleInputChange}
                fullWidth
                name="address_line1"
                value={formData.address_line1}
                placeholder="ev, iş vb..."
                variant="outlined"
                required
                sx={{
                  backgroundColor: "#F7F7F7",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#E5E5E5" },
                  },
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={1} sx={{ marginTop: 1 }}>
            <Grid item xs={12} md={6}>
              <Typography
                variant="body1"
                sx={{ fontWeight: "500", color: "#222222" }}
              >
                *Ad
              </Typography>
              <TextField
                required
                onChange={handleInputChange}
                fullWidth
                name="name"
                variant="outlined"
                sx={{
                  backgroundColor: "#F7F7F7",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#E5E5E5" },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="body1"
                sx={{ fontWeight: "500", color: "#222222" }}
              >
                *Soyad
              </Typography>
              <TextField
                required
                onChange={handleInputChange}
                fullWidth
                name="lastName"
                variant="outlined"
                sx={{
                  backgroundColor: "#F7F7F7",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#E5E5E5" },
                  },
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={1} sx={{ marginTop: 1 }}>
            <Grid item xs={12}>
              <Typography
                variant="body1"
                sx={{ fontWeight: "500", color: "#222222" }}
              >
                *Adres
              </Typography>
              <TextField
                required
                onChange={handleInputChange}
                fullWidth
                name="address_line2"
                value={formData.address_line2}
                variant="outlined"
                sx={{
                  backgroundColor: "#F7F7F7",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#E5E5E5" },
                  },
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={1} sx={{ marginTop: 1 }}>
            <Grid item xs={12} md={6}>
              <Typography
                variant="body1"
                sx={{ fontWeight: "500", color: "#222222" }}
              >
                *Şehir
              </Typography>
              <TextField
                required
                onChange={handleInputChange}
                fullWidth
                name="city"
                value={formData.city}
                variant="outlined"
                sx={{
                  backgroundColor: "#F7F7F7",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#E5E5E5" },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="body1"
                sx={{ fontWeight: "500", color: "#222222" }}
              >
                *İlçe
              </Typography>
              <TextField
                required
                onChange={handleInputChange}
                fullWidth
                name="state"
                value={formData.state}
                variant="outlined"
                sx={{
                  backgroundColor: "#F7F7F7",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#E5E5E5" },
                  },
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={1} sx={{ marginTop: 1 }}>
            <Grid item xs={12}>
              <Typography
                variant="body1"
                sx={{ marginY: "2px", fontWeight: "500", color: "#222222" }}
              >
                *Telefon
              </Typography>
              <TextField
                required
                onChange={handleInputChange}
                fullWidth
                name="phone"
                variant="outlined"
                sx={{
                  backgroundColor: "#F7F7F7",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#E5E5E5" },
                  },
                }}
              />
            </Grid>
          </Grid>

          <Box textAlign="right" mt={3}>
            <Button
              variant="contained"
              type="submit"
              sx={{
                backgroundColor: "black",
                color: "white",
                marginBottom: "2rem",
                "&:hover": { backgroundColor: "darkblack" },
              }}
            >
              Kaydet
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default AddressForm;
