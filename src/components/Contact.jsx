import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const contactItems = [
    {
      icon: Mail,
      color: "text-red-400",
      glowColor: "shadow-red-400/20",
      href: "mailto:atharvsirsalkarr@gmail.com",
      text: "atharvsirsalkarr@gmail.com",
      delay: "delay-100"
    },
    {
      icon: Phone,
      color: "text-green-400",
      glowColor: "shadow-green-400/20",
      href: "tel:+918600355655",
      text: "+91 8600355655",
      delay: "delay-200"
    },
    {
      icon: MapPin,
      color: "text-blue-400",
      glowColor: "shadow-blue-400/20",
      href: null,
      text: "Pune, India",
      delay: "delay-300"
    }
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      color: "text-blue-500",
      glowColor: "hover:shadow-blue-500/30",
      href: "https://linkedin.com/in/yourprofile",
      delay: "delay-500"
    },
    {
      icon: Github,
      color: "text-gray-300",
      glowColor: "hover:shadow-gray-300/30",
      href: "https://github.com/AtharvSirsalkar",
      delay: "delay-700"
    }
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1F1E24] via-[#1F1E24] to-[#2A2832] text-white flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`
        }}
      />
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Title with stagger animation */}
      <div className="relative z-10">
        <h1 className={`text-4xl md:text-5xl font-bold mb-6 text-center transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <span className="inline-block animate-bounce animation-delay-100">G</span>
          <span className="inline-block animate-bounce animation-delay-200">e</span>
          <span className="inline-block animate-bounce animation-delay-300">t</span>
          <span className="inline-block animate-bounce animation-delay-400 mr-4"> </span>
          <span className="inline-block animate-bounce animation-delay-500">i</span>
          <span className="inline-block animate-bounce animation-delay-600">n</span>
          <span className="inline-block animate-bounce animation-delay-700 mr-4"> </span>
          <span className="inline-block animate-bounce animation-delay-800 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">T</span>
          <span className="inline-block animate-bounce animation-delay-900 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">o</span>
          <span className="inline-block animate-bounce animation-delay-1000 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">u</span>
          <span className="inline-block animate-bounce animation-delay-1100 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">c</span>
          <span className="inline-block animate-bounce animation-delay-1200 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">h</span>
        </h1>
      </div>

      {/* Professional Summary with typewriter effect */}
      <div className={`max-w-2xl text-lg text-gray-300 text-center mb-12 leading-relaxed transition-all duration-1000 delay-300 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        <p className="relative">
          I'm a <span className="text-white font-semibold relative">
            Full Stack Developer
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transform scale-x-0 animate-pulse"></span>
          </span><span className="mx-2">specializing in</span>
           <span className="text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text font-semibold">React.js, Next.js, Node.js, Express.js, 
          FastAPI, MongoDB, and SQL</span>.  
          <br />  
          This Movies App is one of my projects built using the free TMDB API, showcasing 
          trending movies & TV shows, trailers, and availability info — all in an ad-free experience.  
          <br />  
          I love building <span className="relative">
            modern, scalable, and user-friendly web applications
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-pulse"></span>
          </span>.
        </p>
      </div>

      {/* Contact Info Section with enhanced animations */}
      <div className="flex flex-col md:flex-row gap-10 mb-10">
        {contactItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div 
              key={index}
              className={`group flex items-center gap-4 p-4 rounded-lg backdrop-blur-sm bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl ${item.glowColor} ${item.delay} ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              <div className="relative">
                <Icon className={`w-6 h-6 ${item.color} group-hover:scale-125 transition-transform duration-300`} />
                <div className={`absolute inset-0 ${item.color} opacity-0 group-hover:opacity-50 blur-lg transition-opacity duration-300`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              {item.href ? (
                <a
                  href={item.href}
                  className="text-lg hover:underline group-hover:text-white transition-colors duration-300 relative"
                >
                  {item.text}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 group-hover:w-full transition-all duration-300"></span>
                </a>
              ) : (
                <p className="text-lg group-hover:text-white transition-colors duration-300">{item.text}</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Social Links with floating animation */}
      <div className="flex gap-6">
        {socialLinks.map((social, index) => {
          const Icon = social.icon;
          return (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative p-3 rounded-full backdrop-blur-sm bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-500 hover:scale-125 hover:rotate-12 ${social.glowColor} hover:shadow-2xl ${social.delay} ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              <Icon className={`w-7 h-7 ${social.color} group-hover:scale-110 transition-transform duration-300`} />
              
              {/* Ripple effect on hover */}
              <div className="absolute inset-0 rounded-full bg-white/10 scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              
              {/* Glow effect */}
              <div className={`absolute inset-0 rounded-full ${social.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`}></div>
            </a>
          );
        })}
      </div>

      {/* Pulsing call-to-action */}
      <div className={`mt-8 transition-all duration-1000 delay-1000 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        <p className="text-sm text-gray-400 animate-pulse">
          Let's build something amazing together! 🚀
        </p>
      </div>
      <div  className={`mt-8 transition-all duration-1000 delay-1000 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}><Link to={'/'}><p className="text-sm text-gray-400 animate-pulse">No thanks..Movies first!</p></Link></div>

      <style jsx>{`
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
            transform: translate3d(0, 0, 0);
          }
          40%, 43% {
            animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
            transform: translate3d(0, -8px, 0);
          }
          70% {
            animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
            transform: translate3d(0, -4px, 0);
          }
          90% {
            transform: translate3d(0, -2px, 0);
          }
        }
        
        .animation-delay-100 { animation-delay: 0.1s; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-300 { animation-delay: 0.3s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-500 { animation-delay: 0.5s; }
        .animation-delay-600 { animation-delay: 0.6s; }
        .animation-delay-700 { animation-delay: 0.7s; }
        .animation-delay-800 { animation-delay: 0.8s; }
        .animation-delay-900 { animation-delay: 0.9s; }
        .animation-delay-1000 { animation-delay: 1.0s; }
        .animation-delay-1100 { animation-delay: 1.1s; }
        .animation-delay-1200 { animation-delay: 1.2s; }
      `}</style>
    </div>
  );
};

export default Contact;