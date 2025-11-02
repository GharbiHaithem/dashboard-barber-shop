import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar/Navbar";
import ReservationTable from "../components/ReservationTable/ReservationTable";
import NotificationPanel from "../components/NotificationPanel/NotificationPanel";
import { motion, AnimatePresence } from "framer-motion";
import { io } from "socket.io-client";
import axios from "axios";
import notifSound from "../assets/n.wav"; // ton son ici

const Dashboard = () => {
  const [showNotif, setShowNotif] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [data, setData] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ✅ socket ne doit être créé qu’une seule fois
  const socketRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    socketRef.current = io("https://yahia-barber-shop-server.onrender.com", { transports: ["websocket"] });
    fetchReservations();

    socketRef.current.on("connect", () => {
      console.log("🟢 Connecté au serveur socket");
    });

    socketRef.current.on("newReservation", (newRes) => {
      console.log("📩 Nouvelle réservation reçue :", newRes);

      // 🔊 joue le son
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(err => console.warn("⚠️ Son bloqué :", err));
      }

      // ✅ Ajoute instantanément la nouvelle réservation
      setData((prev) => [newRes, ...prev]);

      // ✅ Ajoute une notification visuelle
      setNotifications((prev) => [
        {
          id: Date.now(),
          text: `Nouvelle réservation de ${newRes.fullname} à ${newRes.time}`,
        },
        ...prev,
      ]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const fetchReservations = async () => {
    try {
      const res = await axios.get("https://yahia-barber-shop-server.onrender.com/api/reservations");
      setData(res.data);
      const initialNotifs = res.data.map((r) => ({
        id: r._id,
        text: `Réservation de ${r.fullname} à ${r.time} (${r.date})`,
      }));
      setNotifications(initialNotifs);
    } catch (err) {
      console.error("Erreur de chargement :", err);
    }
  };

  // 🔓 Débloquer le son dès le premier clic
  useEffect(() => {
    const unlockAudio = () => {
      if (!audioRef.current) {
        audioRef.current = new Audio(notifSound);
      }
      audioRef.current.play().then(() => {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        console.log("🔓 Son débloqué !");
      }).catch(() => {});
      window.removeEventListener("click", unlockAudio);
    };

    window.addEventListener("click", unlockAudio);
    return () => window.removeEventListener("click", unlockAudio);
  }, []);

  return (
    <div className="bg-[#0b0b0b] min-w-full text-white min-h-screen flex flex-col">
      <Navbar
        onToggleNotif={() => setShowNotif(!showNotif)}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
        <div className="relative h-[calc(100vh-5rem)] mt-[150px]">
          <div className="absolute inset-0 bg-[#111] border border-[#2c2c2c] rounded-xl shadow-lg p-4 overflow-y-auto">
            <ReservationTable data={data} />
          </div>
        </div>
      </main>

      <AnimatePresence>
        {showNotif && (
          <motion.div
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 right-0 w-80 h-[max-content] bg-[#111] border-l border-[#2c2c2c] shadow-xl p-4 z-40"
          >
            <NotificationPanel notifications={notifications} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
