"use client"
const Card = ({ name, username, onViewDetails }) => {
  return (
    <div className="flex flex-col justify-center items-center text-white focus:outline-none focus:ring-8 focus:ring-white">
      <div
        className="bg-cover p-4 bg-white rounded-lg shadow-md hover:shadow-lg w-64 h-48 transition-transform transform hover:scale-105"
        style={{ backgroundImage: "url('/background4.jpeg')" }}
      >
        <h2 className="text-xl font-bold">{name}</h2>
        <p className="text-gray-600">{username}</p>
        <button
          onClick={onViewDetails}
          className="mt-4 text-black bg-buttons rounded-lg p-2 hover:text-white"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default Card;