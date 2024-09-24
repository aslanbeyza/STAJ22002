/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import AddressForm from "./AddressForm";
import { Card, CardContent, Typography, Grid, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add"; // AddIcon import ediliyor
import Box from "@mui/material/Box";

interface Address {
  label: string;
  id: number;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  UserId: number;
}

const Address = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [editAddressId, setEditAddressId] = useState<number | null>(null); // Düzenleme ID'si için state
  const [currentAddress, setCurrentAddress] = useState<Address | null>(null); // Düzenlenecek adres bilgileri
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showAddressForm, setShowAddressForm] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = Cookies.get("authToken");
        if (token) {
          const response = await axios.get(
            "http://localhost:5000/api/auth/me",
            {
              headers: {
                "x-auth-token": token,
              },
            }
          );
          setUserId(response.data.user.id);
        } else {
          setError("Kullanıcı tokenı bulunamadı.");
        }
      } catch (error) {
        console.error("Error fetching user info", error);
        setError("Kullanıcı bilgileri alınamadı.");
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (userId !== null) {
      const fetchAddresses = async () => {
        try {
          const response = await axios.get<Address[]>(
            `http://localhost:5000/api/address/user/${userId}`
          );
          setAddresses(response.data);
        } catch (error) {
          console.error("Adres bilgilerini çekme hatası", error);
          setError("Adres bilgileri alınamadı.");
        } finally {
          setLoading(false);
        }
      };
      fetchAddresses();
    } else {
      setLoading(false);
    }
  }, [userId]);

  const handleNewAddressClick = () => {
    setShowAddressForm(true);
    setEditAddressId(null); // Yeni adres eklerken düzenleme ID'sini sıfırla
    setCurrentAddress(null);
  };

  const handleAddressEdit = (address: Address) => {
    setShowAddressForm(true);
    setEditAddressId(address.id); // Düzenlenecek adresin ID'sini ayarla
    setCurrentAddress(address); // Düzenlenecek adres bilgilerini ayarla
  };

  const handleAddressAddedOrUpdated = () => {
    setShowAddressForm(false); // Adres eklendi veya güncellendiğinde formu kapat
    // Yeni adresi listeye eklemek için mevcut adresleri tekrar getir
    if (userId) {
      axios
        .get<Address[]>(`http://localhost:5000/api/address/user/${userId}`)
        .then((response) => {
          setAddresses(response.data);
        });
    }
  };

  const handleAddressAdded = () => {
    setShowAddressForm(false); // Adres eklendiğinde formu kapat
    // Yeni adresi listeye eklemek için mevcut adresleri tekrar getir
    if (userId) {
      axios
        .get<Address[]>(`http://localhost:5000/api/address/user/${userId}`)
        .then((response) => {
          setAddresses(response.data);
        });
    }
  };
  /* adresi silme */
  const handleDeleteAddress = async (address_id: number) => {
    try {
      if (userId) {
        await axios.delete(`http://localhost:5000/api/address/${address_id}`);
        setAddresses((prevAddresses) =>
          prevAddresses.filter((address) => address.id !== address_id)
        );
      } else {
        setError("Kullanıcı tokenı bulunamadı.");
      }
    } catch (error) {
      console.error("Adres silinirken hata oluştu:", error);
      setError("Adres silme işlemi başarısız.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {showAddressForm ? (
        // Eğer form gösteriliyorsa sadece formu göster
        <AddressForm onAddressAdded={handleAddressAdded} />
      ) : (
        <>
          {addresses.length > 0 ? (
            <div>
              <Typography variant="h5" gutterBottom>
                Adreslerim
              </Typography>

              <Grid container justifyContent="flex-end" sx={{ mt: 2, mb: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={handleNewAddressClick}
                >
                  Yeni Adres Ekle
                </Button>
              </Grid>

              <Grid container sx={{ m: 4 }}>
                {addresses.map((address) => (
                  <Grid item xs={12} sm={6} md={4} key={address.id}>
                    <Card
                      variant="outlined"
                      sx={{
                        maxWidth: 300,
                        mt: 2,
                        mb: 2,
                        mx: "auto",
                        border: "1px solid #000",
                        margin: "4px",
                      }}
                    >
                      <CardContent>
                        <Typography variant="body2" color="text.primary">
                          <Box>{address.address_line1}</Box>
                          <Box my={2}>
                            {address.address_line2 && (
                              <>{address.address_line2}</>
                            )}
                          </Box>
                          <Box my={2}>
                            {address.state}, {address.city}
                          </Box>
                          <Box my={2}>
                            {address.postal_code} {address.country}
                          </Box>
                        </Typography>
                      </CardContent>
                      <Grid
                        container
                        justifyContent="space-between"
                        sx={{ pb: 2, px: 1 }}
                      >
                        <Grid item>
                          <Button
                            onClick={() => handleDeleteAddress(address.id)} // Doğru ID'yi kullan
                            variant="text"
                            size="small"
                            startIcon={<DeleteIcon />}
                            sx={{ color: "black" }}
                          >
                            Sil
                          </Button>
                        </Grid>
                        <Grid item>
                          <Button
                            onClick={() => handleAddressEdit(address)} // Düzenleme butonuna tıklanınca adresi düzenle
                            variant="text"
                            size="small"
                            sx={{ color: "black" }}
                          >
                            Adresi Düzenle
                          </Button>
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </div>
          ) : (
            // Hiç adres yoksa formu göster
            <AddressForm onAddressAdded={handleAddressAdded} />
          )}
        </>
      )}
    </div>
  );
};

export default Address;
