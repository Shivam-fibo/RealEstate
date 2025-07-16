// pages/PropertyList.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://real-esate-backend.vercel.app/api/user/allProperty', {
      credentials: 'include'
      
    })
      .then(res => res.json())
      .then(data => setProperties(data))
      .catch(console.error);
  }, []);

  return (
    <div className="bg-white min-h-screen py-10 px-6">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">Available Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div key={property._id} className="border rounded-xl p-4 shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-blue-600">{property.title}</h3>
            <p className="text-gray-700">₹ {property.price.toLocaleString()}</p>
            <p className="text-gray-600">{property.bhk} BHK • {property.location}</p>
            <p className="text-sm text-gray-500 mt-1">{property.furnishingStatus}</p>
            <button
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() => navigate(`/property/${property._id}`)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyList;
