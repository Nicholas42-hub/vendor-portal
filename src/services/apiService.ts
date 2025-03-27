import axios from 'axios';
import { authService } from '../auth/authService';

// Create an axios instance
const api = axios.create({
  baseURL: 'https://your-graphql-api-endpoint.com', // Replace with your GraphQL endpoint
});

// Add request interceptor to automatically add auth headers
api.interceptors.request.use(
  async (config) => {
    const token = await authService.getAccessToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API functions
export const apiService = {
  // Example: Query vendors
  async getVendors() {
    const query = `
      query {
        vendors {
          id
          name
          email
          status
        }
      }
    `;
    
    try {
      const response = await api.post('', { query });
      return response.data.data.vendors;
    } catch (error) {
      console.error('Error fetching vendors:', error);
      throw error;
    }
  },
  
  // Example: Create vendor
  async createVendor(vendorData: any) {
    const mutation = `
      mutation CreateVendor($input: VendorInput!) {
        createVendor(input: $input) {
          id
          name
          email
          status
        }
      }
    `;
    
    try {
      const response = await api.post('', {
        query: mutation,
        variables: {
          input: vendorData
        }
      });
      return response.data.data.createVendor;
    } catch (error) {
      console.error('Error creating vendor:', error);
      throw error;
    }
  }
};