import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import restaurantService from "../services/restaurantService";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RestaurantListPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [cuisineType, setCuisineType] = useState("");
  const [rating, setRating] = useState("");
  const [location, setLocation] = useState("");
  const [features, setFeatures] = useState([]);

  const navigate = useNavigate();

  // Fetch restaurants from API
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await restaurantService.getAllRestaurants();
        if (Array.isArray(data)) {
          setRestaurants(data);
        } else {
          throw new Error("Unexpected API response");
        }
      } catch (err) {
        setError("Failed to load restaurants. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);
  

  // Handle filters and search term changes
  const handleFilterChange = async () => {
    const filters = {
      cuisine: cuisineType.toLowerCase() || undefined,
      priceRange: priceRange || undefined,
      rating: rating || undefined,
      location: location.toLowerCase() || undefined,
      features: features.length > 0 ? features.join(",").toLowerCase() : undefined,
      // searchTerm: searchTerm.trim().toLowerCase() || undefined,
    };

    const queryParams = new URLSearchParams(
      Object.entries(filters).reduce((acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = value;
        }
        return acc;
      }, {})
    ).toString();

    try {
      setLoading(true);
      setError(null);
      const filteredData = await restaurantService.getAllRestaurants(`?${queryParams}`);
      setRestaurants(filteredData);
    } catch (err) {
      console.error("Failed to fetch filtered restaurants:", err);
      setError("Could not apply filters. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle search term input
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
  
    // Filter restaurants based on the search term (name only)
    const filtered = restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(term)
    );
  
    setRestaurants(filtered); // Update displayed restaurants
  };
  

  // Handle restaurant details navigation
  const handleViewDetails = (id) => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      toast.warning("Token required. Please log in.", {
        onClose: () => navigate("/user-login"),
        autoClose: 3000,
        transition:"slide",
      });
      return;
    }
    navigate(`/restaurants/${id}`);
  };

  // Re-fetch restaurants when filters change
  useEffect(() => {
    handleFilterChange();
  }, [cuisineType, priceRange, rating, location, features]);

  return (
    <div className="min-h-screen bg-gray-900 text-white mt-10">
          <ToastContainer position="top-center" theme="dark" autoClose={3000} hideProgressBar={false} />

      {/* Header */}
      <div className="container mx-auto py-3 text-center">
        <motion.h1
          className="text-5xl font-extrabold  mt-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          Explore the Best Restaurants
        </motion.h1>
      </div>

      {/* Search Bar */}
      <div className="container mx-auto px-4 mb-3 flex justify-center">
        <motion.div className="relative w-full sm:w-1/2 lg:w-1/3">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={handleSearch} // Update search handling
            className="w-full p-3 pl-10 rounded-lg bg-gray-800 text-white placeholder-gray-400 shadow-lg focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </motion.div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 mb-8">
        <div className="flex flex-wrap gap-4 justify-center">
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="px-5 py-3 text-sm rounded-lg bg-gray-800 text-white shadow-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Price Range</option>
            <option value="100">0-100</option>
            <option value="200">101-200</option>
            <option value="500">500+</option>
          </select>

          <select
            value={cuisineType}
            onChange={(e) => setCuisineType(e.target.value)}
            className="p-2 text-sm rounded-lg bg-gray-800 text-white shadow-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Cuisine Type</option>
            <option value="north indian">North Indian</option>
            <option value="south indian">South Indian</option>
            <option value="chinese">Chinese</option>
            <option value="italian">Italian</option>
            <option value="continental">Continental</option>
          </select>

          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="p-2 text-sm rounded-lg bg-gray-800 text-white shadow-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Rating</option>
            <option value="1">1+</option>
            <option value="3">3+</option>
            <option value="4.5">4.5+</option>
            <option value="All">All</option>
          </select>

          {/* <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="p-2 text-sm rounded-lg bg-gray-800 text-white shadow-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Location</option>
            <option value="trichy">Trichy</option>
            <option value="madurai">Madurai</option>
            <option value="chennai">Chennai</option>
            <option value="covai">Covai</option>
            <option value="salem">Salem</option>
          </select> */}


          <button
            onClick={handleFilterChange}
            className="p-2 text-sm rounded-lg bg-yellow-600 font-semibold text-black hover:bg-yellow-700 shadow-md focus:ring-2 focus:ring-yellow-600 px-3"
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4">
        {loading ? (
          <p className="text-center text-xl text-blue-400 animate-pulse">
            Loading restaurants...
          </p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : restaurants.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {restaurants.map((restaurant) => (
              <motion.div
                key={restaurant._id}
                className="relative group bg-gray-800 rounded-lg shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                whileHover={{ scale: 1.05 }}
              >
                <div
                  className="h-56 bg-cover bg-center"
                  style={{
                    backgroundImage:`url(${restaurant.images || "image not loading..."})`,
                  }}  
                ></div>    

                <div className="p-2 transition-all">
                  <h2 className="text-2xl font-bold mb-2 text-white">
                    {restaurant.name}
                  </h2>
                  <div className="flex justify-between mb-2">
                    <p className="text-gray-300">
                      Start's From:<span className="text-green-400"> ₹</span> {" "}
                      <span className="font-semibold text-green-400">
                        {restaurant.priceRange || "N/A"}
                      </span>
                    </p>
                    <p className="text-gray-300">
                      <span className="font-semibold text-yellow-400">
                        {restaurant.rating || "4.5"} ⭐️
                      </span>
                    </p>
                  </div>

                  <motion.button
                    onClick={() => handleViewDetails(restaurant._id)}
                    className="mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-2 rounded-lg shadow-md hover:from-blue-600 hover:to-purple-700 transition duration-300 transform"
                    whileHover={{ scale: 1.1 }}
                  >
                    View Details
                  </motion.button>
                </div>
                <motion.div
                  className="absolute top-0 right-0 bg-green-400 text-gray-900 font-bold px-3 py-1 rounded-bl-lg transform rotate-6 shadow-lg"
                  whileHover={{ rotate: -6 }}
                >
                  Cuisine: {restaurant.cuisine || "Variety"}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-center text-gray-500 text-lg">
            No restaurants available at the moment.
          </p>
        )}
      </div>
    </div>
  );
};

export default RestaurantListPage;
