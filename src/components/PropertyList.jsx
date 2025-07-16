import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Home, IndianRupee, Bed, Eye, Loader2, Filter, X } from 'lucide-react';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(true);
  const navigate = useNavigate();

  // Filter states
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    furnishingStatus: '',
    bhk: ''
  });

  useEffect(() => {
    fetch('https://real-esate-backend.vercel.app/api/user/allProperty', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        setProperties(data);
        setFilteredProperties(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Filter properties based on current filters
  useEffect(() => {
    let filtered = properties;

    // Filter by price range
    if (filters.minPrice) {
      filtered = filtered.filter(property => property.price >= parseInt(filters.minPrice));
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(property => property.price <= parseInt(filters.maxPrice));
    }

    // Filter by furnishing status
    if (filters.furnishingStatus) {
      filtered = filtered.filter(property => property.furnishingStatus === filters.furnishingStatus);
    }

    // Filter by BHK
    if (filters.bhk) {
      filtered = filtered.filter(property => property.bhk === parseInt(filters.bhk));
    }

    setFilteredProperties(filtered);
  }, [filters, properties]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      minPrice: '',
      maxPrice: '',
      furnishingStatus: '',
      bhk: ''
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  if (loading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading properties...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center gap-3 mb-2">
            <Home className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-blue-600">Available Properties</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Discover your perfect home from our curated collection
          </p>
          <div className="mt-6 flex items-center gap-4 text-sm text-gray-600">
            <span className="bg-white px-3 py-1 rounded-full border border-blue-200">
              {filteredProperties.length} Properties Available
            </span>
            {hasActiveFilters && (
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full">
                Filters Applied
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="max-w-7xl mx-auto px-6 py-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Filter className="w-4 h-4" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
          
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <X className="w-4 h-4" />
              Clear Filters
            </button>
          )}
        </div>

        {showFilters && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Budget Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
                <div className="space-y-2">
                  <input
                    type="number"
                    placeholder="Min Price"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    type="number"
                    placeholder="Max Price"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Furnishing Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Furnishing Status</label>
                <select
                  value={filters.furnishingStatus}
                  onChange={(e) => handleFilterChange('furnishingStatus', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All</option>
                  <option value="Furnished">Furnished</option>
                  <option value="Semi-Furnished">Semi-Furnished</option>
                  <option value="Unfurnished">Unfurnished</option>
                </select>
              </div>

              {/* BHK */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">BHK</label>
                <select
                  value={filters.bhk}
                  onChange={(e) => handleFilterChange('bhk', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All</option>
                  <option value="1">1 BHK</option>
                  <option value="2">2 BHK</option>
                  <option value="3">3 BHK</option>
                  <option value="4">4 BHK</option>
                  <option value="5">5 BHK</option>
                  <option value="6">6 BHK</option>
                </select>
              </div>

              {/* Active Filters Summary */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Active Filters</label>
                <div className="text-sm text-gray-600">
                  {hasActiveFilters ? (
                    <div className="space-y-1">
                      {filters.minPrice && <div>Min: ₹{parseInt(filters.minPrice).toLocaleString()}</div>}
                      {filters.maxPrice && <div>Max: ₹{parseInt(filters.maxPrice).toLocaleString()}</div>}
                      {filters.furnishingStatus && <div>Status: {filters.furnishingStatus}</div>}
                      {filters.bhk && <div>BHK: {filters.bhk}</div>}
                    </div>
                  ) : (
                    <div>No filters applied</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Properties Grid */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {filteredProperties.length === 0 ? (
          <div className="text-center py-16">
            <Home className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {hasActiveFilters ? 'No Properties Match Your Filters' : 'No Properties Found'}
            </h3>
            <p className="text-gray-500">
              {hasActiveFilters ? 'Try adjusting your filters to see more results' : 'Check back later for new listings'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <div 
                key={property._id} 
                className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Card Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {property.title}
                    </h3>
                  </div>
                  
                  {/* Price */}
                  <div className="flex items-center gap-2 mb-4">
                    <IndianRupee className="w-5 h-5 text-blue-600" />
                    <span className="text-2xl font-bold text-blue-600">
                      {property.price.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Property Details */}
                <div className="px-6 pb-6 space-y-3">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Bed className="w-4 h-4 text-blue-600" />
                    <span className="font-medium">{property.bhk} BHK</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-gray-600">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span>{property.location}</span>
                  </div>
                  
                  <div className="inline-block">
                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium border border-blue-200">
                      {property.furnishingStatus}
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="p-6 pt-0">
                  <button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 group"
                    onClick={() => navigate(`/property/${property._id}`)}
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyList;