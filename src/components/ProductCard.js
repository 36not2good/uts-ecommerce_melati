import React, { useState, useContext } from 'react';
import { 
  Card, 
  CardMedia,
  Box, 
  CardContent, 
  Typography, 
  IconButton,
  Tooltip
} from '@mui/material';
import { CartContext } from '../context/CartContext';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const shortenProductName = (name) => {
  const maxLength = 20;
  if (name.length > maxLength) {
    return name.substring(0, maxLength) + '...';
  }
  return name;
};

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const isOutOfStock = product.stock === 0;

  const handleAddToCart = () => {
    if (!isOutOfStock) {
      addToCart(product, 1);
    }
  };

  return (
    <Card sx={{ 
      width: 150,
      height: 200,
      m: 0.5,
      display: 'flex',
      flexDirection: 'column',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      transition: 'all 0.3s ease',
      '&:hover': {
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
      }
    }}>
      {/* Gambar Produk */}
      <Box sx={{ 
        width: '100%',
        height: 100,
        position: 'relative',
        p: 1,
        backgroundColor: '#f9f9f9'
      }}>
        <CardMedia
          component="img"
          image={product.image}
          alt={product.title}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'contain'
          }}
        />
      </Box>

      {/* Konten Card */}
      <CardContent sx={{ 
        p: 1,
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Nama Produk Dipendekkan */}
        <Tooltip title={product.title} arrow>
          <Typography 
            variant="body2" 
            component="div"
            sx={{ 
              fontWeight: 500,
              lineHeight: 1.2,
              height: '1.8em',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis'
            }}
          >
            {shortenProductName(product.title)}
          </Typography>
        </Tooltip>

        {/* Harga dan Tombol */}
        <Box sx={{ 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 'auto',
          pt: 1
        }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
            ${product.price.toFixed(2)}
          </Typography>
          
          <IconButton
            size="small"
            color="primary"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            sx={{
              p: 0.5,
              backgroundColor: isOutOfStock ? '#f5f5f5' : 'primary.main',
              color: isOutOfStock ? 'text.secondary' : 'primary.contrastText',
              '&:hover': {
                backgroundColor: isOutOfStock ? '#f5f5f5' : 'primary.dark'
              }
            }}
          >
            <AddShoppingCartIcon fontSize="small" />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;