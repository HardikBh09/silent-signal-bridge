
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { History as HistoryIcon, Calendar, Clock, Trash2, Search, Filter } from 'lucide-react';
import { EnvironmentProfile, DetectedSound, getSoundDescription, simulateDetection } from '@/utils/soundUtils';

// Generate some sample history data
const generateSampleHistory = (): DetectedSound[] => {
  const history: DetectedSound[] = [];
  const environments: EnvironmentProfile[] = ['home', 'office', 'street'];
  const now = new Date();
  
  // Generate 20 history items from past 24 hours
  for (let i = 0; i < 20; i++) {
    const randomEnv = environments[Math.floor(Math.random() * environments.length)];
    const randomTime = new Date(now.getTime() - Math.random() * 24 * 60 * 60 * 1000);
    const detection = simulateDetection(randomEnv);
    detection.timestamp = randomTime;
    history.push(detection);
  }
  
  // Sort by timestamp, most recent first
  return history.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

const History = () => {
  const [history, setHistory] = useState<DetectedSound[]>(generateSampleHistory());
  const [filter, setFilter] = useState<'all' | EnvironmentProfile>('all');

  const filteredHistory = filter === 'all' 
    ? history 
    : history.filter(item => item.environment === filter);

  const clearHistory = () => {
    setHistory([]);
  };

  // Format date for display
  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  // Group history by date
  const groupedHistory = filteredHistory.reduce<Record<string, DetectedSound[]>>((groups, item) => {
    const dateStr = formatDate(item.timestamp);
    if (!groups[dateStr]) {
      groups[dateStr] = [];
    }
    groups[dateStr].push(item);
    return groups;
  }, {});

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <HistoryIcon size={28} className="text-primary" />
        Sound Detection History
      </h1>
      
      {/* Filter Tabs */}
      <Tabs defaultValue="all" value={filter} onValueChange={(v) => setFilter(v as any)} className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="home">Home</TabsTrigger>
            <TabsTrigger value="office">Office</TabsTrigger>
            <TabsTrigger value="street">Street</TabsTrigger>
          </TabsList>
          
          <Button variant="outline" size="sm" onClick={clearHistory} disabled={history.length === 0}>
            <Trash2 size={16} className="mr-2" />
            Clear History
          </Button>
        </div>
      </Tabs>
      
      {/* Empty State */}
      {filteredHistory.length === 0 && (
        <Card className="bg-muted/50">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Search size={48} className="text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">No history found</h3>
            <p className="text-muted-foreground text-center max-w-md">
              {filter === 'all' 
                ? "You don't have any sound detection history yet. Start detection to record sounds."
                : `No sound detections found in the ${filter} environment.`}
            </p>
          </CardContent>
        </Card>
      )}
      
      {/* History List */}
      {filteredHistory.length > 0 && (
        <div className="space-y-8">
          {Object.entries(groupedHistory).map(([date, items]) => (
            <div key={date} className="space-y-4">
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-muted-foreground" />
                <h2 className="text-lg font-semibold">{date}</h2>
              </div>
              
              <div className="space-y-4">
                {items.map((item) => (
                  <Card key={item.id} className="card-hover">
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                            <Clock size={20} />
                          </div>
                          
                          <div>
                            <h3 className="font-medium">{getSoundDescription(item.type)}</h3>
                            <p className="text-sm text-muted-foreground">
                              {item.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex flex-col md:flex-row gap-3 md:items-center">
                          <Badge 
                            variant="outline" 
                            className={`capitalize ${
                              item.environment === 'home' ? 'border-blue-500 text-blue-500' :
                              item.environment === 'office' ? 'border-purple-500 text-purple-500' :
                              'border-green-500 text-green-500'
                            }`}
                          >
                            {item.environment}
                          </Badge>
                          
                          <div className="flex-1 md:w-32">
                            <div className="flex justify-between text-xs mb-1">
                              <span>Accuracy</span>
                              <span>{item.confidence}%</span>
                            </div>
                            <Progress value={item.confidence} className="h-1.5" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
