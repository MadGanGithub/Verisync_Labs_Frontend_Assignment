"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../_components/Card.jsx";
import Modal from "../_components/Modal.jsx";

const Dashboard = () => {
  const [List, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [sorts, setSorts] = useState("");
  const [modal, setModal] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setList(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = List.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.username.toLowerCase().includes(search.toLowerCase())
  ).sort((a, b) => {
    if (sorts === "name") return a.name.localeCompare(b.name);
    if (sorts === "username") return a.username.localeCompare(b.username);
    return 0;
  });

  const openModal = (user) => {
    setModal(user);
    setOpen(true);
  };

  const closeModal = () => {
    setModal(null);
    setOpen(false);
  };

  return (
    <div
      className="bg-cover flex flex-col justify-center items-center text-white"
      style={{ backgroundImage: "url('/background3.jpeg')" }}
    >
      <div className="p-6 bg-formcolor">
        <div className="flex flex-col justify-center text-center">
          <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>

          <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="p-2 border border-bordercolor bg-formcolor rounded-md shadow-sm w-full sm:w-1/2 focus:outline-none focus:ring-1 focus:ring-buttons"
            />
            <select
              value={sorts}
              onChange={(e) => setSorts(e.target.value)}
              className="p-2 border border-black bg-filtercolor text-black rounded-md shadow-sm w-full sm:w-1/4 focus:border-black active:border-black"
            >
              <option value="">Sort by</option>
              <option value="name">Name</option>
              <option value="username">Username</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <Card
              key={user.id}
              name={user.name}
              username={user.username}
              onViewDetails={() => openModal(user)}
            />
          ))}
        </div>

        {open && <Modal userData={modal} onClose={closeModal} />}
      </div>
    </div>
  );
};

export default Dashboard;