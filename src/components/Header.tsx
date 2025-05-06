
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, Clock, MoveLeft } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const navigation = [
    { name: 'الجدول', href: '/', icon: Calendar },
    { name: 'التمارين', href: '/exercises', icon: MoveLeft },
    { name: 'العداد الزمني', href: '/timer', icon: Clock },
  ];

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <header className="border-b border-ballet-pink/30 bg-white/60 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="font-playfair text-2xl font-bold text-ballet-purple">
              <span className="text-ballet-dark">أرابيسك</span> فلو
            </Link>
          </div>

          {/* قائمة سطح المكتب */}
          <nav className="hidden md:flex md:space-x-8 md:space-x-reverse">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center space-x-2 space-x-reverse px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  location.pathname === item.href
                    ? "bg-ballet-pink/20 text-ballet-purple"
                    : "text-gray-600 hover:bg-ballet-pink/10 hover:text-ballet-purple"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* زر القائمة للجوال */}
          <div className="flex md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="text-gray-600"
            >
              <span className="sr-only">فتح القائمة</span>
              <svg 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </Button>
          </div>
        </div>

        {/* القائمة المنسدلة للجوال */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 animate-fade-in">
            <div className="rounded-md bg-white/90 shadow-md">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center space-x-3 space-x-reverse px-4 py-3 text-sm font-medium",
                    location.pathname === item.href
                      ? "bg-ballet-pink/20 text-ballet-purple"
                      : "text-gray-600 hover:bg-ballet-pink/10"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
