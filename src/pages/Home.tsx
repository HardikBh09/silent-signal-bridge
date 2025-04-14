
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, Home as HomeIcon, AlertTriangle, Settings, BarChart3 } from 'lucide-react';


const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="py-12 md:py-16 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          <span className="gradient-text">Smart Sound Detector</span> for the Deaf Person
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Intelligent sound recognizer
          that facilitates deaf and hard of hearing individuals stay informed of sounds produced in their surroundings.
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
                It monitors ambient sounds through microphone to identify doorbells, alarms, etc.
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
                Gives alert of sounds produced in the surrounding through detailed visual 
                cues and vibrations.
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
              Can switch between profiles to match the environment, so detection stays accurate and false alerts stay low.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;
