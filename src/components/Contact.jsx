import { useEffect, useState, useRef } from "react";

export default function Contact() {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    reservationType: "dine-in"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const observerRef = useRef();
  const [visibleSections, setVisibleSections] = useState(new Set());

  useEffect(() => {
    setTimeout(() => setVisible(true), 200);

    // SEO optimization
    document.title = "Contact Us - The BBQ Place | Reservations & Info";
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = "Contact The BBQ Place for reservations, catering, or questions. Call us, visit our location, or send us a message. We're here to serve you!";

    // Intersection Observer for sections
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set(prev).add(entry.target.dataset.section));
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    return () => {
      observerRef.current?.disconnect();
      document.title = "The BBQ Place";
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log('Input change:', name, value); // Debug log
    setFormData(prev => ({
      ...prev,
      [name]: value
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
        message: "",
        reservationType: "dine-in"
      });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      id: "phone",
      title: "Call Us",
      info: "+94 123 456 78",
      subInfo: "Mon-Sun: 11AM - 10PM",
      action: "tel:+9412345678"
    },
    {
      id: "location",
      
      title: "Visit Us",
      info: "123 Smokehouse Lane",
      subInfo: "The BBQ Place, Colombo 10",
      action: "https://maps.google.com"
    },
    {
      id: "email",
     
      title: "Email Us",
      info: "hello@bbq.com",
      subInfo: "We'll reply within 24hrs",
      action: "mailto:hello@bbq.com"
    },
    {
      id: "hours",
      
      title: "Hours",
      info: "11AM - 10PM Daily",
      subInfo: "Kitchen closes at 9:30PM",
      action: null
    }
  ];

  const AnimatedSection = ({ children, sectionId, className = "", delay = 0 }) => {
    const sectionRef = useRef();
    const isVisible = visibleSections.has(sectionId);

    useEffect(() => {
      const currentSection = sectionRef.current;
      if (currentSection && observerRef.current) {
        currentSection.dataset.section = sectionId;
        observerRef.current.observe(currentSection);
      }
      return () => {
        if (currentSection && observerRef.current) {
          observerRef.current.unobserve(currentSection);
        }
      };
    }, [sectionId]);

    return (
      <div
        ref={sectionRef}
        className={`transition-all duration-1000 transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        } ${className}`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {children}
      </div>
    );
  };

  return (
    <section id="contact" className="pt-8 pb-20 bg-gradient-to-b from-amber-50 via-white to-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h1 className="text-4xl md:text-6xl font-righteous text-gray-800 mb-4">
            Get In <span className="text-amber-600">Touch</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-kalam">
            Ready for some smoky goodness? We'd love to hear from you! 
            Whether it's reservations, catering, or just saying hello - reach out anytime.
          </p>
        </div>

        {/* Contact Info Cards */}
        <AnimatedSection sectionId="contact-info" delay={300}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((item, index) => (
              <div
                key={item.id}
                className="group bg-white rounded-xl shadow-lg p-4 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-amber-100"
                style={{
                  animationDelay: `${index * 150}ms`
                }}
              >
                
                <h3 className="font-righteous text-lg text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-amber-600 font-semibold mb-1">
                  {item.info}
                </p>
                <p className="text-gray-500 text-sm font-kalam">
                  {item.subInfo}
                </p>
                {item.action && (
                  <a
                    href={item.action}
                    className="mt-4 inline-block text-amber-600 hover:text-amber-700 font-semibold text-sm transition-colors"
                  >
                    {item.id === 'phone' ? 'Call Now' : item.id === 'email' ? 'Send Email' : 'Get Directions'} →
                  </a>
                )}
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Main Contact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form - Simplified */}
          <div className="mb-12">
            <div style={{ 
              backgroundColor: 'white', 
              padding: '2rem', 
              borderRadius: '1rem', 
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
              position: 'relative',
              zIndex: 9999
            }}>
              <h2 className="text-3xl font-righteous text-gray-800 mb-6">
                Send Us a Message
              </h2>
              
              <form onSubmit={handleSubmit} style={{ pointerEvents: 'all' }}>
                {/* Name and Email Row */}
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
                      placeholder="Your name"
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        border: '2px solid #d1d5db',
                        borderRadius: '0.5rem',
                        fontSize: '1rem',
                        backgroundColor: 'white',
                        outline: 'none',
                        zIndex: 10000,
                        position: 'relative'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#f59e0b'}
                      onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    />
                  </div>
                  <div>
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
                        outline: 'none',
                        zIndex: 10000,
                        position: 'relative'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#f59e0b'}
                      onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    />
                  </div>
                </div>

                {/* Phone and Type Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#374151' }}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+94 123 456 78"
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        border: '2px solid #d1d5db',
                        borderRadius: '0.5rem',
                        fontSize: '1rem',
                        backgroundColor: 'white',
                        outline: 'none',
                        zIndex: 10000,
                        position: 'relative'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#f59e0b'}
                      onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#374151' }}>
                      Inquiry Type
                    </label>
                    <select
                      name="reservationType"
                      value={formData.reservationType}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        border: '2px solid #d1d5db',
                        borderRadius: '0.5rem',
                        fontSize: '1rem',
                        backgroundColor: 'white',
                        outline: 'none',
                        cursor: 'pointer',
                        zIndex: 10000,
                        position: 'relative'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#f59e0b'}
                      onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    >
                      <option value="dine-in">Dine-In Reservation</option>
                      <option value="takeout">Takeout Order</option>
                      <option value="catering">Catering Service</option>
                      <option value="private-event">Private Event</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#374151' }}>
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    placeholder="Tell us about your inquiry, special requests, or how we can help you..."
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      border: '2px solid #d1d5db',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      backgroundColor: 'white',
                      outline: 'none',
                      resize: 'vertical',
                      zIndex: 10000,
                      position: 'relative'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#f59e0b'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  ></textarea>
                </div>

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
                    marginBottom: '1rem',
                    zIndex: 10000,
                    position: 'relative'
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
                  {isSubmitting ? "Sending Message..." : "Send Message 🔥"}
                </button>

                {/* Status Messages */}
                {submitStatus === "success" && (
                  <div style={{
                    padding: '1rem',
                    backgroundColor: '#ecfdf5',
                    border: '1px solid #a7f3d0',
                    borderRadius: '0.5rem',
                    color: '#065f46',
                    marginBottom: '1rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span style={{ marginRight: '0.5rem' }}>✅</span>
                      <strong>Message sent successfully!</strong>
                    </div>
                    <p style={{ fontSize: '0.875rem', margin: 0 }}>We'll get back to you within 24 hours.</p>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div style={{
                    padding: '1rem',
                    backgroundColor: '#fef2f2',
                    border: '1px solid #fecaca',
                    borderRadius: '0.5rem',
                    color: '#991b1b',
                    marginBottom: '1rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span style={{ marginRight: '0.5rem' }}>❌</span>
                      <strong>Something went wrong.</strong>
                    </div>
                    <p style={{ fontSize: '0.875rem', margin: 0 }}>Please try again or call us directly.</p>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Map & Location Info */}
          <AnimatedSection sectionId="location-info" delay={900}>
            <div className="space-y-8">
              {/* Map Placeholder */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-amber-100">
                <div className="h-64 bg-gradient-to-br from-amber-100 to-red-100 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">📍</div>
                      <h3 className="text-xl font-righteous text-gray-800 mb-2">
                        Visit Our Location
                      </h3>
                      <p className="text-gray-600 font-kalam">
                        123 Smokehouse Lane<br />
                        The BBQ Place, Colombo 10
                      </p>
                      <button className="mt-4 bg-amber-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-amber-700 transition-colors">
                        Get Directions
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-100">
                <h3 className="text-2xl font-righteous text-gray-800 mb-6">
                  Why Choose Us?
                </h3>
                <div className="space-y-4">
                  {[
                    { icon: "🏆", title: "Award-Winning BBQ", desc: "Recognized as Best BBQ in Texas 3 years running" },
                    { icon: "🥩", title: "Premium Quality", desc: "Only the finest cuts of meat, locally sourced" },
                    { icon: "👨‍🍳", title: "Master Pitmasters", desc: "Over 20 years of BBQ expertise and passion" },
                    { icon: "🎉", title: "Perfect for Events", desc: "Catering available for any occasion" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">{item.title}</h4>
                        <p className="text-gray-600 text-sm font-kalam">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              
            </div>
          </AnimatedSection>
        </div>

        {/* Bottom CTA */}
        <AnimatedSection sectionId="bottom-cta" delay={1200}>
          <div className="text-center mt-16">
            <div className="bg-gray-800 text-white p-8 rounded-2xl shadow-2xl">
              <h3 className="text-3xl font-righteous mb-4">
                Follow Us for BBQ Updates!
              </h3>
              <p className="mb-6 font-kalam text-lg">
                Stay connected for daily specials, events, and mouth-watering content!
              </p>
              <div className="flex justify-center space-x-6">
                {[
                  { 
                    name: "Facebook", 
                    icon: "f", 
                    url: "https://facebook.com/thebbqplace",
                    bgColor: "bg-blue-600 hover:bg-blue-700"
                  },
                  { 
                    name: "Instagram", 
                    icon: "📷", 
                    url: "https://instagram.com/thebbqplace",
                    bgColor: "bg-pink-600 hover:bg-pink-700"
                  },
                  { 
                    name: "Twitter", 
                    icon: "𝕏", 
                    url: "https://twitter.com/thebbqplace",
                    bgColor: "bg-black hover:bg-gray-800"
                  },
                  { 
                    name: "TikTok", 
                    icon: "♪", 
                    url: "https://tiktok.com/@thebbqplace",
                    bgColor: "bg-black hover:bg-gray-800"
                  }
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${social.bgColor} text-white p-4 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl`}
                    title={`Follow us on ${social.name}`}
                  >
                    <span className="text-xl font-bold block w-6 h-6 flex items-center justify-center">
                      {social.icon}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}