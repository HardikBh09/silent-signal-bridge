
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-muted py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="mt-6 pt-6 border-t border-border text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} SilentCue. All rights reserved.</p>
          <p className="mt-1">Designed to make sound accessible to all.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
