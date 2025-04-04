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

const CashierDashboard = () => {
  // In a real app, you would fetch this data from your backend
  const todayStats = {
    transactions: 24,
    revenue: 1243.50,
    averageTicket: 51.81
  };

  const recentTransactions = [
    { id: 1, customer: 'user1', amount: 125.99, time: 'Today 14:30' },
    { id: 2, customer: 'user2', amount: 89.50, time: 'Today 13:45' },
    { id: 3, customer: 'user3', amount: 42.99, time: 'Today 12:20' },
    { id: 4, customer: 'user1', amount: 56.75, time: 'Today 10:15' },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>Cashier Dashboard</Typography>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '20px' }}>
        <Paper style={{ padding: '20px', flex: 1, minWidth: '200px' }}>
          <Typography variant="h6">Today's Transactions</Typography>
          <Typography variant="h3">{todayStats.transactions}</Typography>
        </Paper>
        <Paper style={{ padding: '20px', flex: 1, minWidth: '200px' }}>
          <Typography variant="h6">Today's Revenue</Typography>
          <Typography variant="h3">${todayStats.revenue.toFixed(2)}</Typography>
        </Paper>
        <Paper style={{ padding: '20px', flex: 1, minWidth: '200px' }}>
          <Typography variant="h6">Average Ticket</Typography>
          <Typography variant="h3">${todayStats.averageTicket.toFixed(2)}</Typography>
        </Paper>
      </div>
      
      <Typography variant="h5" style={{ margin: '20px 0 10px' }}>Recent Transactions</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recentTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.customer}</TableCell>
                <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                <TableCell>{transaction.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CashierDashboard;