import { useState, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import axios from "axios";
import debounce from "lodash/debounce"; // Lodash'tan debounce fonksiyonunu dahil ediyoruz
import Typography from "@mui/material/Typography";
import { Button, Modal, Rating, TextField } from "@mui/material";
import Box from "@mui/material/Box";

interface CustomJwtPayload {
  userId: string;
  name: string;
  lastName: string;
}

interface CommentFormProps {
  onCommentPosted: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ onCommentPosted }) => {
  const [comment, setComment] = useState<string>("");
  const [rating, setRating] = useState<number | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);

  // Debounce kullanarak 300ms içinde kullanıcı yazmayı durdurana kadar bekleyeceğiz.
  const debouncedHandleSubmit = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    debounce(async (e: React.FormEvent) => {
      if (rating === null) {
        setOpenModal(true);
        return;
      }

      const token = Cookies.get("authToken");
      const fullPath = window.location.pathname;
      const productNo = fullPath.substring(fullPath.lastIndexOf("/") + 1);

      let userId: string | undefined;
      let userName: string | undefined;

      if (token) {
        try {
          const decoded = jwtDecode<CustomJwtPayload>(token);
          userId = decoded.userId;
          const userResponse = await axios.get(
            `http://localhost:5000/api/user/${userId}`
          );
          userName = `${userResponse.data.name} ${userResponse.data.lastName}`;
        } catch (error) {
          console.error("Token çözülürken hata oluştu:", error);
        }
      } else {
        console.error("Token bulunamadı.");
      }

      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const response = await axios.post(
          "http://localhost:5000/api/review",
          {
            description: comment,
            rating: rating,
            ProductId: productNo,
            UserId: userId,
            userName: userName,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
 

        setComment("");
        setRating(null);
        if (onCommentPosted) {
          onCommentPosted();
        }
      } catch (error) {
        console.error("Yorum gönderilirken hata oluştu:", error);
      }
    }, 1000), // 300ms bekleme süresi
    [comment, rating, onCommentPosted]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    debouncedHandleSubmit(e); // Debounced fonksiyonu çağırıyoruz
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        mt: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        maxWidth: "500px",
        mx: "auto",
      }}
    >
      <Rating
        name="rating"
        value={rating}
        onChange={(_, newValue) => setRating(newValue)}
        precision={0.5}
        size="large"
        sx={{ mb: 2 }}
      />
      <TextField
        label="Yorumunuz"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        fullWidth
        required
        multiline
        rows={4}
        variant="outlined"
        sx={{
          marginBottom: "2px",
          backgroundColor: "#F7F7F7",
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#E5E5E5" },
          },
        }}
      />
      <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ backgroundColor: "#000", color: "#fff", marginTop: "25px" }}
        >
          Yorum Yap
        </Button>
      </Box>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="rating-modal-title"
        aria-describedby="rating-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="rating-modal-title" variant="h6" component="h2">
            Lütfen Puan Verin
          </Typography>
          <Typography id="rating-modal-description" sx={{ mt: 2 }}>
            Yorum yapabilmek için lütfen puan vermeyi unutmayın.
          </Typography>
          <Rating
            name="rating"
            value={rating}
            onChange={(_, newValue) => setRating(newValue)}
            precision={0.5}
            size="large"
            sx={{ mb: 2 }}
          />
          <Button
            onClick={handleCloseModal}
            variant="contained"
            sx={{ marginTop: "8px", textAlign: "end" }}
          >
            Kapat
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default CommentForm;
