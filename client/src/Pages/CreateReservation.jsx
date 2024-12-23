import React, { useState } from 'react';  
import { motion } from 'framer-motion';  
import { toast, ToastContainer } from 'react-toastify'; // Importing ToastContainer and toast  
import restaurantService from '../services/restaurantService'; // Adjust path if necessary  
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles  

const CreateRestaurant = () => {  
  const [name, setName] = useState('');  
  const [description, setDescription] = useState('');  
  const [cuisine, setCuisine] = useState('');  
  const [priceRange, setPriceRange] = useState('');  
  const [city, setCity] = useState('');  
  const [features, setFeatures] = useState([]);  

  const handleSubmit = async (e) => {  
    e.preventDefault();  

    if (!name || !description || !cuisine || !priceRange || !city) {  
      toast.error('All fields are required');  
      return;  
    }  

    const newRestaurant = {  
      name,  
      description,  
      cuisine,  
      priceRange,  
      location: city,  
      features,  
    };  
    console.log('newRestaurant:', newRestaurant);
    console.log('city' , city)

    try {  
      await restaurantService.createRestaurant(newRestaurant);  
      toast.success('Restaurant created successfully!');  
      // Reset form fields after successful creation  
      setName('');  
      setDescription('');  
      setCuisine('');  
      setPriceRange('');  
      setCity('');  
      setFeatures([]);  
    } catch (error) {  
      toast.error('Failed to create restaurant');  
      console.error('Error creating restaurant:', error);  
    }  
  };  

  return (  
    <div className="min-h-screen bg-black flex items-center justify-center">  
      <motion.div  
        initial={{ opacity: 0 }}  
        animate={{ opacity: 1 }}  
        transition={{ duration: 0.5 }}  
        className="max-w-4xl w-full p-6 bg-gray-950 text-white shadow-lg rounded-lg"  
      >  
        <h2 className="text-2xl font-bold text-center mb-6">Create a Restaurant</h2>  

        <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick={true} rtl={false} pauseOnFocusLoss draggable pauseOnHover />  

        <form onSubmit={handleSubmit}>  
          <div className="mb-4">  
            <label htmlFor="name" className="block text-sm font-semibold">Restaurant Name</label>  
            <input  
              type="text"  
              id="name"  
              value={name}  
              onChange={(e) => setName(e.target.value)}  
              className="w-full p-3 mt-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"  
              placeholder="Enter restaurant name"  
              required  
            />  
          </div>  

          <div className="mb-4">  
            <label htmlFor="description" className="block text-sm font-semibold">Description</label>  
            <textarea  
              id="description"  
              value={description}  
              onChange={(e) => setDescription(e.target.value)}  
              className="w-full p-3 mt-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"  
              placeholder="Enter restaurant description"  
              required  
            />  
          </div>  

          <div className="mb-4">  
            <label htmlFor="cuisine" className="block text-sm font-semibold">Cuisine</label>  
            <input  
              type="text"  
              id="cuisine"  
              value={cuisine}  
              onChange={(e) => setCuisine(e.target.value)}  
              className="w-full p-3 mt-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"  
              placeholder="Enter cuisine type"  
              required  
            />  
          </div>  

          <div className="mb-4">  
            <label htmlFor="priceRange" className="block text-sm font-semibold">Price Range</label>  
            <input  
              type="number"  
              id="priceRange"  
              value={priceRange}  
              onChange={(e) => setPriceRange(e.target.value)}  
              className="w-full p-3 mt-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"  
              placeholder="Enter price range"  
              required  
            />  
          </div>  

          <div className="mb-4">  
            <label htmlFor="city" className="block text-sm font-semibold">City</label>  
            <input  
              type="text"  
              id="city"  
              value={city}  
              onChange={(e) => setCity(e.target.value)}  
              className="w-full p-3 mt-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"  
              placeholder="Enter city (e.g., Trichy, Chennai, Madurai)"  
              required  
            />  
          </div>  

          <div className="mb-4">  
            <label htmlFor="features" className="block text-sm font-semibold">Features</label>  
            <select  
              id="features"  
              multiple  
              value={features}  
              onChange={(e) => setFeatures(Array.from(e.target.selectedOptions, option => option.value))}  
              className="w-full p-3 mt-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"  
            >  
              <option value="Outdoor Seating">Outdoor Seating</option>  
              <option value="Live Music">Live Music</option>  
              <option value="Parking">Parking</option>  
              <option value="Wheelchair Accessible">Wheelchair Accessible</option>  
              <option value="Wi-Fi">Wi-Fi</option>  
            </select>  
          </div>  

          <div className="text-center">  
            <button  
              type="submit"  
              className="px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-900"  
            >  
              Create Restaurant  
            </button>  
          </div>  
        </form>  
      </motion.div>  
    </div>  
  );  
};  

export default CreateRestaurant;