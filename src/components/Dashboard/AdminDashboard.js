import React from 'react';
import { 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow 
} from '@mui/material';

const AdminDashboard = () => {
  // In a real app, you would fetch this data from your backend
  const systemStats = {
    totalUsers: 124,
    totalProducts: 56,
    totalOrders: 289,
    revenue: 12543.67
  };

  const recentActivities = [
    { id: 1, action: 'Product added', user: 'admin1', time: '2023-05-15 14:30' },
    { id: 2, action: 'User registered', user: 'newuser', time: '2023-05-15 13:45' },
    { id: 3, action: 'Order completed', user: 'customer1', time: '2023-05-15 12:20' },
    { id: 4, action: 'System updated', user: 'admin1', time: '2023-05-15 10:15' },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '20px' }}>
        <Paper style={{ padding: '20px', flex: 1, minWidth: '200px' }}>
          <Typography variant="h6">Total Users</Typography>
          <Typography variant="h3">{systemStats.totalUsers}</Typography>
        </Paper>
        <Paper style={{ padding: '20px', flex: 1, minWidth: '200px' }}>
          <Typography variant="h6">Total Products</Typography>
          <Typography variant="h3">{systemStats.totalProducts}</Typography>
        </Paper>
        <Paper style={{ padding: '20px', flex: 1, minWidth: '200px' }}>
          <Typography variant="h6">Total Orders</Typography>
          <Typography variant="h3">{systemStats.totalOrders}</Typography>
        </Paper>
        <Paper style={{ padding: '20px', flex: 1, minWidth: '200px' }}>
          <Typography variant="h6">Revenue</Typography>
          <Typography variant="h3">${systemStats.revenue.toFixed(2)}</Typography>
        </Paper>
      </div>
      
      <Typography variant="h5" style={{ margin: '20px 0 10px' }}>Recent Activities</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Action</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recentActivities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell>{activity.action}</TableCell>
                <TableCell>{activity.user}</TableCell>
                <TableCell>{activity.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminDashboard;