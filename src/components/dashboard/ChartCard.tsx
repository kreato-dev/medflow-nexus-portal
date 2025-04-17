
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LineChart, BarChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string;
    fill?: boolean;
  }>;
}

interface ChartCardProps {
  title: string;
  description?: string;
  chartType: 'line' | 'bar';
  data: ChartData;
  className?: string;
  action?: React.ReactNode;
}

export function ChartCard({ title, description, chartType, data, className, action }: ChartCardProps) {
  // Transform the data into the format expected by Recharts
  const chartData = data.labels.map((label, index) => {
    const dataPoint: Record<string, any> = { name: label };
    
    data.datasets.forEach(dataset => {
      dataPoint[dataset.label] = dataset.data[index];
    });
    
    return dataPoint;
  });
  
  const renderChart = () => {
    if (chartType === 'line') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {data.datasets.map((dataset, index) => (
              <Line 
                key={index}
                type="monotone" 
                dataKey={dataset.label} 
                stroke={dataset.borderColor} 
                fill={dataset.fill ? dataset.borderColor : undefined}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      );
    } else if (chartType === 'bar') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {data.datasets.map((dataset, index) => (
              <Bar 
                key={index}
                dataKey={dataset.label} 
                fill={dataset.backgroundColor}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      );
    }
    
    return null;
  };
  
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        {action}
      </CardHeader>
      <CardContent className="p-4">
        {renderChart()}
      </CardContent>
    </Card>
  );
}
