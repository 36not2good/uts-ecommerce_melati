import React, { useState, useEffect } from 'react';
import { 
  Container,
  Typography,
  Button,
  Grid,
  Box,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  useTheme
} from '@mui/material';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import axios from 'axios';
import { 
  ArrowForward,
  Storefront,
  Payment,
  HeadsetMic,
  Star 
} from '@mui/icons-material';

const Home = () => {
  const theme = useTheme();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('price');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

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

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    return 0;
  });

  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const features = [
    {
      icon: <Storefront fontSize="large" color="primary" />,
      title: "Produk Berkualitas",
      description: "Barang original dengan garansi resmi"
    },
    {
      icon: <Payment fontSize="large" color="primary" />,
      title: "Pembayaran Aman",
      description: "Berbagai metode pembayaran terpercaya"
    },
    {
      icon: <HeadsetMic fontSize="large" color="primary" />,
      title: "Layanan 24/7",
      description: "Customer service siap membantu"
    }
  ];

  if (loading) return <div>Loading...</div>;

  return (
    <Container maxWidth="xl" disableGutters>
      <Box sx={{
        background: `linear-gradient(rgba(0, 0, 0, 0.7), url(https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '60vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: 'white',
        px: 2,
        py: 10
      }}>
        <Typography variant="h2" component="h1" sx={{ 
          fontWeight: 700,
          mb: 3,
          fontSize: { xs: '2.5rem', md: '3.5rem' }
        }}>
          Selamat Datang di Toko Kami
        </Typography>
        <Typography variant="h5" sx={{ 
          mb: 4,
          maxWidth: '800px',
          fontSize: { xs: '1.1rem', md: '1.5rem' }
        }}>
          Temukan produk terbaik dengan harga terbaik
        </Typography>
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button 
            variant="contained" 
            color="primary" 
            size="large" 
            component={Link} 
            to="/products"
            endIcon={<ArrowForward />}
            sx={{ px: 4, py: 1.5 }}
          >
            Belanja Sekarang
          </Button>
          <Button 
            variant="outlined" 
            color="inherit" 
            size="large" 
            component={Link} 
            to="/about"
            sx={{ 
              px: 4,
              py: 1.5,
              color: 'white',
              borderColor: 'white',
              '&:hover': { borderColor: 'white' }
            }}
          >
            Tentang Kami
          </Button>
        </Stack>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box sx={{ textAlign: 'center', p: 3 }}>
                <Box sx={{ display: 'inline-flex', p: 2, mb: 2, borderRadius: '50%', bgcolor: 'primary.light' }}>
                  {feature.icon}
                </Box>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {feature.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container maxWidth="lg" sx={{ py: 4, px: 2 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
            Produk Pilihan
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <TextField
              label="Cari Produk"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ width: '60%' }}
            />
            <FormControl variant="outlined" sx={{ width: '35%' }}>
              <InputLabel>Urutkan</InputLabel>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                label="Urutkan"
              >
                <MenuItem value="price">Harga</MenuItem>
                <MenuItem value="title">Nama</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Grid container spacing={3}>
          {paginatedProducts.map(product => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>

        {filteredProducts.length > productsPerPage && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={Math.ceil(filteredProducts.length / productsPerPage)}
              page={currentPage}
              onChange={(e, page) => setCurrentPage(page)}
              color="primary"
            />
          </Box>
        )}

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            component={Link}
            to="/products"
            endIcon={<ArrowForward />}
            sx={{ px: 6 }}
          >
            Lihat Semua Produk
          </Button>
        </Box>
      </Container>

      <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Typography variant="h4" align="center" sx={{ mb: 6, fontWeight: 600 }}>
            Testimonial Pelanggan
          </Typography>
          <Grid container spacing={4}>
            {[1, 2, 3].map((item) => (
              <Grid item xs={12} md={4} key={item}>
                <Box sx={{ 
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 1
                }}>
                  <Box sx={{ display: 'flex', mb: 1 }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} color="primary" />
                    ))}
                  </Box>
                  <Typography variant="body1" sx={{ mb: 2, fontStyle: 'italic' }}>
                    "Produk berkualitas, pengiriman cepat dan packing rapi. Sangat memuaskan!"
                  </Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    - Pelanggan {item}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Box sx={{ 
        py: 8,
        bgcolor: 'primary.main',
        color: 'primary.contrastText'
      }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" sx={{ 
            mb: 3,
            fontWeight: 700
          }}>
            Siap Memulai Belanja?
          </Typography>
          <Typography variant="h5" sx={{ mb: 4 }}>
            Daftar sekarang dan dapatkan diskon 10% untuk pembelian pertama!
          </Typography>
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={2} 
            justifyContent="center"
          >
            <Button
              variant="contained"
              color="secondary"
              size="large"
              component={Link}
              to="/register"
              sx={{
                px: 6,
                py: 1.5,
                fontSize: '1.1rem'
              }}
            >
              Daftar Sekarang
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              size="large"
              component={Link}
              to="/products"
              sx={{
                px: 6,
                py: 1.5,
                fontSize: '1.1rem',
                color: 'primary.contrastText',
                borderColor: 'primary.contrastText',
                '&:hover': {
                  borderColor: 'primary.contrastText'
                }
              }}
            >
              Lihat Produk
            </Button>
          </Stack>
        </Container>
      </Box>
    </Container>
  );
};

export default Home;