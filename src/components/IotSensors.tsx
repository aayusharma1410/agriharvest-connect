
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Thermometer, Droplets, Wind, Sun, Leaf, AlertTriangle, Check, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SensorData {
  id: string;
  name: string;
  type: 'temperature' | 'moisture' | 'wind' | 'sunlight' | 'soil';
  value: number;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  lastUpdated: string;
  location: string;
}

const mockSensors: SensorData[] = [
  {
    id: '1',
    name: 'Field Temperature Sensor',
    type: 'temperature',
    value: 28.5,
    unit: '°C',
    status: 'normal',
    lastUpdated: new Date().toISOString(),
    location: 'North Field'
  },
  {
    id: '2',
    name: 'Soil Moisture Sensor',
    type: 'moisture',
    value: 42,
    unit: '%',
    status: 'warning',
    lastUpdated: new Date().toISOString(),
    location: 'East Field'
  },
  {
    id: '3',
    name: 'Wind Sensor',
    type: 'wind',
    value: 12,
    unit: 'km/h',
    status: 'normal',
    lastUpdated: new Date().toISOString(),
    location: 'Central Field'
  },
  {
    id: '4',
    name: 'Sunlight Intensity',
    type: 'sunlight',
    value: 85,
    unit: '%',
    status: 'normal',
    lastUpdated: new Date().toISOString(),
    location: 'South Field'
  },
  {
    id: '5',
    name: 'Soil pH Sensor',
    type: 'soil',
    value: 6.5,
    unit: 'pH',
    status: 'normal',
    lastUpdated: new Date().toISOString(),
    location: 'West Field'
  },
  {
    id: '6',
    name: 'Greenhouse Temperature',
    type: 'temperature',
    value: 32,
    unit: '°C',
    status: 'critical',
    lastUpdated: new Date().toISOString(),
    location: 'Greenhouse'
  }
];

interface IotSensorsProps {
  isOpen: boolean;
  onClose: () => void;
}

const IotSensors: React.FC<IotSensorsProps> = ({ isOpen, onClose }) => {
  const [sensors, setSensors] = useState<SensorData[]>(mockSensors);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  const getSensorIcon = (type: string) => {
    switch (type) {
      case 'temperature':
        return <Thermometer className="h-5 w-5" />;
      case 'moisture':
        return <Droplets className="h-5 w-5" />;
      case 'wind':
        return <Wind className="h-5 w-5" />;
      case 'sunlight':
        return <Sun className="h-5 w-5" />;
      case 'soil':
        return <Leaf className="h-5 w-5" />;
      default:
        return <AlertTriangle className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'text-green-500';
      case 'warning':
        return 'text-amber-500';
      case 'critical':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const refreshSensorData = () => {
    setIsRefreshing(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Update timestamp and slightly modify values
      const updatedSensors = sensors.map(sensor => ({
        ...sensor,
        value: sensor.type === 'temperature' 
          ? Number((sensor.value + (Math.random() * 2 - 1)).toFixed(1))
          : sensor.type === 'moisture'
            ? Number((sensor.value + (Math.random() * 5 - 2.5)).toFixed(0))
            : Number((sensor.value + (Math.random() * 3 - 1.5)).toFixed(1)),
        lastUpdated: new Date().toISOString()
      }));
      
      setSensors(updatedSensors);
      setIsRefreshing(false);
      
      toast({
        title: "Sensors updated",
        description: "Latest sensor data has been retrieved.",
      });
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <Thermometer className="h-5 w-5 text-primary" />
            IoT Sensors Dashboard
          </DialogTitle>
          <DialogDescription>
            Monitor real-time data from IoT sensors deployed in your fields
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-6 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="temperature">Temperature</TabsTrigger>
            <TabsTrigger value="moisture">Moisture</TabsTrigger>
            <TabsTrigger value="wind">Wind</TabsTrigger>
            <TabsTrigger value="sunlight">Sunlight</TabsTrigger>
            <TabsTrigger value="soil">Soil</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sensors.map((sensor) => (
                <Card key={sensor.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base flex items-center gap-2">
                          {getSensorIcon(sensor.type)}
                          {sensor.name}
                        </CardTitle>
                        <CardDescription>{sensor.location}</CardDescription>
                      </div>
                      <div className={`flex items-center ${getStatusColor(sensor.status)}`}>
                        {sensor.status === 'normal' && <Check className="h-4 w-4 mr-1" />}
                        {sensor.status === 'warning' && <AlertTriangle className="h-4 w-4 mr-1" />}
                        {sensor.status === 'critical' && <AlertTriangle className="h-4 w-4 mr-1" />}
                        <span className="text-xs font-medium">{sensor.status.toUpperCase()}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex justify-between items-center">
                      <div className="text-3xl font-bold">
                        {sensor.value} <span className="text-sm text-muted-foreground">{sensor.unit}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <span className="text-xs text-muted-foreground">
                      Last updated: {formatTimestamp(sensor.lastUpdated)}
                    </span>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {['temperature', 'moisture', 'wind', 'sunlight', 'soil'].map((type) => (
            <TabsContent key={type} value={type} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sensors
                  .filter((sensor) => sensor.type === type)
                  .map((sensor) => (
                    <Card key={sensor.id} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-base flex items-center gap-2">
                              {getSensorIcon(sensor.type)}
                              {sensor.name}
                            </CardTitle>
                            <CardDescription>{sensor.location}</CardDescription>
                          </div>
                          <div className={`flex items-center ${getStatusColor(sensor.status)}`}>
                            {sensor.status === 'normal' && <Check className="h-4 w-4 mr-1" />}
                            {sensor.status === 'warning' && <AlertTriangle className="h-4 w-4 mr-1" />}
                            {sensor.status === 'critical' && <AlertTriangle className="h-4 w-4 mr-1" />}
                            <span className="text-xs font-medium">{sensor.status.toUpperCase()}</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex justify-between items-center">
                          <div className="text-3xl font-bold">
                            {sensor.value} <span className="text-sm text-muted-foreground">{sensor.unit}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <span className="text-xs text-muted-foreground">
                          Last updated: {formatTimestamp(sensor.lastUpdated)}
                        </span>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <DialogFooter className="flex flex-col sm:flex-row gap-3 mt-6">
          <Button 
            variant="outline" 
            onClick={onClose} 
            className="sm:flex-1"
          >
            Close
          </Button>
          <Button 
            onClick={refreshSensorData} 
            disabled={isRefreshing}
            className="sm:flex-1"
          >
            {isRefreshing ? (
              <span className="flex items-center">
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Updating...
              </span>
            ) : (
              <span className="flex items-center">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Data
              </span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default IotSensors;
