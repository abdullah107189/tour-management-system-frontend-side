const Button = ({
  className = "",
  variant = "default",
  size = "default",
  children,
  ...props
}) => {
  return (
    <button
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
        ${
          variant === "default"
            ? "bg-primary text-primary-foreground shadow-lg"
            : ""
        }
        ${size === "lg" ? "h-12 px-8 text-base" : "h-10 px-5"}
        ${className || ""}`}
      {...props}
    >
      {children}
    </button>
  );
};

// --- Modern Hero Section Component ---
const HeroSection = () => {
  return (
    <section
      className="relative w-full h-screen flex items-center justify-center text-center overflow-hidden"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1542051841814-99884e927163?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")', // Example image
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Content */}
      <div className="relative z-10 max-w-4xl px-6 py-12 animate-fade-in-up">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6 drop-shadow-lg">
          Your Next Great Adventure Awaits
        </h1>
        <p className="text-lg md:text-xl font-light mb-10 max-w-2xl mx-auto drop-shadow-md">
          Embark on a journey to discover breathtaking landscapes, vibrant
          cultures, and unforgettable moments.
        </p>
        <Button
          size="lg"
          className=" font-semibold py-3 px-8 rounded-full shadow-2xl transform transition-all duration-300 hover:scale-105 active:scale-95"
          onClick={() => console.log("Explore button clicked!")}
        >
          Explore Destinations
        </Button>
      </div>

      {/* Optional: Subtle animation overlay (for a more dynamic feel) */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-0 w-full h-full animate-pulse-bg"
          style={{
            backgroundImage:
              "radial-gradient(circle at 10% 20%, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 70%)",
          }}
        ></div>
        <div
          className="absolute bottom-0 right-0 w-full h-full animate-pulse-bg delay-500"
          style={{
            backgroundImage:
              "radial-gradient(circle at 90% 80%, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 70%)",
          }}
        ></div>
      </div>

      {/* Add global styles for animations (if not already in your global CSS) */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseBg {
          0% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.1); opacity: 0.05; }
          100% { transform: scale(1); opacity: 0.1; }
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
        }
        .animate-pulse-bg {
          animation: pulseBg 8s infinite alternate ease-in-out;
        }
      `,
        }}
      />
    </section>
  );
};

export default HeroSection;
