import axios from 'axios';
import { encode as btoa } from 'react-native-quick-base64';

const API_URL = 'https://fashion.bcreative.ae/wp-json/wc/v3';
/*const CONSUMER_KEY = 'ck_76588b582c5f46fbc45cd3ba5bca8085b0f3f7ce';
const CONSUMER_SECRET = 'cs_a20bd44fe5f0b647a7b048130fcd31160aae8ff4';
*/

const AUTH_TOKEN = 'Basic Y2tfNzY1ODhiNTgyYzVmNDZmYmM0NWNkM2JhNWJjYTgwODViMGYzZjdjZTpjc19hMjBiZDQ0ZmU1ZjBiNjQ3YTdiMDQ4MTMwZmNkMzExNjBhYWU4ZmY0'; // Provided Base64 token


const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: AUTH_TOKEN,
  },
});

// Function to fetch most popular products
export const fetchMostPopularProducts = async () => {
  try {
    const response = await apiClient.get('/products', {
      params: {
        orderby: 'popularity', // Sort by popularity
        per_page: 10,          // Number of products to fetch
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching most popular products:', error);
    return [];
  }
};

export const fetchCategories = async () => {
  try {
    const response = await apiClient.get('/products/categories', {
      params: {
        page: 1,
        per_page: 100,
        order: 'asc',
        orderby: 'name',
        hide_empty: true,
        parent: 0
      }
      
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return [];
  }
};



export const fetchBannerData = async () => {
    try {
        const response = await fetch('https://fashion.bcreative.ae/wp-json/website/v1/mobile_carousel', {
            headers: {
                Authorization:AUTH_TOKEN, 
            },
        });
        const data = await response.json();
        return data.map(item => item.image); 
    } catch (error) {
        console.error('Failed to fetch banner images:', error);
        throw new Error('Failed to load banner images.');
    }
};

export const getHomePageCategoryWithProducts = async () => {
  try {
    // Fetch categories
    const categoriesResponse = await apiClient.get('/products/categories', {
      params: {
        per_page: 100,
        hide_empty: true
      }
    });
    const categories = categoriesResponse.data;

    // Fetch products
    const productsResponse = await apiClient.get('/products', {
      params: {
        per_page: 100
      }
    });
    const products = productsResponse.data;

    // Group products by categories
    const categoriesWithProducts = categories.map(category => ({
      ...category,
      products: products.filter(product =>
        product.categories.some(prodCat => prodCat.id === category.id)
      )
    }));

    return categoriesWithProducts;
  } catch (error) {
    console.error('Error fetching home page data:', error);
    return [];
  }
};