"use client"
const Modal = ({ userData, onClose }) => {

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
<div className="bg-cover p-6 rounded-lg shadow-lg max-w-md w-full flex flex-col justify-center text-center" style={{ backgroundImage: "url('/background3.jpeg')" }}>
  <h3 className="text-2xl font-bold mb-4">{userData.name}</h3>
  <div className="space-y-2 text-left">
  <p className="font-bold text-buttons">Username: <span className="text-white">{userData.username}</span></p>
  <p className="font-bold text-buttons">Email: <span className="text-white">{userData.email}</span></p>
  <p className="font-bold text-buttons">Phone: <span className="text-white">{userData.phone}</span></p>
  <p className="font-bold text-buttons">Website: <span className="text-white">{userData.website}</span></p>
  <p className="font-bold text-buttons">
    Address: <span className="text-white">{userData.address.street}</span>, <span className="text-white">{userData.address.city}</span>
  </p>
</div>

  <button
    onClick={onClose}
    className="mt-4 px-4 py-2 bg-buttons text-black rounded-md hover:text-white"
  >
    Close
  </button>
</div>

    </div>
  );
};

export default Modal;