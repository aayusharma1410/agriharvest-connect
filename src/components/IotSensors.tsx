
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Gauge, Droplets, Thermometer, Wind, BatteryMedium, SunMedium, Layers } from 'lucide-react';
import { format } from 'date-fns';

const IotSensors = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock sensor data - in a real app, this would come from API calls to IoT devices
  const sensorData = {
    moisture: {
      current: 68,
      min: 60,
      max: 80,
      unit: '%',
      lastUpdated: new Date(),
      status: 'normal', // normal, warning, critical
      history: [
        { time: '08:00', value: 65 },
        { time: '10:00', value: 67 },
        { time: '12:00', value: 70 },
        { time: '14:00', value: 68 },
        { time: '16:00', value: 66 },
      ]
    },
    temperature: {
      current: 26.5,
      min: 20,
      max: 30,
      unit: '°C',
      lastUpdated: new Date(),
      status: 'normal',
      history: [
        { time: '08:00', value: 24 },
        { time: '10:00', value: 25 },
        { time: '12:00', value: 27 },
        { time: '14:00', value: 28 },
        { time: '16:00', value: 26.5 },
      ]
    },
    humidity: {
      current: 58,
      min: 30,
      max: 70,
      unit: '%',
      lastUpdated: new Date(),
      status: 'normal',
      history: [
        { time: '08:00', value: 55 },
        { time: '10:00', value: 56 },
        { time: '12:00', value: 58 },
        { time: '14:00', value: 59 },
        { time: '16:00', value: 58 },
      ]
    },
    sunlight: {
      current: 75,
      min: 40,
      max: 100,
      unit: '%',
      lastUpdated: new Date(),
      status: 'normal',
      history: [
        { time: '08:00', value: 40 },
        { time: '10:00', value: 65 },
        { time: '12:00', value: 85 },
        { time: '14:00', value: 80 },
        { time: '16:00', value: 75 },
      ]
    },
    battery: {
      current: 85,
      min: 20,
      max: 100,
      unit: '%',
      lastUpdated: new Date(),
      status: 'normal',
      history: [
        { time: '08:00', value: 90 },
        { time: '10:00', value: 88 },
        { time: '12:00', value: 87 },
        { time: '14:00', value: 86 },
        { time: '16:00', value: 85 },
      ]
    },
    soilNutrients: {
      nitrogen: { value: 42, unit: 'ppm', status: 'normal' },
      phosphorus: { value: 35, unit: 'ppm', status: 'warning' },
      potassium: { value: 180, unit: 'ppm', status: 'normal' },
      ph: { value: 6.8, unit: 'pH', status: 'normal' },
      lastUpdated: new Date()
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'critical':
        return 'text-red-500';
      case 'warning':
        return 'text-amber-500';
      default:
        return 'text-green-500';
    }
  };

  const renderGaugeIndicator = (value, min, max, status) => {
    const percentage = ((value - min) / (max - min)) * 100;
    
    return (
      <div className="relative h-3 w-full bg-gray-200 rounded-full mt-2">
        <div 
          className={`absolute h-3 rounded-full ${getStatusColor(status)}`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    );
  };

  const SensorCard = ({ title, value, unit, min, max, status, Icon }) => (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
          <div className="flex items-baseline mt-1">
            <span className="text-2xl font-semibold">{value}</span>
            <span className="ml-1 text-gray-500">{unit}</span>
          </div>
        </div>
        <Icon className={`h-5 w-5 ${getStatusColor(status)}`} />
      </div>
      {renderGaugeIndicator(value, min, max, status)}
      <div className="flex justify-between text-xs mt-2">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );

  return (
    <>
      <Button 
        variant="ghost"
        size="sm"
        className="flex items-center gap-2"
        onClick={() => setIsOpen(true)}
      >
        <Gauge className="h-4 w-4" />
        <span>IoT Sensors</span>
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>IoT Sensor Dashboard</DialogTitle>
            <DialogDescription>
              Monitor real-time data from your field sensors
            </DialogDescription>
          </DialogHeader>

          <div className="flex border-b">
            <button 
              className={`px-4 py-2 font-medium ${activeTab === 'overview' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`px-4 py-2 font-medium ${activeTab === 'soil' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'}`}
              onClick={() => setActiveTab('soil')}
            >
              Soil Analysis
            </button>
          </div>

          {activeTab === 'overview' && (
            <div className="py-4">
              <div className="mb-6">
                <div className="text-sm text-gray-500 mb-1">Last updated: {format(sensorData.moisture.lastUpdated, 'PPpp')}</div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <SensorCard 
                  title="Soil Moisture"
                  value={sensorData.moisture.current}
                  unit={sensorData.moisture.unit}
                  min={sensorData.moisture.min}
                  max={sensorData.moisture.max}
                  status={sensorData.moisture.status}
                  Icon={Droplets}
                />
                
                <SensorCard 
                  title="Temperature"
                  value={sensorData.temperature.current}
                  unit={sensorData.temperature.unit}
                  min={sensorData.temperature.min}
                  max={sensorData.temperature.max}
                  status={sensorData.temperature.status}
                  Icon={Thermometer}
                />
                
                <SensorCard 
                  title="Humidity"
                  value={sensorData.humidity.current}
                  unit={sensorData.humidity.unit}
                  min={sensorData.humidity.min}
                  max={sensorData.humidity.max}
                  status={sensorData.humidity.status}
                  Icon={Wind}
                />
                
                <SensorCard 
                  title="Sunlight"
                  value={sensorData.sunlight.current}
                  unit={sensorData.sunlight.unit}
                  min={sensorData.sunlight.min}
                  max={sensorData.sunlight.max}
                  status={sensorData.sunlight.status}
                  Icon={SunMedium}
                />
                
                <SensorCard 
                  title="Battery"
                  value={sensorData.battery.current}
                  unit={sensorData.battery.unit}
                  min={sensorData.battery.min}
                  max={sensorData.battery.max}
                  status={sensorData.battery.status}
                  Icon={BatteryMedium}
                />

                {/* Irrigation Control Card */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Irrigation System</h3>
                  <div className="mt-4 flex flex-col items-center">
                    <span className="text-green-500 font-medium">Active</span>
                    <div className="mt-2 space-y-2 w-full">
                      <Button size="sm" className="w-full">Start Irrigation</Button>
                      <Button size="sm" variant="outline" className="w-full">Schedule</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'soil' && (
            <div className="py-4">
              <div className="mb-6">
                <div className="text-sm text-gray-500 mb-1">
                  Last soil test: {format(sensorData.soilNutrients.lastUpdated, 'PPpp')}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                  <div className="flex justify-between items-start">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Nitrogen (N)</h3>
                    <Layers className={`h-5 w-5 ${getStatusColor(sensorData.soilNutrients.nitrogen.status)}`} />
                  </div>
                  <div className="mt-2">
                    <span className="text-2xl font-semibold">{sensorData.soilNutrients.nitrogen.value}</span>
                    <span className="ml-1 text-gray-500">{sensorData.soilNutrients.nitrogen.unit}</span>
                  </div>
                  <p className="text-sm mt-2">Optimal range: 40-80 ppm</p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                  <div className="flex justify-between items-start">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Phosphorus (P)</h3>
                    <Layers className={`h-5 w-5 ${getStatusColor(sensorData.soilNutrients.phosphorus.status)}`} />
                  </div>
                  <div className="mt-2">
                    <span className="text-2xl font-semibold">{sensorData.soilNutrients.phosphorus.value}</span>
                    <span className="ml-1 text-gray-500">{sensorData.soilNutrients.phosphorus.unit}</span>
                  </div>
                  <p className="text-sm mt-2 text-amber-500">Low: Consider phosphorus fertilizer</p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                  <div className="flex justify-between items-start">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Potassium (K)</h3>
                    <Layers className={`h-5 w-5 ${getStatusColor(sensorData.soilNutrients.potassium.status)}`} />
                  </div>
                  <div className="mt-2">
                    <span className="text-2xl font-semibold">{sensorData.soilNutrients.potassium.value}</span>
                    <span className="ml-1 text-gray-500">{sensorData.soilNutrients.potassium.unit}</span>
                  </div>
                  <p className="text-sm mt-2">Optimal range: 150-250 ppm</p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                  <div className="flex justify-between items-start">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">pH Level</h3>
                    <Layers className={`h-5 w-5 ${getStatusColor(sensorData.soilNutrients.ph.status)}`} />
                  </div>
                  <div className="mt-2">
                    <span className="text-2xl font-semibold">{sensorData.soilNutrients.ph.value}</span>
                    <span className="ml-1 text-gray-500">{sensorData.soilNutrients.ph.unit}</span>
                  </div>
                  <p className="text-sm mt-2">Optimal range: 6.0-7.0 pH</p>
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">Recommendations</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Phosphorus levels are below optimal range. Consider adding phosphate fertilizer.</li>
                  <li>pH level is good for most crops.</li>
                  <li>Next soil test recommended in 3 weeks.</li>
                </ul>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button onClick={() => setIsOpen(false)}>Close</Button>
            <Button variant="outline">Download Report</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default IotSensors;
