
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, Home as HomeIcon, AlertTriangle, Settings, BarChart3 } from 'lucide-react';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="py-12 md:py-16 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          <span className="gradient-text">Smart Sound Detection</span> for the Deaf Community
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          SilentSignal transforms your device into an intelligent sound recognition system
          that helps deaf and hard of hearing individuals stay aware of important sounds in their environment.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/detection">
            <Button className="btn-primary">Start Detection</Button>
          </Link>
          <Link to="/settings">
            <Button variant="outline">Configure Settings</Button>
          </Link>
        </div>
      </section>

      <section className="py-12 border-t">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="card-hover">
            <CardHeader className="flex flex-col items-center">
              <span className="p-3 rounded-full bg-primary/10 text-primary mb-4">
                <Bell size={24} />
              </span>
              <CardTitle>Sound Detection</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                The app continuously monitors ambient sounds through your device's microphone, 
                intelligently identifying important sounds like doorbells, alarms, and more.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardHeader className="flex flex-col items-center">
              <span className="p-3 rounded-full bg-secondary/10 text-secondary mb-4">
                <AlertTriangle size={24} />
              </span>
              <CardTitle>Smart Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                When an important sound is detected, SilentSignal alerts you through visual 
                cues and optional vibrations, providing details about what was detected.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardHeader className="flex flex-col items-center">
              <span className="p-3 rounded-full bg-primary/10 text-primary mb-4">
                <HomeIcon size={24} />
              </span>
              <CardTitle>Context Awareness</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Select between Home, Office, or Street profiles to optimize detection for your 
                current environment, improving accuracy and reducing unwanted alerts.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-12 border-t">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">Key Features</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
          SilentSignal is designed with accessibility and user experience at its core.
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
    </div>
  );
};

export default Home;
