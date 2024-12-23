import axios from "axios";

const API_URL = "https://table-reservation-m21o.onrender.com/api/reservations";

const createReservation = async (reservationData) => {
  try {   
    const token = localStorage.getItem("userToken" ,"adminToken");
    const response = await axios.post(`${API_URL}`, reservationData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating reservation:", error.response?.data || error);
    throw error.response?.data || error;
  }
};



const updateReservation = async (reservationId, reservationData, token) => {
  const response = await axios.put(`${API_URL}/${reservationId}`, reservationData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const deleteReservation = async (reservationId, token) => {
  const response = await axios.delete(`${API_URL}/${reservationId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const getRestaurantReservations = async (restaurantId, token) => {
  const response = await axios.get(`${API_URL}/restaurant/${restaurantId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export default {
  createReservation,
  updateReservation,
  deleteReservation,
  getRestaurantReservations,
};
