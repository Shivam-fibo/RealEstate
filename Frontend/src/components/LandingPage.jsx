import React, { useState } from 'react';
import { Search, Home, Users, Shield, Star, Phone, Mail, MapPin, Bed, Heart, Camera, Lock, CheckCircle, TrendingUp, Award, MessageCircle, ChevronRight, Menu, X } from 'lucide-react';

const RealEstateLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [budgetRange, setBudgetRange] = useState([1000000, 5000000]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedBHK, setSelectedBHK] = useState('');

  const popularLocations = [
    { id: 1, name: "Gurgaon", price: "₹45L onwards", image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&h=300&fit=crop" },
    { id: 2, name: "Noida", price: "₹35L onwards", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop" },
    { id: 3, name: "Mumbai", price: "₹1.2Cr onwards", image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&h=300&fit=crop" },
    { id: 4, name: "Bangalore", price: "₹50L onwards", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop" },
    { id: 5, name: "Pune", price: "₹40L onwards", image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop" },
    { id: 6, name: "Hyderabad", price: "₹38L onwards", image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop" }
    
    

  ];

  const features = [
    { icon: CheckCircle, title: "Verified Listings", desc: "All properties are verified and RERA approved" },
    { icon: Camera, title: "Virtual Tours", desc: "360° virtual tours and HD photo galleries" },
    { icon: Lock, title: "Secure Platform", desc: "Safe and secure user authentication" },
    { icon: Phone, title: "Direct Agent Contact", desc: "Connect directly with verified agents" },
    { icon: Heart, title: "Save & Shortlist", desc: "Save your favorite properties for later" },
    { icon: TrendingUp, title: "Transparent Pricing", desc: "No hidden costs, clear pricing structure" }
  ];

  const testimonials = [
    { name: "Rajesh Kumar", rating: 5, text: "Found my dream home in Gurgaon within 2 weeks. Excellent service and verified listings!", location: "Gurgaon" },
    { name: "Priya Sharma", rating: 5, text: "As an NRI, I was worried about buying property remotely. This platform made it seamless.", location: "Mumbai" },
    { name: "Amit Patel", rating: 4, text: "Great experience with virtual tours. Saved multiple trips to different cities.", location: "Pune" }
  ];

  const builders = [
    { name: "DLF", logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=120&h=60&fit=crop" },
    { name: "Godrej", logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=120&h=60&fit=crop" },
    { name: "Tata", logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=120&h=60&fit=crop" },
    { name: "Mahindra", logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=120&h=60&fit=crop" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Home className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">RealEsate</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#properties" className="text-gray-700 hover:text-blue-600 transition-colors">Properties</a>
              <a href="#builders" className="text-gray-700 hover:text-blue-600 transition-colors">Builders</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">About</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Login / Sign Up
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 py-4 border-t">
              <div className="flex flex-col space-y-4">
                <a href="#properties" className="text-gray-700 hover:text-blue-600 transition-colors">Properties</a>
                <a href="#builders" className="text-gray-700 hover:text-blue-600 transition-colors">Builders</a>
                <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">About</a>
                <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full">
                  Login / Sign Up
                </button>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div 
          className="relative min-h-screen flex items-center"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&h=1080&fit=crop")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="container mx-auto px-4 py-20">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Find Your Dream Home in Your Budget
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Verified Listings | Virtual Tours | Secure Agent Contact
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold flex items-center justify-center space-x-2 transition-all transform hover:scale-105">
                  <Search className="h-5 w-5" />
                  <span>Start Searching</span>
                </button>
                <button className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold flex items-center justify-center space-x-2 transition-all transform hover:scale-105">
                  <Lock className="h-5 w-5" />
                  <span>Login / Sign Up</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Search Bar */}
      <section className="bg-white shadow-lg -mt-20 relative z-10">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-xl p-6 md:p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Quick Property Search</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>₹10L - ₹50L</option>
                  <option>₹50L - ₹1Cr</option>
                  <option>₹1Cr - ₹2Cr</option>
                  <option>₹2Cr+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City / Locality</label>
                <input 
                  type="text" 
                  placeholder="Enter city or locality"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">BHK</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>1 BHK</option>
                  <option>2 BHK</option>
                  <option>3 BHK</option>
                  <option>4+ BHK</option>
                </select>
              </div>
              <div className="flex items-end">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all">
                  <Search className="h-5 w-5" />
                  <span>Search</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Locations */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Popular Locations</h2>
            <p className="text-xl text-gray-600">Explore properties in top cities across India</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularLocations.map((location) => (
              <div key={location.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
                <div className="relative">
                  <img 
                    src={location.image} 
                    alt={location.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{location.name}</h3>
                    <p className="text-blue-200">{location.price}</p>
                  </div>
                </div>
                <div className="p-6">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2">
                    <span>View Properties</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Your dream home in 3 simple steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                <Search className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Set Budget & Location</h3>
              <p className="text-gray-600">Define your budget range and preferred locations to get personalized property recommendations.</p>
            </div>
            <div className="text-center group">
              <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                <Home className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Explore Properties</h3>
              <p className="text-gray-600">Browse through verified listings with virtual tours, photos, and detailed property information.</p>
            </div>
            <div className="text-center group">
              <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                <Users className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Schedule Visit</h3>
              <p className="text-gray-600">Connect with verified agents to schedule property visits or get expert consultation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Builders */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Trusted Builders</h2>
            <p className="text-xl text-gray-600">RERA approved projects from India's leading builders</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            {builders.map((builder, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow flex items-center justify-center">
                <img src={builder.logo} alt={builder.name} className="max-h-12 w-auto opacity-60 hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-lg mb-4">
              <Shield className="h-5 w-5" />
              <span className="font-semibold">RERA Approved</span>
            </div>
            <p className="text-gray-600 mb-6">All projects are verified and RERA compliant for your security</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              View Builder Projects
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
            <p className="text-xl text-gray-600">Experience the best in real estate with our premium features</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:bg-blue-50 transition-colors group">
                <div className="bg-blue-100 rounded-lg w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-300">Real stories from satisfied homebuyers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-colors">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold">{testimonial.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-gray-400 text-sm">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center mx-auto space-x-2">
              <MessageCircle className="h-5 w-5" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Stay Updated</h2>
            <p className="text-xl text-blue-100 mb-8">Get weekly updates on new properties and market trends</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
              />
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Home className="h-8 w-8 text-blue-400" />
                <span className="text-2xl font-bold">DreamHome</span>
              </div>
              <p className="text-gray-400 mb-4">Your trusted partner in finding the perfect home. Quality listings, verified agents, and seamless experience.</p>
              <div className="flex space-x-4">
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                  <Phone className="h-4 w-4" />
                  <span>Call Us</span>
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                  <MessageCircle className="h-4 w-4" />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Properties</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Builders</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">RERA Compliance</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Refund Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>+91 9876543210</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>support@dreamhome.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Mumbai, India</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 DreamHome. All rights reserved. | Agent/Builder Login</p>
          </div>
        </div>
      </footer>

      {/* Floating CTA */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
          <Search className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default RealEstateLanding;