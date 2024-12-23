import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AdminReservationPage = ({ currentUser }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all restaurants owned by the admin on mount
  const token = localStorage.getItem("adminToken");
  const decoded = jwtDecode(token); 
  console.log(token);
  
  console.log(decoded);
  console.log(decoded.id);
const adminId = decoded.id;
  useEffect(() => {
    const fetchOwnedRestaurants = async () => {
      try {
        const response = await axios.get("https://table-reservation-m21o.onrender.com/api/restaurants",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include auth token
            },
          }
        );
        setRestaurants(response.data);
        const ownedRestaurants = response.data.filter(
          (restaurant) => restaurant.owner?._id === adminId
        );

        setRestaurants(ownedRestaurants);

      } catch (err) {
        console.error("Error fetching restaurants:", err);
        setError("Failed to load your restaurants.");
      }
    };

    fetchOwnedRestaurants();
  }, [currentUser]);
  localStorage.setItem("restaurant", JSON.stringify(selectedRestaurant));
  // Fetch reservations when a restaurant is selected
  useEffect(() => {
    if (!selectedRestaurant) return;

    const fetchReservations = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://table-reservation-m21o.onrender.com/api/reservations/restaurant/${selectedRestaurant}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include auth token
            },
          }
        );
        setReservations(response.data || []);
      } catch (err) {
        console.error("Error fetching reservations:", err);
        setError("Failed to load reservations. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [selectedRestaurant, currentUser]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-10 mt-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-6">
          Admin Reservation Dashboard
        </h1>

        {/* Restaurant Selector */}
        <div className="mb-8">
          <label htmlFor="restaurant-select" className="block text-lg mb-2">
            Select a Restaurant that Created by You :
          </label>
          <select
            id="restaurant-select"
            className="w-full p-3 bg-gray-800 text-white rounded-lg"
            value={selectedRestaurant || ""}
            onChange={(e) => setSelectedRestaurant(e.target.value)}
          >
            <option value="" disabled>
              -- Select a restaurant --
            </option>
            {restaurants.map((restaurant) => (
              <option key={restaurant._id} value={restaurant._id}>
                {restaurant.name}
              </option>
            ))}
          </select>
        </div>

        {/* Reservations Table */}
        {loading ? (
          <p className="text-center text-xl text-blue-400 animate-pulse">
            Loading reservations...
          </p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : reservations.length > 0 ? (
          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-700 text-gray-300">
                  <th className="px-4 py-3 border-b border-gray-600">Name</th>
                  <th className="px-4 py-3 border-b border-gray-600">Email</th>
                  <th className="px-4 py-3 border-b border-gray-600">
                    Reservation Date
                  </th>
                  <th className="px-4 py-3 border-b border-gray-600">
                    Reservation Time
                  </th>
                  <th className="px-4 py-3 border-b border-gray-600">Guests</th>
                  <th className="px-4 py-3 border-b border-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((reservation, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
                    } hover:bg-gray-700 transition duration-200`}
                  >
                    <td className="px-4 py-3 border-b border-gray-600">
                      {reservation.user?.name || "Anonymous"}
                    </td>
                    <td className="px-4 py-3 border-b border-gray-600">
                      {reservation.user?.email || "Not provided"}
                    </td>
                    <td className="px-4 py-3 border-b border-gray-600">
                      {new Date(reservation.date).toLocaleDateString() || "N/A"}
                    </td>
                    <td className="px-4 py-3 border-b border-gray-600">
                      {reservation.time || "N/A"}
                    </td>
                    <td className="px-4 py-3 border-b border-gray-600">
                      {reservation.PartySize || "N/A"}
                    </td>
                    <td className="px-4 py-3 border-b border-gray-600">
                      { "Conformed"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          selectedRestaurant && (
            <p className="text-center text-gray-400">
              No reservations found for this restaurant.
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default AdminReservationPage;
