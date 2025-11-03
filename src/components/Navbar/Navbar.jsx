import React from "react";
import { Bell } from "lucide-react";
import i from "../../assets/barber-shop-logo-removebg-preview.png";

const Navbar = ({ onToggleNotif }) => {
  return (
    <div className="fixed top-0 left-0 w-full z-50 h-[80px]  py-2 bg-[#111] flex items-center justify-between px-6 border-b border-[#2c2c2c] shadow-lg">
      <div className="flex items-center md:ml-20 gap-3">
        <img
          src={i}
          alt="logo"
          className="w-[50px] h-[50px] bg-[#D4AF37] rounded-full object-cover"
        />
        <h1 className="text-xl uppercase font-bold text-[#D4AF37]">Dashboard</h1>
      </div>

      <button
        onClick={onToggleNotif}
        className="text-[#D4AF37] md:mr-20 hover:text-yellow-400 transition"
      >
        <Bell size={28} />
      </button>
    </div>
  );
};

export default Navbar;
