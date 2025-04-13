
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { Bell, Home as HomeIcon, Building2, Car, Wand2, Vibrate } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { EnvironmentProfile, DetectedSound, simulateDetection, showSoundAlert, getSoundDescription } from '@/utils/soundUtils';

const Detection = () => {
  const [isDetecting, setIsDetecting] = useState(false);
  const [environment, setEnvironment] = useState<EnvironmentProfile>('home');
  const [lastDetection, setLastDetection] = useState<DetectedSound | null>(null);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [visualAlertsEnabled, setVisualAlertsEnabled] = useState(true);
  const [detectionInterval, setDetectionInterval] = useState<number | null>(null);
  const { toast } = useToast();

  // Start/stop detection
  useEffect(() => {
    if (isDetecting) {
      // Simulate sound detection every 15 seconds
      const interval = window.setInterval(() => {
        const detected = simulateDetection(environment);
        setLastDetection(detected);
        
        // Show alert based on user preferences
        if (visualAlertsEnabled) {
          showSoundAlert(detected, vibrationEnabled);
        } else if (vibrationEnabled) {
          // Only vibration, no visual
          navigator.vibrate?.(500);
        }
        
      }, 15000);
      
      setDetectionInterval(interval);
      
      // Initial detection on start
      const initialDetection = simulateDetection(environment);
      setLastDetection(initialDetection);
      
      return () => {
        window.clearInterval(interval);
        setDetectionInterval(null);
      };
    }
  }, [isDetecting, environment, vibrationEnabled, visualAlertsEnabled]);

  // Handle environment changes
  useEffect(() => {
    if (isDetecting) {
      toast({
        title: "Environment Changed",
        description: `Detection optimized for ${environment} environment`,
      });
    }
  }, [environment]);

  // Handle manual test alert
  const handleTestAlert = () => {
    const testDetection = simulateDetection(environment);
    setLastDetection(testDetection);
    showSoundAlert(testDetection, vibrationEnabled);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Sound Detection</h1>
      
      {/* Environment Selection Tabs */}
      <Tabs defaultValue="home" value={environment} onValueChange={(v) => setEnvironment(v as EnvironmentProfile)} className="mb-6">
        <TabsList className="grid grid-cols-3 mb-2">
          <TabsTrigger value="home" className="flex items-center gap-2">
            <HomeIcon size={16} />
            <span>Home</span>
          </TabsTrigger>
          <TabsTrigger value="office" className="flex items-center gap-2">
            <Building2 size={16} />
            <span>Office</span>
          </TabsTrigger>
          <TabsTrigger value="street" className="flex items-center gap-2">
            <Car size={16} />
            <span>Street</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="home">
          <p className="text-muted-foreground">Optimized for home environments: doorbells, appliances, alarms, and phones.</p>
        </TabsContent>
        <TabsContent value="office">
          <p className="text-muted-foreground">Optimized for office environments: phones, alarms, and people calling your name.</p>
        </TabsContent>
        <TabsContent value="street">
          <p className="text-muted-foreground">Optimized for outdoor environments: vehicles, alarms, and people nearby.</p>
        </TabsContent>
      </Tabs>
      
      {/* Detection Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell size={20} />
              Sound Detection
            </CardTitle>
            <CardDescription>
              Start or stop monitoring for important sounds
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Button 
              className={isDetecting ? "btn-secondary" : "btn-primary"}
              onClick={() => setIsDetecting(!isDetecting)}
              size="lg"
            >
              {isDetecting ? "Stop Detection" : "Start Detection"}
            </Button>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="visual-alerts">Visual Alerts</Label>
              <Switch 
                id="visual-alerts" 
                checked={visualAlertsEnabled} 
                onCheckedChange={setVisualAlertsEnabled} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="vibration">Vibration</Label>
              <Switch 
                id="vibration" 
                checked={vibrationEnabled} 
                onCheckedChange={setVibrationEnabled} 
              />
            </div>

            <Button 
              variant="outline" 
              className="mt-2" 
              onClick={handleTestAlert}
              size="sm"
            >
              <Wand2 size={16} className="mr-2" />
              Test Alert
            </Button>
          </CardContent>
        </Card>
        
        {/* Detection Status Card */}
        <Card>
          <CardHeader>
            <CardTitle>Detection Status</CardTitle>
            <CardDescription>
              Current sound detection information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm">Status:</span>
                <span className={`text-sm font-medium ${isDetecting ? "text-green-500" : "text-gray-500"}`}>
                  {isDetecting ? "Active" : "Inactive"}
                </span>
              </div>
              
              {isDetecting && (
                <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div className="absolute h-full w-full animate-pulse bg-primary/25"></div>
                </div>
              )}
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm">Environment:</span>
                <span className="text-sm font-medium capitalize">{environment}</span>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm">Alert Method:</span>
                <div className="flex items-center gap-2">
                  {visualAlertsEnabled && <Bell size={16} className="text-primary" />}
                  {vibrationEnabled && <Vibrate size={16} className="text-primary" />}
                  {!visualAlertsEnabled && !vibrationEnabled && <span className="text-gray-400">None</span>}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Latest Detection */}
      {lastDetection && (
        <Card className={isDetecting ? "border-primary" : ""}>
          <CardHeader>
            <CardTitle>Latest Detection</CardTitle>
            <CardDescription>
              Last detected sound information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm">Sound Type:</span>
                <span className="text-sm font-medium">
                  {getSoundDescription(lastDetection.type)}
                </span>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm">Detected at:</span>
                <span className="text-sm font-medium">
                  {lastDetection.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm">Intensity:</span>
                <span className="text-sm font-medium">{lastDetection.intensity}%</span>
              </div>
              <Progress value={lastDetection.intensity} className="h-2" />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm">Confidence:</span>
                <span className="text-sm font-medium">{lastDetection.confidence}%</span>
              </div>
              <Progress value={lastDetection.confidence} className="h-2" />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Detection;
