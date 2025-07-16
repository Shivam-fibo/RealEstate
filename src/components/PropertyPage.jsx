import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ImageCarousel from './ImageCarousel';

const PropertyPage = () => {
  const { id } = useParams();
  const [propertyData, setPropertyData] = useState({ property: null, relatedProjects: [] });
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    fetch(`https://real-esate-backend.vercel.app/api/user/property/${id}`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) =>
        setPropertyData({
          property: data.property,
          relatedProjects: data.relatedProjects || [],
        })
      )
      .catch(console.error);
  }, [id]);

  if (!propertyData.property) return <div className="p-6">Loading...</div>;

  const { property, relatedProjects } = propertyData;



 

  return (
    <div className="bg-white text-gray-800 p-8 min-h-screen">
      <div className="grid md:grid-cols-2 gap-6">
        <ImageCarousel images={property.images} />
        <div>
          <h1 className="text-3xl font-bold text-blue-600 mb-2">{property.title}</h1>
          <p className="text-xl font-semibold text-gray-700">₹ {property.price.toLocaleString()}</p>
          <p className="mt-2">
            {property.bhk} BHK • {property.carpetArea} sqft
          </p>
          <p className="mt-2">Furnishing: {property.furnishingStatus}</p>
          <p className="mt-2">Ownership: {property.ownership}</p>
          <p className="mt-2">Completion: {property.completionStatus}</p>
          <p className="mt-2">RERA Approved: {property.reraApproved ? 'Yes' : 'No'}</p>

          <button
            className="mt-6 bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => setShowContact(!showContact)}
          >
            Contact Builder
          </button>

          {showContact && (
            <div className="mt-4 text-sm bg-gray-100 p-4 rounded space-y-2">
              <p>
                <span className="font-semibold text-blue-600">Name:</span>{' '}
                {property.builder?.name}
              </p>
              <p>
                <span className="font-semibold text-blue-600">Email:</span>{' '}
                {property.builder?.contactEmail}
              </p>
              <p>
                <span className="font-semibold text-blue-600">Phone:</span>{' '}
                {property.builder?.phoneNumber}
              </p>
              <p>
                <span className="font-semibold text-blue-600">Website:</span>{' '}
                <a
                  href={property.builder?.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline ml-1"
                >
                  {property.builder?.website}
                </a>
              </p>
              <p>
                <span className="font-semibold text-blue-600">Description:</span>{' '}
                {property.builder?.description}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Amenities */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-blue-600">Amenities</h2>
        <ul className="list-disc pl-6 mt-2">
          {property.amenities?.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>


     

      {/* Related Projects */}
      {relatedProjects && relatedProjects.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Other Projects by Builder</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedProjects.map((proj) => (
              <div
                key={proj._id}
                className="border rounded shadow p-4 hover:shadow-lg transition cursor-pointer"
              >
                {proj.images?.[0]?.url && (
                  <img
                    src={proj.images[0].url}
                    alt={proj.title}
                    className="w-full h-40 object-cover rounded mb-3"
                  />
                )}
                <h3 className="text-lg font-semibold">{proj.title}</h3>
                <p className="text-gray-700">₹ {proj.price.toLocaleString()}</p>
                <p className="text-gray-600 text-sm">{proj.location}</p>
                <p className="text-gray-600 text-sm">
                  {proj.bhk} BHK • {proj.carpetArea} sqft
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyPage;
