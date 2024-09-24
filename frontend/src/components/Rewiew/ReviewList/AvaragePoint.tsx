/* import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import {useState,  useEffect } from 'react';
import { Review } from '../../../interface/ReviewModelTypes';


 const AveragePoint: React.FC<{ productNo: number }> = ({ productNo })  => {
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const fetchAverageRating = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/reviews/product/${productNo}`);
        const reviews = response.data;
        const avgRating = reviews.reduce((acc: number, review: Review) => acc + review.rating, 0) / reviews.length;
        setAverageRating(avgRating);
      } catch (error) {
        console.error("Ortalama puan hesaplanamadı:", error);
      }
    };
    fetchAverageRating();
  }, [productNo]); 
  
  return (
    <Box sx={{ textAlign: 'center', marginBottom: 2 }}>
      <Typography variant="h4">{averageRating.toFixed(1)}</Typography>
      <Rating value={averageRating} readOnly precision={0.1} />
      <Typography variant="caption" color="textSecondary">
        {Comment.length} Yorum
      </Typography>
    </Box>
  );
};
export default AveragePoint; */