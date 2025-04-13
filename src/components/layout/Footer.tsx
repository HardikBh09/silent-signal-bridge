
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-muted py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="text-lg font-semibold gradient-text">
              SilentSignal
            </Link>
            <p className="text-sm text-muted-foreground mt-1">
              Smart sound detection for the deaf community
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-primary">
              Home
            </Link>
            <Link to="/detection" className="text-muted-foreground hover:text-primary">
              Detection
            </Link>
            <Link to="/history" className="text-muted-foreground hover:text-primary">
              History
            </Link>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-border text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} SilentSignal. All rights reserved.</p>
          <p className="mt-1">Designed to make sound accessible to all.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
