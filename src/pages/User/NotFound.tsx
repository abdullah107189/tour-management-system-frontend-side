import React, { useState } from "react";
import { Link } from "react-router";

const NotFound: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-card to-primary-foreground text-popover font-sans p-5 box-border">
      <div className="text-center max-w-2xl w-full animate-fade-in">
        {/* Custom 404 Illustration */}

        <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold mb-5 text-shadow-lg">
          404
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-8 leading-relaxed opacity-90">
          Oops! The page you're looking for doesn't exist or has moved.
          <br />
          Let's get you back on track.
        </p>
        <Link
          to="/"
          className={`inline-block px-6 py-3 bg-popover/20 text-popover no-underline rounded-full text-lg font-bold border-2 border-popover/30 transition-all duration-300 backdrop-blur-sm ${
            isHovered ? "bg-popover/30 -translate-y-0.5" : "bg-popover/20"
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
