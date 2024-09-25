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
export const fetchMostPopularProducts = async (category = '', search = '', page = 1) => {
  try {
    var cat = category.length && category !== 'All' ? category.join(',') : undefined;
    if (cat) {
      cat = cat.replace('All,', '').replace(',All', '').replace('All', '');
    }
    //console.log(cat);
    const response = await apiClient.get('/products', {
      params: {
        orderby: 'popularity',
        per_page: 25,
        search: search,
        // category !== 'All' ? category : undefined,
        category2: cat, // Only send category if it's not "All"
        page: page,
      },
    });
    console.log(response.data);;
    if(response.data)
    {
     return response.data; 
    }
    else
    {
      return [];
    }
 
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



export const saveAddressData = async (addressData, userId) => {
  try {
    // Define the data structure for the billing address
    const data = {
      billing: {
        address_1: addressData.address,
        city: addressData.city,
        state: addressData.state,
        postcode: addressData.postalCode,
      },
    };

    // Make the PUT request to WooCommerce API to update user details
    const response = await apiClient.put(`/customers/${userId}`, data);
    console.log(response.data);
    // Return the response data for further use if needed
    return response.data;
  } catch (error) {
    console.error('Error saving address data:', error);
    throw new Error('Failed to save address data.');
  }
};


export const fetchUserAddress = async (userId) => {
  try {
    const response = await apiClient.get(`/customers/${userId}`);
    return response.data.billing; // Return the billing address object
  } catch (error) {
    console.error('Error fetching user address:', error);
    throw error;
  }
};

export const createOrder = async (orderData) => {
  try {
    const response = await apiClient.post('/orders', orderData);
    return response.data;
  } catch (error) {
    console.error('Error placing order:', error);
    throw error;
  }
};


export const fetchOngoingOrders = async (userId) => {
  try {
    //alert(userId);
    const response = await apiClient.get('/orders', {
      params: {
        status: ['processing', 'on-hold'],
        per_page: 20, 
        customer: userId
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Error fetching ongoing orders:', error);
    return [];
  }
};

export const fetchCompletedOrders = async (userId) => {
  try {
    const response = await apiClient.get('/orders', {
      params: {
        status: ['completed'],
        per_page: 20, 
        customer: userId
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Error fetching completed orders:', error);
    return [];
  }
};



/*
please update my code we need run the loop in fetchPromoDiscount and check promo having percent discount or fix discount 
currently we are only checking the code==promoCode and getting amount  and instead of getting the 
amount we need to get the type and amount  as adjust our checkout.js as well let me share the complete code

*/
export const fetchPromoDiscount = async (promoCode) => {
  try {
    // Fetch all coupons
    const response = await apiClient.get(`/coupons`);
    console.log(response.data);

    // Check if promoCode exists in the coupon list
    const coupon = response.data.find(coupon => coupon.code.toLowerCase() === promoCode.toLowerCase());

    if (coupon) {
      // If promo code is found, return the discount type and amount
      return {
        type: coupon.discount_type, // Assuming 'discount_type' field specifies 'fixed' or 'percent'
        value: parseFloat(coupon.amount) // Assuming discount is in 'amount' field
      };
    } else {
      // If promo code is not found, return null
      console.warn('Promo code does not exist');
      return null;
    }
  } catch (error) {
    console.error('Error fetching promo code:', error);
    throw error; // Handle the error appropriately
  }
};


