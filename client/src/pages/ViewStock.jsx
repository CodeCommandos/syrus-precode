import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';


const fakeData = {
  stocks: {
    AAPL: {
      symbol: "AAPL",
      bars: [
        { t: 1672820400000, o: 145.3, h: 146.4, l: 144.9, c: 145.9, v: 122710000, n: 1200 },
        { t: 1672824000000, o: 145.9, h: 146.6, l: 145.1, c: 146.2, v: 130500000, n: 1250 },
       
      ]
    },
    TSLA: {
      symbol: "TSLA",
      bars: [
        { t: 1672820400000, o: 220.3, h: 225.4, l: 219.1, c: 224.9, v: 300100000, n: 2200 },
        { t: 1672824000000, o: 224.9, h: 227.6, l: 223.5, c: 226.2, v: 330500000, n: 2250 },
        // ... more data points for TSLA
      ]
    },
    AMZN: {
      symbol: "AMZN",
      bars: [
        { t: 1672820400000, o: 97.3, h: 98.4, l: 96.9, c: 98.0, v: 150710000, n: 1300 },
        { t: 1672824000000, o: 98.0, h: 99.6, l: 97.1, c: 98.6, v: 140500000, n: 1250 },
        // ... more data points for AMZN
      ]
    },
    MSFT: {
      symbol: "MSFT",
      bars: [
        { t: 1672820400000, o: 250.3, h: 252.5, l: 249.2, c: 251.4, v: 80000000, n: 950 },
        { t: 1672824000000, o: 251.4, h: 253.0, l: 250.5, c: 252.2, v: 90000000, n: 1000 },
        // ... more data points for MSFT
      ]
    }
  },
  crypto: {
    BTC: {
      symbol: "BTC",
      bars: [
        { t: 1672820400000, o: 20500, h: 21000, l: 20200, c: 20800, v: 2500000, n: 5000 },
        { t: 1672824000000, o: 20800, h: 21250, l: 20700, c: 21100, v: 2700000, n: 5500 },
        // ... more data points for BTC
      ]
    },
    ETH: {
      symbol: "ETH",
      bars: [
        { t: 1672820400000, o: 1500, h: 1520, l: 1485, c: 1510, v: 1800000, n: 3000 },
        { t: 1672824000000, o: 1510, h: 1530, l: 1500, c: 1525, v: 1900000, n: 3100 },
        // ... more data points for ETH
      ]
    },
    LTC: {
      symbol: "LTC",
      bars: [
        { t: 1672820400000, o: 85, h: 87, l: 84, c: 86, v: 750000, n: 2000 },
        { t: 1672824000000, o: 86, h: 88, l: 85, c: 87, v: 800000, n: 2100 },
        // ... more data points for LTC
      ]
    },
    XRP: {
      symbol: "XRP",
      bars: [
        { t: 1672820400000, o: 0.45, h: 0.48, l: 0.44, c: 0.46, v: 50000000, n: 1500 },
        { t: 1672824000000, o: 0.46, h: 0.49, l: 0.45, c: 0.47, v: 52000000, n: 1550 },
        // ... more data points for XRP
      ]
    }
  }
};


const fakeDetailData = {
  AAPL: {
    id: "83932f5b-533e-4c69-876a-a120b0ae01c1",
    cusip: null,
    class: "stock",
    exchange: "NASDAQ",
    symbol: "AAPL",
    name: "Apple Inc.",
    status: "active",
    tradable: true,
    marginable: true,
    maintenance_margin_requirement: 25,
    margin_requirement_long: "25",
    margin_requirement_short: "25",
    shortable: true,
    easy_to_borrow: true,
    fractionable: true,
    attributes: [],
    min_order_size: "1",
    min_trade_increment: "1",
    price_increment: "0.01"
  },
  BTC: {
    id: "83932f5b-533e-4c69-876a-a120b0ae01c1",
    cusip: null,
    class: "crypto",
    exchange: "CRYPTO",
    symbol: "BTC",
    name: "Bitcoin",
    status: "active",
    tradable: true,
    marginable: false,
    maintenance_margin_requirement: 100,
    margin_requirement_long: "100",
    margin_requirement_short: "100",
    shortable: false,
    easy_to_borrow: false,
    fractionable: true,
    attributes: [],
    min_order_size: "0.0001",
    min_trade_increment: "0.00000001",
    price_increment: "0.01"
  }
};

const fakeChartData = {
  AAPL: {
    candlestick: {
      options: {
        chart: {
          type: 'candlestick',
          height: 350,
          toolbar: { show: true },
          foreColor: 'var(--white-color)'
        },
        title: { text: 'AAPL Candlestick', align: 'left' },
        xaxis: { type: 'datetime' }
      },
      series: [{
        name: 'Candlestick',
        data: [
          { x: new Date(1672820400000), y: [145.3, 146.4, 144.9, 145.9] },
          { x: new Date(1672824000000), y: [145.9, 146.6, 145.1, 146.2] },
          // ... more data points
        ]
      }]
    },
    area: {
      options: {
        chart: {
          type: 'area',
          height: 350,
          zoom: { enabled: true },
          toolbar: { autoSelected: 'zoom' }
        },
        title: { text: 'AAPL Price Movement', align: 'left' },
        xaxis: { type: 'datetime' }
      },
      series: [{
        name: 'Close Price',
        data: [
          [1672820400000, 145.9],
          [1672824000000, 146.2],
          // ... additional data points
        ]
      }]
    },
    mixed: {
      options: {
        chart: {
          type: 'line',
          height: 350,
          toolbar: { show: true },
          foreColor: 'var(--white-color)'
        },
        title: { text: 'AAPL Mixed Chart', align: 'left' },
        xaxis: { type: 'datetime' }
      },
      series: [
        {
          name: 'Close Price',
          type: 'line',
          data: [
            [1672820400000, 145.9],
            [1672824000000, 146.2],
            // ... additional data points
          ]
        },
        {
          name: 'Volume',
          type: 'column',
          data: [
            [1672820400000, 122710000],
            [1672824000000, 130500000],
            // ... additional data points
          ]
        }
      ]
    },
    zoomable: {
      options: {
        chart: {
          type: 'area',
          stacked: false,
          height: 350,
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true
          },
          toolbar: { autoSelected: 'zoom', show: true },
          foreColor: 'var(--white-color)'
        },
        dataLabels: { enabled: false },
        markers: { size: 0 },
        title: { text: 'AAPL Zoomable Time Series', align: 'left' },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.5,
            opacityTo: 0,
            stops: [0, 90, 100]
          }
        },
        yaxis: {
          labels: {
            formatter: (val) => (val / 1000000).toFixed(0)
          },
          title: { text: 'Price' }
        },
        xaxis: { type: 'datetime' }
      },
      series: [{
        name: 'Close Price',
        data: [
          [1672820400000, 145.9],
          [1672824000000, 146.2],
          // ... additional data points
        ]
      }]
    }
  },
  BTC: {
    candlestick: {
      options: {
        chart: {
          type: 'candlestick',
          height: 350,
          toolbar: { show: true },
          foreColor: 'var(--white-color)'
        },
        title: { text: 'BTC Candlestick', align: 'left' },
        xaxis: { type: 'datetime' }
      },
      series: [{
        name: 'Candlestick',
        data: [
          { x: new Date(1672820400000), y: [20500, 21000, 20200, 20800] },
          { x: new Date(1672824000000), y: [20800, 21250, 20700, 21100] },
          // ... more data points
        ]
      }]
    },
    area: {
      options: {
        chart: {
          type: 'area',
          height: 350,
          zoom: { enabled: true },
          toolbar: { autoSelected: 'zoom' }
        },
        title: { text: 'BTC Price Movement', align: 'left' },
        xaxis: { type: 'datetime' }
      },
      series: [{
        name: 'Close Price',
        data: [
          [1672820400000, 20800],
          [1672824000000, 21100],
          // ... additional data points
        ]
      }]
    },
    mixed: {
      options: {
        chart: {
          type: 'line',
          height: 350,
          toolbar: { show: true },
          foreColor: 'var(--white-color)'
        },
        title: { text: 'BTC Mixed Chart', align: 'left' },
        xaxis: { type: 'datetime' }
      },
      series: [
        {
          name: 'Close Price',
          type: 'line',
          data: [
            [1672820400000, 20800],
            [1672824000000, 21100],
            // ... additional data points
          ]
        },
        {
          name: 'Volume',
          type: 'column',
          data: [
            [1672820400000, 2500000],
            [1672824000000, 2700000],
            // ... additional data points
          ]
        }
      ]
    },
    zoomable: {
      options: {
        chart: {
          type: 'area',
          stacked: false,
          height: 350,
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true
          },
          toolbar: { autoSelected: 'zoom', show: true },
          foreColor: 'var(--white-color)'
        },
        dataLabels: { enabled: false },
        markers: { size: 0 },
        title: { text: 'BTC Zoomable Time Series', align: 'left' },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.5,
            opacityTo: 0,
            stops: [0, 90, 100]
          }
        },
        yaxis: {
          labels: {
            formatter: (val) => (val / 1000000).toFixed(0)
          },
          title: { text: 'Price' }
        },
        xaxis: { type: 'datetime' }
      },
      series: [{
        name: 'Close Price',
        data: [
          [1672820400000, 20800],
          [1672824000000, 21100],
          // ... additional data points
        ]
      }]
    }
  }
};

const stockImages = {
  AAPL: "https://1000logos.net/wp-content/uploads/2016/10/Apple-Logo.png"
};
const cryptoImages = {
  BTC: "https://media.istockphoto.com/id/1139020309/vector/bitcoin-internet-money-icon-vector.jpg?s=612x612&w=0&k=20&c=vcRUEDzhndMOctdM7PN1qmipo5rY_aOByWFW0IkW8bs="
};

const ViewStock = () => {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const detail = fakeDetailData[symbol] || fakeDetailData.AAPL;
  const chartDataBase = fakeChartData[symbol] || fakeChartData[detail.class === 'crypto' ? 'BTC' : 'AAPL'];
  const [chartType, setChartType] = useState('candlestick');
  const getChartConfig = () => {
    switch (chartType) {
      case 'candlestick':
        return chartDataBase.candlestick;
      case 'mixed':
        return chartDataBase.mixed;
      case 'zoomable':
        return chartDataBase.zoomable;
      case 'area-datetime':
      default:
        return chartDataBase.area;
    }
  };

  const chartConfig = getChartConfig();
  const logo = detail.class === 'crypto'
    ? cryptoImages[detail.symbol]
    : stockImages[detail.symbol];

  return (
    <>
      <Navbar />
      <style>{`
        .apexcharts-menu, .apexcharts-menu-item {
          background-color: var(--black-color) !important;
          color: var(--white-color) !important;
        }
      `}</style>
      <div className="p-4 bg-[var(--black-color)] text-[var(--white-color)] min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[var(--white-color)] text-[var(--black-color)] rounded-lg p-6 mb-6 shadow-lg">
            <div className="flex items-center">
              <img src={logo} alt={detail.symbol} className="w-16 h-16 mr-4" />
              <div>
                <h1 className="text-2xl font-bold">{detail.name}</h1>
                <p className="text-sm">{detail.symbol} • {detail.exchange}</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">Status:</p>
                <p>{detail.status}</p>
              </div>
              <div>
                <p className="font-semibold">Tradable:</p>
                <p>{detail.tradable ? "Yes" : "No"}</p>
              </div>
              <div>
                <p className="font-semibold">Fractionable:</p>
                <p>{detail.fractionable ? "Yes" : "No"}</p>
              </div>
              <div>
                <p className="font-semibold">Min Order Size:</p>
                <p>{detail.min_order_size}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 mb-4">
            {['candlestick', 'area-datetime', 'mixed', 'zoomable'].map((type) => (
              <button
                key={type}
                onClick={() => setChartType(type)}
                className={`px-4 py-2 rounded-md ${
                  chartType === type
                    ? 'bg-[var(--orange-color)] text-[var(--black-color)]'
                    : 'bg-[var(--white-color)] text-[var(--black-color)] hover:opacity-90'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>


          <div className="bg-[var(--black-color)] rounded-md shadow-lg mb-6 p-4">
            <ReactApexChart
              options={chartConfig.options}
              series={chartConfig.series}
              type={chartConfig.options.chart.type}
              height={350}
            />
          </div>
          <div className="flex justify-center gap-4">
            <button className="flex items-center gap-2 px-6 py-3 bg-green-500 text-[var(--white-color)] rounded-md shadow-md hover:bg-green-600">
              <FaArrowUp />
              Buy
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-red-500 text-[var(--white-color)] rounded-md shadow-md hover:bg-red-600">
              <FaArrowDown />
              Sell
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewStock;
