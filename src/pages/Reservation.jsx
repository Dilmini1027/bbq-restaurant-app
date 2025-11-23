import { useEffect, useState } from "react";

export default function Reservation() {
  const [visible, setVisible] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    type: "",
    specialRequests: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    billingName: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  useEffect(() => {
    setTimeout(() => setVisible(true), 200);

    // SEO optimization
    document.title = "Reservations - The BBQ Place | Book Your Table";
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = "Reserve your table at The BBQ Place. Perfect for couples, families, and groups. Book online for the best BBQ experience in Texas.";

    return () => {
      document.title = "The BBQ Place";
    };
  }, []);

  const reservationTypes = [
    {
      id: "couple",
      title: "Romantic Dinner",
      subtitle: "Perfect for Couples",
      guests: "2 persons",
      price: "No booking fee",
      image: "./35 Romantic Dinner Recipes for Two that are Perfect for Date Night _ Two Drifters.jpeg",
      features: ["Intimate seating", "Candlelit ambiance", "Priority service", "Complimentary dessert"]
     
    },
    {
      id: "single",
      title: "Solo Dining",
      subtitle: "Enjoy Your Own Company",
      guests: "1 person",
      price: "No booking fee",
      image: "./Dinner pic.jpeg",
      features: ["Counter seating available", "Quick service", "WiFi access", "Newspaper/magazines"]
      
    },
    {
      id: "family",
      title: "Family Feast",
      subtitle: "Small Groups & Families",
      guests: "3-9 persons",
      price: "No booking fee",
      image: "./Family Meal Hour.jpeg",
      features: ["Family-style seating", "Kids menu available", "High chairs provided", "Group discounts"]
      
    },
    {
      id: "medium-group",
      title: "Medium Party",
      subtitle: "Medium Groups",
      guests: "10-15 persons",
      price: "Rs.10000 booking fee",
      image: "./A Valentine's Supper with FEED - New Darlings.jpeg",
      features: ["Private section", "Dedicated server", "Group menu options", "Birthday cake service"]
      
    },
    {
      id: "large-group",
      title: "Large Party",
      subtitle: "Big Celebrations",
      guests: "20-30 persons",
      price: "Rs.15000 booking fee",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop",
      features: ["Private dining room", "Customized menu", "Event coordinator", "Audio system available"]
     
    },
    {
      id: "corporate",
      title: "Corporate Events",
      subtitle: "Business Gatherings",
      guests: "15+ persons",
      price: "Rs.20000 booking fee",
      image: "./download (2).jpeg",
      features: ["Private meeting space", "A/V equipment", "Business lunch menu", "WiFi & charging ports"]
      
    }
  ];

  const timeSlots = [
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
    "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
    "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM",
    "7:00 PM", "7:30 PM", "8:00 PM"
  ];

  const requiresBookingFee = (typeId) => {
    return ['medium-group', 'large-group', 'corporate'].includes(typeId);
  };

  const getBookingFee = (typeId) => {
    switch(typeId) {
      case 'medium-group': return 10000;
      case 'large-group': return 15000;
      case 'corporate': return 20000;
      default: return 0;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type.id);
    setFormData(prev => ({
      ...prev,
      type: type.id,
      guests: type.guests
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("");

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        guests: "",
        type: "",
        specialRequests: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        billingName: ""
      });
      setSelectedType("");
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <video
          src="/vedio.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute w-full h-full object-cover"
        >
          <source src="/vedio.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute inset-0 bg-black/50"></div>

        <div
          className={`relative z-20 text-center text-white flex flex-col justify-center h-full px-4 transition-all duration-1000 
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-righteous text-white mb-6 leading-tight">
              Reserve Your <span className="text-amber-400">Table</span>
            </h1>
            <p className="text-xl md:text-2xl font-kalam mb-8 max-w-2xl mx-auto">
              Whether it's an intimate dinner for two or a celebration for thirty, 
              we'll make your BBQ experience unforgettable.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-amber-300">
              <span className="flex items-center gap-2 bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm">
                <span>🔥</span> Authentic BBQ
              </span>
              <span className="flex items-center gap-2 bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm">
                <span>🎵</span> Live Music
              </span>
              <span className="flex items-center gap-2 bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm">
                <span>🍺</span> Craft Drinks
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Reservation Types Section */}
      <section className="py-20 bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className={`text-center mb-16 transition-all duration-1000 delay-300
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h2 className="text-4xl md:text-5xl font-righteous text-gray-800 mb-6">
              Choose Your <span className="text-amber-600">Experience</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto font-kalam">
              From intimate dinners to grand celebrations, we have the perfect setup for every occasion.
            </p>
          </div>

          {/* Reservation Type Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {reservationTypes.map((type, index) => (
              <div
                key={type.id}
                className={`group cursor-pointer transition-all duration-500 transform hover:-translate-y-2 ${
                  selectedType === type.id ? 'ring-4 ring-amber-400' : ''
                } ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${600 + index * 100}ms` }}
                onClick={() => handleTypeSelect(type)}
              >
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl border border-amber-100">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={type.image}
                      alt={type.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full font-semibold text-sm">
                      {type.price}
                    </div>
                    <div className="absolute bottom-4 right-4 text-4xl">
                      {type.icon}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-righteous text-gray-800 mb-2">
                      {type.title}
                    </h3>
                    <p className="text-amber-600 font-semibold mb-2">{type.subtitle}</p>
                    <p className="text-gray-600 mb-4 font-kalam">{type.guests}</p>
                    
                    {/* Features */}
                    <ul className="space-y-1 mb-6">
                      {type.features.map((feature, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-center">
                          <span className="text-amber-500 mr-2">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <button
                      className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                        selectedType === type.id
                          ? 'bg-amber-600 text-white'
                          : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                      }`}
                    >
                      {selectedType === type.id ? 'Selected ✓' : 'Select This Option'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Reservation Form */}
          {selectedType && (
            <div
              className={`max-w-2xl mx-auto transition-all duration-1000
              ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <div style={{ 
                backgroundColor: 'white', 
                padding: '2rem', 
                borderRadius: '1rem', 
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                border: '2px solid #f59e0b'
              }}>
                <h3 className="text-2xl font-righteous text-gray-800 mb-6 text-center">
                  Complete Your Reservation
                </h3>
                
                <form onSubmit={handleSubmit}>
                  {/* Personal Info */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#374151' }}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Your full name"
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          border: '2px solid #d1d5db',
                          borderRadius: '0.5rem',
                          fontSize: '1rem',
                          backgroundColor: 'white',
                          outline: 'none'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#f59e0b'}
                        onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#374151' }}>
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="(555) 123-4567"
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          border: '2px solid #d1d5db',
                          borderRadius: '0.5rem',
                          fontSize: '1rem',
                          backgroundColor: 'white',
                          outline: 'none'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#f59e0b'}
                        onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#374151' }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="your@email.com"
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        border: '2px solid #d1d5db',
                        borderRadius: '0.5rem',
                        fontSize: '1rem',
                        backgroundColor: 'white',
                        outline: 'none'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#f59e0b'}
                      onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    />
                  </div>

                  {/* Date and Time */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#374151' }}>
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                        min={new Date().toISOString().split('T')[0]}
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          border: '2px solid #d1d5db',
                          borderRadius: '0.5rem',
                          fontSize: '1rem',
                          backgroundColor: 'white',
                          outline: 'none'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#f59e0b'}
                        onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#374151' }}>
                        Preferred Time *
                      </label>
                      <select
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          border: '2px solid #d1d5db',
                          borderRadius: '0.5rem',
                          fontSize: '1rem',
                          backgroundColor: 'white',
                          outline: 'none',
                          cursor: 'pointer'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#f59e0b'}
                        onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                      >
                        <option value="">Select time</option>
                        {timeSlots.map(slot => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#374151' }}>
                      Special Requests or Dietary Requirements
                    </label>
                    <textarea
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleInputChange}
                      rows="4"
                      placeholder="Birthday celebration, anniversary, dietary restrictions, accessibility needs, etc."
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        border: '2px solid #d1d5db',
                        borderRadius: '0.5rem',
                        fontSize: '1rem',
                        backgroundColor: 'white',
                        outline: 'none',
                        resize: 'vertical'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#f59e0b'}
                      onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    ></textarea>
                  </div>

                  {/* Payment Section - Only for booking fee required types */}
                  {requiresBookingFee(selectedType) && (
                    <div style={{ 
                      marginBottom: '2rem',
                      padding: '1.5rem',
                      backgroundColor: '#fef7e7',
                      border: '2px solid #f59e0b',
                      borderRadius: '0.75rem'
                    }}>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        marginBottom: '1rem',
                        color: '#92400e'
                      }}>
                        <span style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}>💳</span>
                        <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: 0 }}>
                          Booking Fee Required: Rs.{getBookingFee(selectedType)}
                        </h4>
                      </div>
                      
                      <p style={{ 
                        color: '#92400e', 
                        fontSize: '0.9rem', 
                        marginBottom: '1.5rem',
                        margin: '0 0 1.5rem 0'
                      }}>
                        A booking fee is required to secure your reservation. This fee will be applied to your final bill.
                      </p>

                      {/* Billing Name */}
                      <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#374151' }}>
                          Billing Name *
                        </label>
                        <input
                          type="text"
                          name="billingName"
                          value={formData.billingName}
                          onChange={handleInputChange}
                          required={requiresBookingFee(selectedType)}
                          placeholder="Name on card"
                          style={{
                            width: '100%',
                            padding: '0.75rem 1rem',
                            border: '2px solid #d1d5db',
                            borderRadius: '0.5rem',
                            fontSize: '1rem',
                            backgroundColor: 'white',
                            outline: 'none'
                          }}
                          onFocus={(e) => e.target.style.borderColor = '#f59e0b'}
                          onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                        />
                      </div>

                      {/* Card Number */}
                      <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#374151' }}>
                          Card Number *
                        </label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          required={requiresBookingFee(selectedType)}
                          placeholder="1234 5678 9012 3456"
                          maxLength="19"
                          style={{
                            width: '100%',
                            padding: '0.75rem 1rem',
                            border: '2px solid #d1d5db',
                            borderRadius: '0.5rem',
                            fontSize: '1rem',
                            backgroundColor: 'white',
                            outline: 'none'
                          }}
                          onFocus={(e) => e.target.style.borderColor = '#f59e0b'}
                          onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                          onInput={(e) => {
                            // Format card number with spaces
                            let value = e.target.value.replace(/\s/g, '').replace(/\D/g, '');
                            value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
                            e.target.value = value;
                            handleInputChange(e);
                          }}
                        />
                      </div>

                      {/* Expiry and CVV */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                        <div>
                          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#374151' }}>
                            Expiry Date *
                          </label>
                          <input
                            type="text"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            required={requiresBookingFee(selectedType)}
                            placeholder="MM/YY"
                            maxLength="5"
                            style={{
                              width: '100%',
                              padding: '0.75rem 1rem',
                              border: '2px solid #d1d5db',
                              borderRadius: '0.5rem',
                              fontSize: '1rem',
                              backgroundColor: 'white',
                              outline: 'none'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#f59e0b'}
                            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                            onInput={(e) => {
                              // Format MM/YY
                              let value = e.target.value.replace(/\D/g, '');
                              if (value.length >= 2) {
                                value = value.substring(0, 2) + '/' + value.substring(2, 4);
                              }
                              e.target.value = value;
                              handleInputChange(e);
                            }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#374151' }}>
                            CVV *
                          </label>
                          <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            required={requiresBookingFee(selectedType)}
                            placeholder="123"
                            maxLength="4"
                            style={{
                              width: '100%',
                              padding: '0.75rem 1rem',
                              border: '2px solid #d1d5db',
                              borderRadius: '0.5rem',
                              fontSize: '1rem',
                              backgroundColor: 'white',
                              outline: 'none'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#f59e0b'}
                            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                            onInput={(e) => {
                              // Only numbers
                              e.target.value = e.target.value.replace(/\D/g, '');
                              handleInputChange(e);
                            }}
                          />
                        </div>
                      </div>

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0.75rem',
                        backgroundColor: '#ecfdf5',
                        border: '1px solid #a7f3d0',
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                        color: '#065f46'
                      }}>
                        <span style={{ marginRight: '0.5rem' }}>🔒</span>
                        Your payment information is secure and encrypted
                      </div>
                    </div>
                  )}

                  {/* No Payment Required Message */}
                  {!requiresBookingFee(selectedType) && selectedType && (
                    <div style={{
                      marginBottom: '1.5rem',
                      padding: '1rem',
                      backgroundColor: '#ecfdf5',
                      border: '1px solid #a7f3d0',
                      borderRadius: '0.5rem',
                      textAlign: 'center'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5rem' }}>
                        <span style={{ marginRight: '0.5rem', fontSize: '1.5rem' }}>🎉</span>
                        <strong style={{ color: '#065f46' }}>No Booking Fee Required!</strong>
                      </div>
                      <p style={{ fontSize: '0.875rem', margin: 0, color: '#065f46' }} className="font-kalam">
                        This reservation type doesn't require an advance payment
                      </p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      width: '100%',
                      padding: '1rem 1.5rem',
                      backgroundColor: isSubmitting ? '#9ca3af' : '#f59e0b',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.5rem',
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      transition: 'all 0.3s ease',
                      marginBottom: '1rem'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSubmitting) {
                        e.target.style.backgroundColor = '#d97706';
                        e.target.style.transform = 'translateY(-2px)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSubmitting) {
                        e.target.style.backgroundColor = '#f59e0b';
                        e.target.style.transform = 'translateY(0)';
                      }
                    }}
                  >
                    {isSubmitting ? "Processing Reservation..." : "Confirm Reservation 🎉"}
                  </button>

                  {/* Status Messages */}
                  {submitStatus === "success" && (
                    <div style={{
                      padding: '1rem',
                      backgroundColor: '#ecfdf5',
                      border: '1px solid #a7f3d0',
                      borderRadius: '0.5rem',
                      color: '#065f46',
                      textAlign: 'center'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5rem' }}>
                        <span style={{ marginRight: '0.5rem', fontSize: '1.5rem' }}>🎉</span>
                        <strong>Reservation Confirmed!</strong>
                      </div>
                      <p style={{ fontSize: '0.875rem', margin: 0 }} className="font-kalam">
                        We'll call you within 1 hour to confirm details. Can't wait to serve you!
                      </p>
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div style={{
                      padding: '1rem',
                      backgroundColor: '#fef2f2',
                      border: '1px solid #fecaca',
                      borderRadius: '0.5rem',
                      color: '#991b1b',
                      textAlign: 'center'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5rem' }}>
                        <span style={{ marginRight: '0.5rem' }}>❌</span>
                        <strong>Reservation Failed</strong>
                      </div>
                      <p style={{ fontSize: '0.875rem', margin: 0 }} className="font-kalam">
                        Please try again or call us at (555) 123-BBQ-1
                      </p>
                    </div>
                  )}
                </form>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}