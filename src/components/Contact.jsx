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

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const contactItems = [
    {
      icon: Mail,
      color: "text-red-400",
      glowColor: "shadow-red-400/20",
      href: "mailto:atharvsirsalkarr@gmail.com",
      text: "atharvsirsalkarr@gmail.com",
      delay: "delay-100",
    },
    {
      icon: Phone,
      color: "text-green-400",
      glowColor: "shadow-green-400/20",
      href: "tel:+918600355655",
      text: "+91 8600355655",
      delay: "delay-200",
    },
    {
      icon: MapPin,
      color: "text-blue-400",
      glowColor: "shadow-blue-400/20",
      href: null,
      text: "Pune, India",
      delay: "delay-300",
    },
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      color: "text-blue-500",
      glowColor: "hover:shadow-blue-500/30",
      href: "https://linkedin.com/in/yourprofile",
      delay: "delay-500",
    },
    {
      icon: Github,
      color: "text-gray-300",
      glowColor: "hover:shadow-gray-300/30",
      href: "https://github.com/AtharvSirsalkar",
      delay: "delay-700",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1F1E24] via-[#1F1E24] to-[#2A2832] text-white flex flex-col items-center justify-center px-4 sm:px-6 md:px-10 lg:px-16 py-10 sm:py-12 relative overflow-hidden">
      {/* Animated Background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)`,
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
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Title */}
      <div className="relative z-10 text-center px-2">
        <h1
          className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 transition-all duration-1000 transform ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          <span className="inline-block animate-bounce animation-delay-100">
            G
          </span>
          <span className="inline-block animate-bounce animation-delay-200">
            e
          </span>
          <span className="inline-block animate-bounce animation-delay-300">
            t
          </span>
          <span className="inline-block animate-bounce animation-delay-400 mr-2">
            {" "}
          </span>
          <span className="inline-block animate-bounce animation-delay-500">
            i
          </span>
          <span className="inline-block animate-bounce animation-delay-600">
            n
          </span>
          <span className="inline-block animate-bounce animation-delay-700 mr-2">
            {" "}
          </span>
          <span className="inline-block animate-bounce animation-delay-800 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            T
          </span>
          <span className="inline-block animate-bounce animation-delay-900 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            o
          </span>
          <span className="inline-block animate-bounce animation-delay-1000 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            u
          </span>
          <span className="inline-block animate-bounce animation-delay-1100 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            c
          </span>
          <span className="inline-block animate-bounce animation-delay-1200 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            h
          </span>
        </h1>
      </div>

      {/* Summary */}
      <div
        className={`max-w-3xl text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 text-center mb-12 leading-relaxed px-2 transition-all duration-1000 delay-300 transform ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-10 opacity-0"
        }`}
      >
        <p>
          I'm a{" "}
          <span className="text-white font-semibold">Full Stack Developer</span>{" "}
          specializing in{" "}
          <span className="text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text font-semibold">
            React.js, Next.js, Node.js, Express.js, FastAPI, MongoDB & SQL
          </span>
          . <br />
          This Movies App is built using the free TMDB API — trending titles,
          trailers & cast info, all in an ad-free experience. <br />
          I love building{" "}
          <span className="relative">
            modern, scalable, and user-friendly apps
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-pulse"></span>
          </span>
          .
        </p>
      </div>

      {/* Contact Info */}
      <div className="flex flex-col md:flex-row flex-wrap gap-6 md:gap-10 mb-10 justify-center w-full px-2">
        {contactItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className={`group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 md:p-5 rounded-lg backdrop-blur-sm bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl ${item.glowColor} ${item.delay} ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <Icon
                className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 ${item.color} group-hover:scale-125 transition-transform duration-300`}
              />
              {item.href ? (
                <a
                  href={item.href}
                  className="text-sm sm:text-base md:text-lg hover:underline group-hover:text-white transition-colors duration-300"
                >
                  {item.text}
                </a>
              ) : (
                <p className="text-sm sm:text-base md:text-lg group-hover:text-white transition-colors duration-300">
                  {item.text}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Social Links */}
      <div className="flex gap-4 sm:gap-6 mb-8 flex-wrap justify-center">
        {socialLinks.map((social, index) => {
          const Icon = social.icon;
          return (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative p-2 sm:p-3 rounded-full backdrop-blur-sm bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-500 hover:scale-125 hover:rotate-12 ${social.glowColor} hover:shadow-2xl ${social.delay} ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <Icon className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 ${social.color}`} />
            </a>
          );
        })}
      </div>

      {/* CTA */}
      <div
        className={`text-center transition-all duration-1000 delay-1000 transform ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-10 opacity-0"
        }`}
      >
        <p className="text-xs sm:text-sm md:text-base text-gray-400 animate-pulse">
          Let's build something amazing together! 🚀
        </p>
        <Link to="/" className="block mt-3">
          <p className="text-xs sm:text-sm md:text-base text-gray-400 animate-pulse">
            No thanks.. Movies first!
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Contact;
