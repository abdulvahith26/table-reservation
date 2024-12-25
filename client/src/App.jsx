import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from './Pages/HomePage';
import RestaurantListPage from './Pages/RestaurantListPage';
import RestaurantDetailsPage from './Pages/RestaurantDetailsPage';
import UserReservationPage from './Pages/UserReservationPage'
import ReviewForm from './Pages/ReviewForm';
import AdminReview from './Pages/AdminReview';
import Recommendation from './components/Recommendation'
import LoginPage from './Pages/LoginPage';
import LoginRegister from './Pages/LoginRegister';
import RegisterPage from './Pages/RegisterPage';
import UserLogin from './Pages/UserLogin';
import AdminLogin from './Pages/AdminLogin'
import CreateReservationPage from './Pages/CreateReservationPage';
import UserDashboardPage from './Pages/UserDashboardPage';
import CreateRestaurants from './Pages/CreateReservation';
import AdminReservationPage from './Pages/AdminReservation';
import AdminDashboardPage from './Pages/AdminDashboardPage';

function App() {

  
  return ( 
    <Router> 
      <Navbar/>
      <div className="min-h-screen">
        <Routes>
{/* Common */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/recommendations" element={<Recommendation />} />

{/* User */}
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/user-register" element={<LoginRegister />} />
          <Route path ="/user-dashboard" element={<UserDashboardPage />} />
          <Route path="/reservations" element={<UserReservationPage />} />

{/* Admin */}
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-reservations" element={<AdminReservationPage />} />
          <Route path="/admin-reviews" element={<AdminReview />} />
          <Route path="/admin-dashboard" element={<AdminDashboardPage />} />

{/* restaurants  */}
          <Route path="/restaurants" element={<RestaurantListPage />} />
          <Route path="/createReservation/:id" element={<CreateReservationPage />} />
          <Route path="/restaurants/:id" element={<RestaurantDetailsPage />} />
          <Route path="/restaurants/review/:id" element={<ReviewForm />} />
          <Route path="/create-restaurant" element={<CreateRestaurants />} />
        </Routes>
      </div>

         <ToastContainer
                  position="top-center"
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick={false}
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="dark"
                  transition={Slide}
         />      
    </Router>
  );
}

export default App;
