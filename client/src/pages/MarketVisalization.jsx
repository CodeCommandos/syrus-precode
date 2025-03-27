import React, { useState, useEffect, useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
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
  Search, 
  Candlestick,
  LineChart as LineChartIcon,
  BarChart2,
  RefreshCw,
  TrendingUp,
  Gauge
} from 'lucide-react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { Skeleton } from "@/components/ui/skeleton";

// Enhanced mock data generator for OHLC (Open-High-Low-Close)
const generateOHLCData = (symbol, days = 30) => {
  const basePrice = symbol === 'AAPL' ? 180 : 
                   symbol === 'TSLA' ? 250 : 
                   symbol === 'AMZN' ? 120 : 100;
  
  return Array.from({ length: days }, (_, i) => {
    const volatility = 0.1 + Math.random() * 0.3;
    const open = basePrice * (1 + (Math.random() - 0.5) * volatility);
    const close = open * (1 + (Math.random() - 0.45) * volatility);
    const high = Math.max(open, close) * (1 + Math.random() * 0.05);
    const low = Math.min(open, close) * (1 - Math.random() * 0.05);
    const volume = 1000000 + Math.random() * 5000000;
    
    return [
      new Date(Date.now() - (days - 1 - i) * 86400000).toISOString().split('T')[0], // date
      open.toFixed(2),  // open
      close.toFixed(2), // close
      low.toFixed(2),   // low
      high.toFixed(2),  // high
      Math.round(volume) // volume
    ];
  });
};

const calculateMA = (dayCount, data) => {
  const result = [];
  for (let i = 0, len = data.length; i < len; i++) {
    if (i < dayCount) {
      result.push('-');
      continue;
    }
    let sum = 0;
    for (let j = 0; j < dayCount; j++) {
      sum += +data[i - j][1]; // using open price for MA calculation
    }
    result.push((sum / dayCount).toFixed(2));
  }
  return result;
};

const MarketVisualization = () => {
  const [symbol, setSymbol] = useState('AAPL');
  const [chartType, setChartType] = useState('candlestick');
  const [timeframe, setTimeframe] = useState('1M');
  const [searchInput, setSearchInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [ohlcData, setOhlcData] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchStockData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call with timeout
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Generate enhanced OHLC data
        const days = timeframe === '1D' ? 1 : 
                    timeframe === '1W' ? 7 : 
                    timeframe === '1M' ? 30 : 
                    timeframe === '3M' ? 90 : 365;
        
        const data = generateOHLCData(symbol, days);
        setOhlcData(data);
      } catch (error) {
        console.error("Failed to fetch stock data:", error);
        setOhlcData(generateOHLCData(symbol, 30));
      } finally {
        setIsLoading(false);
      }
    };

    fetchStockData();
  }, [symbol, timeframe]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSymbol(searchInput.toUpperCase());
    }
  };

  const getChartOption = () => {
    if (!ohlcData.length) return {};

    const upColor = '#00da3c';
    const downColor = '#ec0000';
    
    // Split data for ECharts
    const categoryData = ohlcData.map(item => item[0]);
    const values = ohlcData.map(item => [item[1], item[2], item[3], item[4]]);
    const volumes = ohlcData.map((item, idx) => [
      idx,
      item[5],
      item[1] > item[2] ? 1 : -1 // 1 for down, -1 for up
    ]);

    return {
      animation: false,
      legend: {
        bottom: 10,
        left: 'center',
        data: [`${symbol} Price`, 'MA5', 'MA10', 'MA20', 'MA30']
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        },
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        textStyle: {
          color: '#000'
        },
        formatter: function (params) {
          const date = params[0].axisValue;
          const ohlc = params[0].data;
          const change = ((ohlc[1] - ohlc[0]) / ohlc[0] * 100).toFixed(2);
          const color = ohlc[1] >= ohlc[0] ? upColor : downColor;
          
          return `
            <div style="font-weight:bold">${date}</div>
            <div>Open: ${ohlc[0]}</div>
            <div>Close: ${ohlc[1]}</div>
            <div>Low: ${ohlc[2]}</div>
            <div>High: ${ohlc[3]}</div>
            <div style="color:${color}">Change: ${change}%</div>
          `;
        }
      },
      grid: [
        {
          left: '10%',
          right: '8%',
          height: '50%'
        },
        {
          left: '10%',
          right: '8%',
          top: '63%',
          height: '16%'
        }
      ],
      xAxis: [
        {
          type: 'category',
          data: categoryData,
          boundaryGap: false,
          axisLine: { onZero: false },
          splitLine: { show: false },
          min: 'dataMin',
          max: 'dataMax',
          axisPointer: {
            z: 100
          }
        },
        {
          type: 'category',
          gridIndex: 1,
          data: categoryData,
          boundaryGap: false,
          axisLine: { onZero: false },
          axisTick: { show: false },
          splitLine: { show: false },
          axisLabel: { show: false },
          min: 'dataMin',
          max: 'dataMax'
        }
      ],
      yAxis: [
        {
          scale: true,
          splitArea: {
            show: true
          }
        },
        {
          scale: true,
          gridIndex: 1,
          splitNumber: 2,
          axisLabel: { show: false },
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: { show: false }
        }
      ],
      dataZoom: [
        {
          type: 'inside',
          xAxisIndex: [0, 1],
          start: 70,
          end: 100
        },
        {
          show: true,
          xAxisIndex: [0, 1],
          type: 'slider',
          top: '85%',
          start: 70,
          end: 100
        }
      ],
      series: [
        {
          name: `${symbol} Price`,
          type: 'candlestick',
          data: values,
          itemStyle: {
            color: upColor,
            color0: downColor,
            borderColor: upColor,
            borderColor0: downColor
          }
        },
        {
          name: 'MA5',
          type: 'line',
          data: calculateMA(5, ohlcData),
          smooth: true,
          lineStyle: {
            width: 1
          }
        },
        {
          name: 'MA10',
          type: 'line',
          data: calculateMA(10, ohlcData),
          smooth: true,
          lineStyle: {
            width: 1
          }
        },
        {
          name: 'MA20',
          type: 'line',
          data: calculateMA(20, ohlcData),
          smooth: true,
          lineStyle: {
            width: 1
          }
        },
        {
          name: 'MA30',
          type: 'line',
          data: calculateMA(30, ohlcData),
          smooth: true,
          lineStyle: {
            width: 1
          }
        },
        {
          name: 'Volume',
          type: 'bar',
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: volumes,
          itemStyle: {
            color: function (params) {
              return params.data[2] > 0 ? downColor : upColor;
            }
          }
        }
      ]
    };
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Advanced Market Analysis</h1>
              <p className="text-muted-foreground">Professional candlestick charts with technical indicators</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <form onSubmit={handleSearch} className="flex gap-2">
                <Input 
                  placeholder="Search symbol (AAPL, TSLA...)" 
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full sm:w-48"
                />
                <Button type="submit">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </form>
            </div>
          </div>
          
          <Card className="w-full">
            <CardHeader className="border-b">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle className="text-2xl">
                    {symbol} - {timeframe} Candlestick Chart
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {ohlcData.length ? `Data from ${ohlcData[0][0]} to ${ohlcData[ohlcData.length - 1][0]}` : 'Loading data...'}
                  </CardDescription>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <Select value={timeframe} onValueChange={setTimeframe}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Timeframe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1D">1 Day</SelectItem>
                      <SelectItem value="1W">1 Week</SelectItem>
                      <SelectItem value="1M">1 Month</SelectItem>
                      <SelectItem value="3M">3 Months</SelectItem>
                      <SelectItem value="1Y">1 Year</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={chartType} onValueChange={setChartType}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Chart Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="candlestick">
                        <div className="flex items-center gap-2">
                          <Candlestick className="h-4 w-4" />
                          Candlestick
                        </div>
                      </SelectItem>
                      <SelectItem value="line">
                        <div className="flex items-center gap-2">
                          <LineChartIcon className="h-4 w-4" />
                          Line Chart
                        </div>
                      </SelectItem>
                      <SelectItem value="technical">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4" />
                          Technical
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6">
              {isLoading ? (
                <div className="flex items-center justify-center h-[500px]">
                  <div className="flex flex-col items-center gap-4">
                    <RefreshCw className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-muted-foreground">Loading market data...</p>
                  </div>
                </div>
              ) : (
                <ReactECharts
                  ref={chartRef}
                  option={getChartOption()}
                  style={{ height: '500px', width: '100%' }}
                  theme="light"
                  opts={{ renderer: 'canvas' }}
                />
              )}
            </CardContent>
          </Card>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Key Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {ohlcData.length > 0 ? (
                  <>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Current Price</span>
                      <span className="font-medium">
                        ${ohlcData[ohlcData.length - 1][1]}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Today's Change</span>
                      <span className={ohlcData[ohlcData.length - 1][1] >= ohlcData[ohlcData.length - 1][0] ? 'text-green-500' : 'text-red-500'}>
                        {((ohlcData[ohlcData.length - 1][1] - ohlcData[ohlcData.length - 1][0]) / ohlcData[ohlcData.length - 1][0] * 100).toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Volume</span>
                      <span className="font-medium">
                        {ohlcData[ohlcData.length - 1][5].toLocaleString()}
                      </span>
                    </div>
                  </>
                ) : (
                  <Skeleton className="h-24 w-full" />
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Moving Averages</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {ohlcData.length > 0 ? (
                  <>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">MA5</span>
                      <span className="font-medium">
                        ${calculateMA(5, ohlcData).filter(val => val !== '-').pop()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">MA10</span>
                      <span className="font-medium">
                        ${calculateMA(10, ohlcData).filter(val => val !== '-').pop()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">MA20</span>
                      <span className="font-medium">
                        ${calculateMA(20, ohlcData).filter(val => val !== '-').pop()}
                      </span>
                    </div>
                  </>
                ) : (
                  <Skeleton className="h-24 w-full" />
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Market Sentiment</CardTitle>
              </CardHeader>
              <CardContent>
                {ohlcData.length > 0 ? (
                  <div className="flex flex-col items-center">
                    <div className="relative w-32 h-32">
                      <Gauge 
                        value={ohlcData.filter(day => day[1] >= day[0]).length / ohlcData.length * 100}
                        size="full"
                        color={ohlcData.filter(day => day[1] >= day[0]).length / ohlcData.length > 0.5 ? '#10b981' : '#ef4444'}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold">
                          {Math.round(ohlcData.filter(day => day[1] >= day[0]).length / ohlcData.length * 100)}%
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {ohlcData.filter(day => day[1] >= day[0]).length / ohlcData.length > 0.5 ? 'Bullish' : 'Bearish'} Trend
                    </p>
                  </div>
                ) : (
                  <Skeleton className="h-32 w-full" />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MarketVisualization;