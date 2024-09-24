import { Box, Typography, Modal, Button, Rating, Card, CardContent, Grid, Chip } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface Review {
  id: string;
  description: string;
  rating: number | null;
  userName: string;
  createdAt: string;
  userId:number;
  ProductId:number;
}

const CommentList: React.FC<{ onReviewsUpdated?: () => void }> = ({ onReviewsUpdated }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const fullPath = window.location.pathname;
  const productNo = fullPath.substring(fullPath.lastIndexOf('/') + 1);
  useEffect(() => {
    let isMounted = true;
  
    const fetchReviews = async () => {
      if (isMounted) {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/product/${productNo}?include=review`
          );
          
          const reviewsData: Review[] = response.data.Reviews;
          console.log("review", reviewsData);
          const hasMissingRating = reviewsData.some(
            (review: Review) => review.rating === null || review.rating === undefined
          );
  
          setReviews(reviewsData);
          setOpenModal(hasMissingRating);

        } catch (error) {
          console.error('Yorumlar getirilirken hata oluştu:', error);
        }
      }
    };
  
    fetchReviews();
  
    return () => {
      isMounted = false; // Bileşen unmount olduğunda istekleri iptal et
    };
  }, [productNo ,onReviewsUpdated]);
  
  

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Box>
      <Grid container spacing={2} mt={5}>
        {reviews.map((review) => (
          <Grid item xs={12} key={review.id}>
            <Card sx={{ borderRadius: '16px', backgroundColor: '#f5f5f5', p: 2 }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Box display="flex" alignItems="center">
                    <Rating value={review.rating ?? 0} readOnly precision={0.5} size="small" />
                    <Typography variant="body1" fontWeight="bold" sx={{ ml: 1 }}>
                      {review.userName}
                    </Typography>
                    <Chip label="DOĞRULANMIŞ MÜŞTERİ" color="success" size="small" sx={{ ml: 1 }} />
                  </Box>
                  <Typography variant="body2" color="textSecondary">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>
                <Typography variant="h6" component="div">
                  {review.description.split('\n')[0]}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {review.description.split('\n')[1]}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Lütfen değerlendiriniz
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Bazı yorumlarda puan eksik. Lütfen değerlendirme yaparak yorumunuzu tamamlayın.
          </Typography>
          <Button onClick={handleCloseModal} variant="contained" sx={{ mt: 2 }}>
            Kapat
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default CommentList;
