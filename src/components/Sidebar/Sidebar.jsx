import React from "react";
import { Home, Calendar, Settings } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-64 bg-black border-r border-[#2c2c2c] flex flex-col p-4">
      <h2 className="text-[#D4AF37] text-2xl font-bold mb-8 text-center">BerberShop</h2>
      <nav className="space-y-4">
        <button className="flex items-center gap-3 text-gray-300 hover:text-[#D4AF37]">
          <Home size={18} /> Dashboard
        </button>
        <button className="flex items-center gap-3 text-gray-300 hover:text-[#D4AF37]">
          <Calendar size={18} /> Réservations
        </button>
        <button className="flex items-center gap-3 text-gray-300 hover:text-[#D4AF37]">
          <Settings size={18} /> Paramètres
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
