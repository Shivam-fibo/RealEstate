import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ImageCarousel from './ImageCarousel';
import { 
  Phone, 
  Mail, 
  Globe, 
  Calendar, 
  Clock, 
  MessageSquare, 
  User, 
  MapPin, 
  Home, 
  CheckCircle, 
  XCircle,
  IndianRupee,
  Bed,
  Square,
  Building,
  Shield,
  Settings,
  Loader2,
  Star,
  Eye,
  X
} from 'lucide-react';

const PropertyPage = () => {
  const { id } = useParams();
  const [propertyData, setPropertyData] = useState({ property: null, relatedProjects: [] });
  const [showContact, setShowContact] = useState(false);
  const [showVisitForm, setShowVisitForm] = useState(false);
  const [formData, setFormData] = useState({
    visitDate: '',
    visitTime: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleVisitSubmit = async (e) => {
    const userId = localStorage.getItem('userId')
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`https://real-esate-backend.vercel.app/api/schedlue/${id}/visits`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userId: userId
        })
      });

      if (response.ok) {
        alert('Visit scheduled successfully!');
        setShowVisitForm(false);
        setFormData({
          visitDate: '',
          visitTime: '',
          notes: ''
        });
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to schedule visit');
      }
    } catch (error) {
      console.error('Error scheduling visit:', error);
      alert('Failed to schedule visit');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!propertyData.property) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  const { property, relatedProjects } = propertyData;

  return (
    <div className="bg-white text-gray-800 min-h-screen">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Property Header & Gallery */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="space-y-4">
            <ImageCarousel images={property.images} />
          </div>
          
          <div className="space-y-6">
            {/* Property Title & Price */}
            <div className="space-y-3">
              <h1 className="text-4xl font-bold text-gray-900 leading-tight">{property.title}</h1>
              <div className="flex items-center gap-2">
                <IndianRupee className="w-6 h-6 text-blue-600" />
                <span className="text-3xl font-bold text-blue-600">{property.price.toLocaleString()}</span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                <div className="flex items-center gap-2 mb-1">
                  <Bed className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-600">BHK</span>
                </div>
                <p className="text-xl font-bold text-gray-900">{property.bhk}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                <div className="flex items-center gap-2 mb-1">
                  <Square className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-600">Carpet Area</span>
                </div>
                <p className="text-xl font-bold text-gray-900">{property.carpetArea} sqft</p>
              </div>
            </div>

            {/* Property Details */}
            <div className="bg-gray-50 p-6 rounded-xl space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Details</h3>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-600">Furnishing:</span>
                  <span className="font-medium text-gray-900">{property.furnishingStatus}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <Building className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-600">Ownership:</span>
                  <span className="font-medium text-gray-900">{property.ownership}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <Home className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-600">Completion:</span>
                  <span className="font-medium text-gray-900">{property.completionStatus}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-600">RERA Approved:</span>
                  <div className="flex items-center gap-1">
                    {property.reraApproved ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-600" />
                    )}
                    <span className={`font-medium ${property.reraApproved ? 'text-green-600' : 'text-red-600'}`}>
                      {property.reraApproved ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold"
                onClick={() => setShowContact(!showContact)}
              >
                <Phone className="w-4 h-4" />
                {showContact ? 'Hide Contact' : 'Contact Builder'}
              </button>
              
              <button
                className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors font-semibold"
                onClick={() => setShowVisitForm(true)}
              >
                <Calendar className="w-4 h-4" />
                Schedule Site Visit
              </button>
            </div>

            {/* Contact Info */}
            {showContact && (
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Builder Contact</h3>
                  <button
                    onClick={() => setShowContact(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium text-gray-900">{property.builder?.name}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-600">Email:</span>
                    <a href={`mailto:${property.builder?.contactEmail}`} className="font-medium text-blue-600 hover:text-blue-700">
                      {property.builder?.contactEmail}
                    </a>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-600">Phone:</span>
                    <a href={`tel:${property.builder?.phoneNumber}`} className="font-medium text-blue-600 hover:text-blue-700">
                      {property.builder?.phoneNumber}
                    </a>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-600">Website:</span>
                    <a
                      href={property.builder?.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-blue-600 hover:text-blue-700"
                    >
                      {property.builder?.website}
                    </a>
                  </div>
                  
                  {property.builder?.description && (
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {property.builder?.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Visit Form Modal */}
            {showVisitForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900">Schedule Site Visit</h3>
                    <button
                      onClick={() => setShowVisitForm(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  
                  <form onSubmit={handleVisitSubmit} className="space-y-4">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium mb-2 text-gray-700">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        Visit Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="visitDate"
                        value={formData.visitDate}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium mb-2 text-gray-700">
                        <Clock className="w-4 h-4 text-blue-600" />
                        Visit Time <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="time"
                        name="visitTime"
                        value={formData.visitTime}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium mb-2 text-gray-700">
                        <MessageSquare className="w-4 h-4 text-blue-600" />
                        Notes (Optional)
                      </label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        rows="3"
                        placeholder="Any special requests or instructions..."
                      />
                    </div>
                    
                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setShowVisitForm(false)}
                        className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                        disabled={isSubmitting}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:bg-blue-400 font-medium flex items-center gap-2"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Scheduling...
                          </>
                        ) : (
                          <>
                            <Calendar className="w-4 h-4" />
                            Schedule Visit
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Amenities Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Star className="w-6 h-6 text-blue-600" />
            Amenities
          </h2>
          <div className="bg-gray-50 p-6 rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {property.amenities?.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Projects Section */}
        {relatedProjects && relatedProjects.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Building className="w-6 h-6 text-blue-600" />
              Other Projects by Builder
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProjects.map((proj) => (
                <div
                  key={proj._id}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                >
                  {proj.images?.[0]?.url && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={proj.images[0].url}
                        alt={proj.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                      {proj.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <IndianRupee className="w-4 h-4 text-blue-600" />
                      <span className="text-lg font-bold text-blue-600">
                        {proj.price.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 mb-1">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{proj.location}</span>
                    </div>
                    <div className="flex items-center gap-4 text-gray-600 text-sm">
                      <span className="flex items-center gap-1">
                        <Bed className="w-4 h-4" />
                        {proj.bhk} BHK
                      </span>
                      <span className="flex items-center gap-1">
                        <Square className="w-4 h-4" />
                        {proj.carpetArea} sqft
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyPage;