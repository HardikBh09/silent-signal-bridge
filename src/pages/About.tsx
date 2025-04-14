import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, Home as HomeIcon, AlertTriangle, Settings, BarChart3 } from 'lucide-react';


const About = () => {
  return (
  <section className="py-12 border-t">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">Key Features</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
          SilentCue is designed with accessibility and user experience at its core.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex flex-col items-center text-center p-4">
            <Settings size={28} className="text-primary mb-4" />
            <h3 className="font-semibold mb-2">Customizable Settings</h3>
            <p className="text-muted-foreground">Tailor alerts and sensitivity to your personal needs</p>
          </div>

          <div className="flex flex-col items-center text-center p-4">
            <BarChart3 size={28} className="text-primary mb-4" />
            <h3 className="font-semibold mb-2">Alert History</h3>
            <p className="text-muted-foreground">Review past sound detections with detailed information</p>
          </div>

          <div className="flex flex-col items-center text-center p-4">
            <Bell size={28} className="text-primary mb-4" />
            <h3 className="font-semibold mb-2">Visual & Haptic Alerts</h3>
            <p className="text-muted-foreground">Choose between visual, vibration alerts, or both</p>
          </div>

          <div className="flex flex-col items-center text-center p-4">
            <HomeIcon size={28} className="text-primary mb-4" />
            <h3 className="font-semibold mb-2">Context Profiles</h3>
            <p className="text-muted-foreground">Optimize detection for different environments</p>
          </div>
        </div>

        <div className="text-center mt-10">
          <Link to="/detection">
            <Button className="btn-primary">Try SilentSignal Now</Button>
          </Link>
        </div>
      </section>
        );
    };
    
    export default About;