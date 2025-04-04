import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppBar, Toolbar, Typography, Button, Badge, IconButton } from '@mui/material';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const { totalItems } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Online Shop</Link>
        </Typography>
        
        <Button color="inherit" component={Link} to="/products">Products</Button>
        
        {user ? (
          <>
            {user.role === 'admin' && (
              <Button color="inherit" component={Link} to="/admin-dashboard">Admin Dashboard</Button>
            )}
            {user.role === 'cashier' && (
              <Button color="inherit" component={Link} to="/cashier-dashboard">Cashier Dashboard</Button>
            )}
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/register">Register</Button>
          </>
        )}
        
        <IconButton color="inherit" component={Link} to="/checkout">
          <Badge badgeContent={totalItems} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;