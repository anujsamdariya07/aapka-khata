import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Wallet, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Pricing", href: "#pricing" },
    { name: "Testimonials", href: "#testimonials" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-medium group-hover:shadow-elevated transition-shadow duration-300">
              <Wallet className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-serif font-bold text-xl tracking-tight text-foreground">
              Aapka Khata
            </span>
          </Link>

          {/* Desktop Navigation */}
          {isLandingPage && (
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground font-medium text-sm transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary hover:after:w-full after:transition-all after:duration-300"
                >
                  {link.name}
                </a>
              ))}
            </div>
          )}

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-muted-foreground hover:text-foreground"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </Button>

            <Link to="/signin">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft hover:shadow-medium transition-all duration-300 px-6">
                Get Started Free
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-muted-foreground hover:text-foreground"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </Button>
            <button
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-out ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container mx-auto px-4 pb-6 space-y-4">
          {isLandingPage &&
            navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block py-2 text-muted-foreground hover:text-foreground font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          <div className="pt-4 space-y-3 border-t border-border">
            <Link to="/signin" onClick={() => setIsMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-center">
                Sign In
              </Button>
            </Link>
            <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full justify-center bg-primary text-primary-foreground">
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
