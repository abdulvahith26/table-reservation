import axios from 'axios';

const API_URL = 'https://table-reservation-m21o.onrender.com/api/restaurants';

const getAllRestaurants = async (query = "") => {
  const response = await axios.get(`${API_URL}${query}`);
  console.log(`${API_URL}${query}`);
  
  return response.data;
  
};

const getRestaurantDetails = async (restaurantId) => {
  const response = await axios.get(`${API_URL}/${restaurantId}`);
  console.log(restaurantId);
  return response.data;
 
};

const createRestaurant = async (restaurantData) => {
  try {
    const token = localStorage.getItem("adminToken");
    const response = await axios.post(`${API_URL}`, restaurantData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("createRestaurant called with token:", token);
    return response.data;
  } catch (error) {
    console.error("Error creating restaurant:", error.response?.data || error);
    throw error.response?.data || error;
  }
};

const updateRestaurant = async (restaurantId, restaurantData) => {
  try {
    const token = localStorage.getItem("adminToken");
    const response = await axios.put(`${API_URL}/${restaurantId}`, restaurantData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating restaurant:", error.response?.data || error);
    throw error.response?.data || error;
  }
};

const deleteRestaurant = async (restaurantId) => {
  try {
    const token = localStorage.getItem("adminToken");
    const response = await axios.delete(`${API_URL}/${restaurantId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting restaurant:", error.response?.data || error);
    throw error.response?.data || error;
  }
};


export default {
  getAllRestaurants,
  getRestaurantDetails,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
};
