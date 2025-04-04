import React from 'react';
import {
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
  CircularProgress
} from '@mui/material';
import { Field, ErrorMessage } from 'formik';

const RegisterForm = ({ isSubmitting, errors, touched }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Field
          as={TextField}
          name="name"
          label="Full Name"
          variant="outlined"
          fullWidth
          margin="normal"
          error={touched.name && Boolean(errors.name)}
          helperText={<ErrorMessage name="name" />}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <Field
          as={TextField}
          name="username"
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          error={touched.username && Boolean(errors.username)}
          helperText={<ErrorMessage name="username" />}
          inputProps={{ 
            style: { textTransform: 'lowercase' } 
          }}
        />
        <Typography variant="caption" color="text.secondary">
          Lowercase letters and numbers only
        </Typography>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Field
          as={TextField}
          name="password"
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          error={touched.password && Boolean(errors.password)}
          helperText={<ErrorMessage name="password" />}
        />
      </Grid>

      <Grid item xs={12}>
        <Field
          as={TextField}
          name="whatsapp"
          label="WhatsApp Number (628...)"
          variant="outlined"
          fullWidth
          margin="normal"
          error={touched.whatsapp && Boolean(errors.whatsapp)}
          helperText={<ErrorMessage name="whatsapp" />}
          InputProps={{
            startAdornment: <span style={{ marginRight: 8 }}>+</span>,
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Account Type</InputLabel>
          <Field
            as={Select}
            name="role"
            label="Account Type"
            error={touched.role && Boolean(errors.role)}
          >
            <MenuItem value="customer">Customer</MenuItem>
          </Field>
          <Typography variant="caption" color="error">
            <ErrorMessage name="role" />
          </Typography>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          sx={{ mt: 2 }}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Box display="flex" alignItems="center">
              <CircularProgress size={24} sx={{ mr: 1 }} />
              Registering...
            </Box>
          ) : (
            'Register'
          )}
        </Button>
      </Grid>

      <Grid item xs={12}>
        <Box sx={{ 
          mt: 2,
          p: 2, 
          backgroundColor: '#f5f5f5', 
          borderRadius: 1 
        }}>
          <Typography variant="body2" color="text.secondary">
            <strong>Password requirements:</strong>
            <ul style={{ marginTop: 4, marginBottom: 0, paddingLeft: 20 }}>
              <li>6-20 karakter</li>
              <li>gunakan salah satu huruf uppercase</li>
              <li>gunakan salah satu huruf lowercase</li>
              <li>gunakan salah satu nomor </li>
            </ul>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default RegisterForm;