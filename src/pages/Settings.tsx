
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Bell, Vibrate, Battery, Zap, PieChart, Save } from 'lucide-react';

const Settings = () => {
  const { toast } = useToast();
  
  // Alert settings
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [visualAlertsEnabled, setVisualAlertsEnabled] = useState(true);
  const [vibrationIntensity, setVibrationIntensity] = useState(70);
  const [visualIntensity, setVisualIntensity] = useState(80);
  
  // Detection settings
  const [detectDoorbell, setDetectDoorbell] = useState(true);
  const [detectAlarm, setDetectAlarm] = useState(true);
  const [detectPhone, setDetectPhone] = useState(true);
  const [detectAppliance, setDetectAppliance] = useState(true);
  const [detectVehicle, setDetectVehicle] = useState(true);
  const [detectPerson, setDetectPerson] = useState(true);
  
  // Sensitivity settings
  const [sensitivity, setSensitivity] = useState(75);
  const [backgroundNoise, setBackgroundNoise] = useState(25);
  
  // Power settings
  const [batterySaver, setBatterySaver] = useState(false);
  const [continuousDetection, setContinuousDetection] = useState(true);
  
  // Save settings
  const saveSettings = () => {
    // In a real app, this would save to local storage or a database
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated.",
    });
  };

  // Check if vibration is supported
  useEffect(() => {
    const vibrationSupported = 'vibrate' in navigator;
    if (!vibrationSupported && vibrationEnabled) {
      toast({
        title: "Vibration Not Supported",
        description: "Your device does not support vibration alerts.",
        variant: "destructive",
      });
      setVibrationEnabled(false);
    }
  }, []);

  // Handle vibration test
  const testVibration = () => {
    if ('vibrate' in navigator) {
      const duration = Math.round(vibrationIntensity * 5);
      navigator.vibrate(duration);
      toast({
        title: "Testing Vibration",
        description: `Duration: ${duration}ms`,
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      
      {/* Alert Settings */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell size={20} />
            Alert Settings
          </CardTitle>
          <CardDescription>
            Configure how you want to be notified of detected sounds
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Visual Alerts */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="visual-alerts" className="text-base">Visual Alerts</Label>
                <p className="text-sm text-muted-foreground">Display on-screen notifications</p>
              </div>
              <Switch 
                id="visual-alerts" 
                checked={visualAlertsEnabled} 
                onCheckedChange={setVisualAlertsEnabled} 
              />
            </div>
            
            {visualAlertsEnabled && (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="visual-intensity">Visual Alert Intensity</Label>
                  <span className="text-sm">{visualIntensity}%</span>
                </div>
                <Slider 
                  id="visual-intensity"
                  min={10} 
                  max={100} 
                  step={10}
                  value={[visualIntensity]}
                  onValueChange={(value) => setVisualIntensity(value[0])}
                />
              </div>
            )}
          </div>
          
          {/* Vibration Alerts */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="vibration" className="text-base">Vibration Alerts</Label>
                <p className="text-sm text-muted-foreground">Haptic feedback when sounds detected</p>
              </div>
              <Switch 
                id="vibration" 
                checked={vibrationEnabled} 
                onCheckedChange={setVibrationEnabled} 
              />
            </div>
            
            {vibrationEnabled && (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="vibration-intensity">Vibration Intensity</Label>
                  <span className="text-sm">{vibrationIntensity}%</span>
                </div>
                <Slider 
                  id="vibration-intensity"
                  min={10} 
                  max={100} 
                  step={10}
                  value={[vibrationIntensity]}
                  onValueChange={(value) => setVibrationIntensity(value[0])}
                />
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={testVibration}
                  className="mt-2"
                >
                  <Vibrate size={16} className="mr-2" />
                  Test Vibration
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Detection Settings */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart size={20} />
            Detection Settings
          </CardTitle>
          <CardDescription>
            Configure which sounds to detect and detection sensitivity
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Sounds to detect */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Sounds to Detect</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="detect-doorbell">Doorbell</Label>
                <Switch 
                  id="detect-doorbell" 
                  checked={detectDoorbell} 
                  onCheckedChange={setDetectDoorbell} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="detect-alarm">Alarms</Label>
                <Switch 
                  id="detect-alarm" 
                  checked={detectAlarm} 
                  onCheckedChange={setDetectAlarm} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="detect-phone">Phone Ringing</Label>
                <Switch 
                  id="detect-phone" 
                  checked={detectPhone} 
                  onCheckedChange={setDetectPhone} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="detect-appliance">Appliance Beeps</Label>
                <Switch 
                  id="detect-appliance" 
                  checked={detectAppliance} 
                  onCheckedChange={setDetectAppliance} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="detect-vehicle">Vehicle Horns</Label>
                <Switch 
                  id="detect-vehicle" 
                  checked={detectVehicle} 
                  onCheckedChange={setDetectVehicle} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="detect-person">Person Calling</Label>
                <Switch 
                  id="detect-person" 
                  checked={detectPerson} 
                  onCheckedChange={setDetectPerson} 
                />
              </div>
            </div>
          </div>
          
          {/* Sensitivity */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Sensitivity Settings</h3>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="sensitivity">Detection Sensitivity</Label>
                <span className="text-sm">{sensitivity}%</span>
              </div>
              <Slider 
                id="sensitivity"
                min={10} 
                max={100} 
                step={5}
                value={[sensitivity]}
                onValueChange={(value) => setSensitivity(value[0])}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Higher values detect more sounds but may cause false positives
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="background-noise">Background Noise Filter</Label>
                <span className="text-sm">{backgroundNoise}%</span>
              </div>
              <Slider 
                id="background-noise"
                min={0} 
                max={100} 
                step={5}
                value={[backgroundNoise]}
                onValueChange={(value) => setBackgroundNoise(value[0])}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Higher values filter more background noise but may miss quieter sounds
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Power Settings */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Battery size={20} />
            Power Settings
          </CardTitle>
          <CardDescription>
            Configure battery usage and performance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="battery-saver" className="text-base">Battery Saver Mode</Label>
              <p className="text-sm text-muted-foreground">Reduce detection frequency to save power</p>
            </div>
            <Switch 
              id="battery-saver" 
              checked={batterySaver} 
              onCheckedChange={setBatterySaver} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="continuous-detection" className="text-base">Continuous Detection</Label>
              <p className="text-sm text-muted-foreground">Keep detection running in background</p>
            </div>
            <Switch 
              id="continuous-detection" 
              checked={continuousDetection} 
              onCheckedChange={setContinuousDetection} 
            />
          </div>
        </CardContent>
      </Card>
      
      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={saveSettings} className="btn-primary">
          <Save size={16} className="mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default Settings;
