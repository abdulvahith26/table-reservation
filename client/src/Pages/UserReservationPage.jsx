import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import userService from "../services/userServices"; // Service for user-related API calls

const UserReservationPage = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserReservations = async () => {
      try {
        const userReservations = await userService.getUserReservation();
        if (userReservations?.reservations?.length > 0) {
          console.log(
            "Fetched User Reservations:",
            userReservations.reservations
          );
          setReservations(userReservations.reservations);
        } else {
          toast.info("No reservations found.");
          setReservations([]);
        }
      } catch (error) {
        toast.error("Failed to fetch reservations. Please try again later.");
        console.error("Error fetching reservations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserReservations();
  }, []);

  if (loading) {
    return (
      <p className="text-center font-bold text-xl text-gray-300 animate-pulse">
        Loading...
      </p>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-950 p-8 text-gray-300"
    >
      <div>
        <h2 className="text-2xl font-bold mb-6 text-gray-300">
          Reservation History
        </h2>
        {reservations.length > 0 ? (
          <div className="space-y-4">
            {reservations.map((reservation) => (
              <div
                key={reservation._id}
                className="bg-slate-800 p-6 rounded-lg shadow-md hover:shadow-lg transition"
              >
                <h3 className="text-lg font-semibold text-yellow-500">
                  {reservation.restaurant?.name || "Unknown Restaurant"}
                </h3>
                <p className="mt-2">
                  <strong>Date:</strong>{" "}
                  {new Date(reservation.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Slot:</strong> {reservation.time}
                </p>
                <p>
                  <strong>Party Size:</strong> {reservation.partySize}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className="font-semibold text-green-500">Confirmed</span>
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-300">You have no reservations yet.</p>
        )}
      </div>
    </motion.div>
  );
};

export default UserReservationPage;
