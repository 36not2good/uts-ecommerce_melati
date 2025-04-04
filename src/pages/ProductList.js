import React, { useState, useEffect, useContext } from 'react';
import { 
  Grid, 
  Container,
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  Badge,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider
} from '@mui/material';
import ProductCard from '../components/ProductCard';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('price');
  const [currentPage, setCurrentPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [badgeVisible, setBadgeVisible] = useState(true);
  
  const { cart, totalPrice } = useContext(CartContext);
  const navigate = useNavigate();
  const productsPerPage = 24;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleViewCheckout = () => {
    setBadgeVisible(false);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setTimeout(() => setBadgeVisible(true), 500);
  };

  const handleCheckout = () => {
    setDrawerOpen(false);
    navigate('/checkout');
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    return 0;
  });

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  if (loading) return (
    <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
      <Typography variant="body1">Loading products...</Typography>
    </Container>
  );

  return (
    <>
      {/* Sticky Cart Button */}
      {badgeVisible && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            zIndex: 1000,
            transition: 'all 0.3s',
            transform: isVisible ? 'translateY(0)' : 'translateY(100px)',
            opacity: isVisible ? 1 : 0
          }}
        >
          <Badge badgeContent={cart.length} color="error">
            <Button
              variant="contained"
              color="primary"
              startIcon={<ShoppingCartIcon />}
              onClick={handleViewCheckout}
              sx={{
                borderRadius: '50px',
                py: 1.5,
                px: 3,
                boxShadow: 3,
                '&:hover': {
                  boxShadow: 6
                }
              }}
            >
              {cart.length} Item | Rp{totalPrice.toLocaleString()}
            </Button>
          </Badge>
        </Box>
      )}

      {/* Cart Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleCloseDrawer}
        PaperProps={{
          sx: {
            width: 350,
            p: 2
          }
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Keranjang Belanja</Typography>
          <IconButton onClick={handleCloseDrawer}>
            <CloseIcon />
          </IconButton>
        </Box>
        
        <Divider sx={{ mb: 2 }} />
        
        <List>
          {cart.map(item => (
            <ListItem key={item.id}>
              <ListItemText 
                primary={item.title} 
                secondary={`${item.quantity} x Rp${item.price.toLocaleString()}`} 
              />
              <ListItemSecondaryAction>
                <Typography>
                  Rp{(item.price * item.quantity).toLocaleString()}
                </Typography>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        
        <Divider sx={{ my: 2 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6">Total</Typography>
          <Typography variant="h6">Rp{totalPrice.toLocaleString()}</Typography>
        </Box>
        
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth
          onClick={handleCheckout}
        >
          Lihat Pembayaran
        </Button>
      </Drawer>

      <Container maxWidth="lg" sx={{ py: 2 }}>
        {/* Filter controls */}
        <Box sx={{ 
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
          mb: 2,
          alignItems: { sm: 'center' }
        }}>
          <TextField
            label="Search products"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ flex: 1 }}
          />
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Sort by</InputLabel>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              label="Sort by"
            >
              <MenuItem value="price">Price</MenuItem>
              <MenuItem value="title">Name</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Product Grid */}
        <Grid container spacing={1.5}>
          {paginatedProducts.map(product => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(e, page) => setCurrentPage(page)}
              color="primary"
              size="small"
            />
          </Box>
        )}
      </Container>
    </>
  );
};

export default ProductList;