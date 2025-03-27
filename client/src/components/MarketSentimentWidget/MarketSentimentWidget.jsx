import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card2";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Search, LineChart as LineChartIcon, BarChart2, PieChart as PieChartIcon, ScatterChart as ScatterChartIcon } from 'lucide-react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const MarketVisualization = () => {
  const [symbol, setSymbol] = useState('AAPL');
  const [chartType, setChartType] = useState('line');
  const [stockData, setStockData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStockData = async () => {
      setIsLoading(true);
      try {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setMonth(endDate.getMonth() - 1);

        const response = await fetch(`http://localhost:5000/history/stocks/${symbol}/bars?start=${startDate.getTime()}&end=${endDate.getTime()}`);
        const data = await response.json();
        
        const transformedData = data.bars.map((bar, index) => ({
          name: `Day ${index + 1}`,
          price: bar.c,
          volume: bar.v,
          high: bar.h,
          low: bar.l,
          open: bar.o,
          close: bar.c,
          change: ((bar.c - bar.o) / bar.o * 100).toFixed(2)
        }));

        setStockData(transformedData);
      } catch (error) {
        console.error("Failed to fetch stock data:", error);
        // Mock data
        const mockData = Array.from({ length: 15 }, (_, i) => ({
          name: `Day ${i + 1}`,
          price: 100 + Math.random() * 50,
          volume: 1000 + Math.random() * 2000,
          high: 110 + Math.random() * 20,
          low: 95 + Math.random() * 10,
          open: 98 + Math.random() * 15,
          close: 105 + Math.random() * 20,
          change: (Math.random() * 10 - 2).toFixed(2)
        }));
        setStockData(mockData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStockData();
  }, [symbol]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSymbol(searchInput.toUpperCase());
    }
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const renderChart = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      );
    }

    switch(chartType) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={stockData}>
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1f2937',
                  borderColor: '#374151',
                  borderRadius: '0.5rem'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="#8884d8" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6, stroke: '#2563eb', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={stockData}>
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1f2937',
                  borderColor: '#374151',
                  borderRadius: '0.5rem'
                }}
              />
              <Legend />
              <Bar 
                dataKey="volume" 
                fill="#8884d8" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={stockData}>
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1f2937',
                  borderColor: '#374151',
                  borderRadius: '0.5rem'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="price" 
                stroke="#8884d8" 
                fill="#8884d8" 
                fillOpacity={0.2}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      
      case 'scatter':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart>
              <XAxis type="number" dataKey="open" name="Open" stroke="#6b7280" />
              <YAxis type="number" dataKey="close" name="Close" stroke="#6b7280" />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                contentStyle={{
                  backgroundColor: '#1f2937',
                  borderColor: '#374151',
                  borderRadius: '0.5rem'
                }}
              />
              <Scatter 
                name="Price Points" 
                data={stockData} 
                fill="#8884d8" 
                shape="circle"
              />
            </ScatterChart>
          </ResponsiveContainer>
        );
      
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={stockData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="volume"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {stockData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1f2937',
                  borderColor: '#374151',
                  borderRadius: '0.5rem'
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
      
      default:
        return <p>Select a chart type</p>;
    }
  };

  const chartIcons = {
    line: <LineChartIcon className="h-4 w-4" />,
    bar: <BarChart2 className="h-4 w-4" />,
    area: <AreaChart className="h-4 w-4" />,
    scatter: <ScatterChartIcon className="h-4 w-4" />,
    pie: <PieChartIcon className="h-4 w-4" />
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Market Visualization</h1>
          
          <Card className="w-full shadow-lg">
            <CardHeader className="border-b">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <CardTitle className="text-xl">
                  {symbol} Stock Analysis
                </CardTitle>
                
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <form onSubmit={handleSearch} className="flex gap-2">
                    <Input 
                      placeholder="Search Stock (e.g., AAPL)" 
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      className="w-full sm:w-48"
                    />
                    <Button type="submit" variant="outline">
                      <Search className="h-4 w-4 mr-2" />
                      Search
                    </Button>
                  </form>
                  
                  <Select value={chartType} onValueChange={setChartType}>
                    <SelectTrigger className="w-full sm:w-48">
                      <div className="flex items-center gap-2">
                        {chartIcons[chartType]}
                        <SelectValue placeholder="Chart Type" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="line">
                        <div className="flex items-center gap-2">
                          <LineChartIcon className="h-4 w-4" />
                          Line Chart
                        </div>
                      </SelectItem>
                      <SelectItem value="bar">
                        <div className="flex items-center gap-2">
                          <BarChart2 className="h-4 w-4" />
                          Bar Chart
                        </div>
                      </SelectItem>
                      <SelectItem value="area">
                        <div className="flex items-center gap-2">
                          <AreaChart className="h-4 w-4" />
                          Area Chart
                        </div>
                      </SelectItem>
                      <SelectItem value="scatter">
                        <div className="flex items-center gap-2">
                          <ScatterChartIcon className="h-4 w-4" />
                          Scatter Plot
                        </div>
                      </SelectItem>
                      <SelectItem value="pie">
                        <div className="flex items-center gap-2">
                          <PieChartIcon className="h-4 w-4" />
                          Pie Chart
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6">
              {renderChart()}
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MarketVisualization;