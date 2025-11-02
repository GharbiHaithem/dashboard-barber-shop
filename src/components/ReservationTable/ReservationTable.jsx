import React, { useEffect, useState } from "react";
import { Table, Tag, ConfigProvider } from "antd";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5500"); // serveur backend

const ReservationTable = () => {
  const [data, setData] = useState([]);

  const fetchReservations = async () => {
    const res = await axios.get("http://localhost:5500/api/reservations");
    setData(res.data);
  };

  useEffect(() => {
    fetchReservations();

    // 🔥 Réception temps réel
    socket.on("newReservation", (newRes) => {
      setData((prev) => [newRes, ...prev]);
    });

    return () => {
      socket.off("newReservation");
    };
  }, []);

  const columns = [
    {
      title: <span className="text-yellow-400">Nom complet</span>,
      dataIndex: "fullname",
      key: "fullname",
      render: (text) => <span className="text-white font-medium">{text}</span>,
    },
    {
      title: <span className="text-yellow-400">Date</span>,
      dataIndex: "date",
      key: "date",
      render: (text) => <span className="text-gray-300">{text}</span>,
    },
    {
      title: <span className="text-yellow-400">Heure</span>,
      dataIndex: "time",
      key: "time",
      render: (text) => <span className="text-gray-300">{text } Heure</span>,
    },
    {
      title: <span className="text-yellow-400">Service</span>,
      dataIndex: "services",
      key: "services",
      render: (service) => (
        <Tag
          color="#D4AF37"
          className="text-black font-semibold px-3 py-1 rounded-md"
        >
          {service}
        </Tag>
      ),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: "#0b0b0b",
          colorText: "#fff",
          colorBorderSecondary: "#2c2c2c",
          colorPrimary: "#D4AF37",
          borderRadius: 12,
        },
        components: {
          Table: {
            headerBg: "#111",
            headerColor: "#FFD700",
            rowHoverBg: "#1a1a1a",
            colorTextHeading: "#FFD700",
            borderColor: "#2c2c2c",
          },
          Pagination: {
            colorPrimary: "#FFD700",
            colorText: "#fff",
            colorTextDisabled: "#777",
          },
        },
      }}
    >
      <div className="bg-[#0b0b0b] border border-[#2c2c2c] p-4 rounded-xl shadow-lg">
        <h2 className="text-[#FFD700] text-xl font-semibold mb-4 text-center">
          Liste des Réservations
        </h2>

        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            pageSize: 5,
            position: ["bottomCenter"],
            className: "custom-pagination",
          }}
          rowKey="_id"
          className="rounded-lg overflow-hidden"
        />
      </div>
    </ConfigProvider>
  );
};

export default ReservationTable;
