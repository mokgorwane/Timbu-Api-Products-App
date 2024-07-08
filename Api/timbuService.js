import axios from 'axios';

export const fetchProducts = async () => {
  try {
    const response = await axios.get('https://hurricane-waiting-operation.glitch.me/proxy/products');
    const data = response.data;
    console.log('API Response:', data);
    return data;
  } catch (error) {
    if (error.response) {
      console.error('Error response:', error.response.data);
      console.error('Error status:', error.response.status);
      console.error('Error headers:', error.response.headers);
    } else if (error.request) {
      console.error('Error request:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
    console.error('Error config:', error.config);
    throw error;
  }
};
