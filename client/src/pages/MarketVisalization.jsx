import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar'; 

const fakeData = {
  AAPL: {
    symbol: 'AAPL',
    bars: [
      {
        t: 1672820400000, // Day 0
        o: 145.3,
        h: 146.5,
        l: 144.9,
        c: 146.1,
        v: 120_000_000,
        n: 1200
      },
      {
        t: 1672906800000, // Day 1
        o: 146.1,
        h: 148.0,
        l: 145.8,
        c: 147.2,
        v: 130_000_000,
        n: 1400
      },
      {
        t: 1672993200000, // Day 2
        o: 147.2,
        h: 148.5,
        l: 144.0,
        c: 144.5,
        v: 110_000_000,
        n: 1150
      },
      {
        t: 1673079600000, // Day 3
        o: 144.8,
        h: 146.2,
        l: 144.3,
        c: 145.7,
        v: 100_000_000,
        n: 1000
      },
      {
        t: 1673166000000, // Day 4
        o: 145.5,
        h: 149.0,
        l: 145.1,
        c: 148.1,
        v: 150_000_000,
        n: 1600
      },
      {
        t: 1673252400000, // Day 5
        o: 148.2,
        h: 149.0,
        l: 146.2,
        c: 147.0,
        v: 125_000_000,
        n: 1400
      },
      {
        t: 1673338800000, // Day 6
        o: 147.0,
        h: 150.5,
        l: 146.5,
        c: 150.2,
        v: 135_000_000,
        n: 1500
      },
      {
        t: 1673425200000, // Day 7
        o: 150.3,
        h: 152.0,
        l: 149.8,
        c: 151.0,
        v: 140_000_000,
        n: 1550
      },
      {
        t: 1673511600000, // Day 8
        o: 150.9,
        h: 151.5,
        l: 148.5,
        c: 149.2,
        v: 110_000_000,
        n: 1300
      },
      {
        t: 1673598000000, // Day 9
        o: 149.5,
        h: 152.3,
        l: 148.9,
        c: 151.8,
        v: 160_000_000,
        n: 1700
      },
      // Additional data for AAPL:
      {
        t: 1673684400000, // Day 10
        o: 152.0,
        h: 153.0,
        l: 151.0,
        c: 152.5,
        v: 155_000_000,
        n: 1600
      },
      {
        t: 1673770800000, // Day 11
        o: 152.5,
        h: 153.5,
        l: 151.8,
        c: 153.0,
        v: 150_000_000,
        n: 1580
      },
      {
        t: 1673857200000, // Day 12
        o: 153.0,
        h: 154.5,
        l: 152.2,
        c: 154.0,
        v: 160_000_000,
        n: 1650
      },
      {
        t: 1673943600000, // Day 13
        o: 154.0,
        h: 155.0,
        l: 153.5,
        c: 154.8,
        v: 170_000_000,
        n: 1620
      },
      {
        t: 1674030000000, // Day 14
        o: 154.8,
        h: 156.0,
        l: 154.0,
        c: 155.2,
        v: 165_000_000,
        n: 1600
      },
      {
        t: 1674116400000, // Day 15
        o: 155.2,
        h: 156.5,
        l: 154.9,
        c: 156.0,
        v: 175_000_000,
        n: 1650
      },
      {
        t: 1674202800000, // Day 16
        o: 156.0,
        h: 157.0,
        l: 155.0,
        c: 156.8,
        v: 180_000_000,
        n: 1700
      },
      {
        t: 1674289200000, // Day 17
        o: 156.8,
        h: 157.5,
        l: 155.5,
        c: 157.0,
        v: 170_000_000,
        n: 1680
      },
      {
        t: 1674375600000, // Day 18
        o: 157.0,
        h: 158.0,
        l: 156.2,
        c: 157.5,
        v: 165_000_000,
        n: 1670
      },
      {
        t: 1674462000000, // Day 19
        o: 157.5,
        h: 159.0,
        l: 157.0,
        c: 158.2,
        v: 170_000_000,
        n: 1700
      }
    ]
  }
  ,  
  TSLA: {
    symbol: 'TSLA',
    bars: [
      {
        t: 1672820400000,
        o: 220.3,
        h: 225.4,
        l: 219.1,
        c: 224.9,
        v: 300_100_000,
        n: 2200
      },
      {
        t: 1672906800000,
        o: 224.9,
        h: 227.6,
        l: 223.5,
        c: 226.2,
        v: 330_500_000,
        n: 2250
      },
      {
        t: 1672993200000,
        o: 226.2,
        h: 228.0,
        l: 224.4,
        c: 227.1,
        v: 310_000_000,
        n: 2100
      },
      {
        t: 1673079600000,
        o: 227.1,
        h: 229.2,
        l: 226.3,
        c: 228.7,
        v: 280_000_000,
        n: 2150
      },
      {
        t: 1673166000000,
        o: 228.7,
        h: 230.5,
        l: 226.5,
        c: 229.8,
        v: 290_000_000,
        n: 2300
      },
      {
        t: 1673252400000,
        o: 229.8,
        h: 232.2,
        l: 228.1,
        c: 231.5,
        v: 270_000_000,
        n: 2000
      },
      {
        t: 1673338800000,
        o: 231.5,
        h: 235.0,
        l: 230.2,
        c: 234.3,
        v: 320_000_000,
        n: 2400
      },
      {
        t: 1673425200000,
        o: 234.3,
        h: 236.2,
        l: 232.1,
        c: 235.8,
        v: 310_000_000,
        n: 2250
      },
      {
        t: 1673511600000,
        o: 235.8,
        h: 237.5,
        l: 234.2,
        c: 235.0,
        v: 290_000_000,
        n: 2200
      },
      {
        t: 1673598000000,
        o: 235.0,
        h: 238.1,
        l: 233.5,
        c: 237.2,
        v: 330_000_000,
        n: 2450
      }
    ]
  },
  AMZN: {
    symbol: 'AMZN',
    bars: [
      {
        t: 1672820400000,
        o: 97.3,
        h: 98.4,
        l: 96.9,
        c: 98.0,
        v: 150_710_000,
        n: 1300
      },
      {
        t: 1672906800000,
        o: 98.0,
        h: 99.6,
        l: 97.1,
        c: 98.6,
        v: 140_500_000,
        n: 1250
      },
      {
        t: 1672993200000,
        o: 98.6,
        h: 100.0,
        l: 98.4,
        c: 99.4,
        v: 170_000_000,
        n: 1200
      },
      {
        t: 1673079600000,
        o: 99.4,
        h: 101.2,
        l: 98.5,
        c: 100.3,
        v: 190_000_000,
        n: 1100
      },
      {
        t: 1673166000000,
        o: 100.3,
        h: 101.0,
        l: 98.7,
        c: 99.2,
        v: 160_000_000,
        n: 1150
      },
      {
        t: 1673252400000,
        o: 99.2,
        h: 101.5,
        l: 98.2,
        c: 101.1,
        v: 180_000_000,
        n: 1200
      },
      {
        t: 1673338800000,
        o: 101.1,
        h: 102.2,
        l: 100.8,
        c: 101.7,
        v: 175_000_000,
        n: 1100
      },
      {
        t: 1673425200000,
        o: 101.7,
        h: 102.8,
        l: 100.9,
        c: 102.3,
        v: 165_000_000,
        n: 1200
      },
      {
        t: 1673511600000,
        o: 102.3,
        h: 103.0,
        l: 101.1,
        c: 102.8,
        v: 170_000_000,
        n: 1250
      },
      {
        t: 1673598000000,
        o: 102.8,
        h: 104.2,
        l: 102.0,
        c: 103.5,
        v: 190_000_000,
        n: 1350
      }
    ]
  },
  GOOG: {
    symbol: 'GOOG',
    bars: [
      {
        t: 1672820400000,
        o: 99.0,
        h: 100.2,
        l: 98.4,
        c: 99.5,
        v: 110_000_000,
        n: 1000
      },
      {
        t: 1672906800000,
        o: 99.5,
        h: 100.8,
        l: 99.0,
        c: 100.3,
        v: 115_000_000,
        n: 1100
      },
      {
        t: 1672993200000,
        o: 100.3,
        h: 101.0,
        l: 99.2,
        c: 99.9,
        v: 105_000_000,
        n: 1050
      },
      {
        t: 1673079600000,
        o: 99.9,
        h: 101.5,
        l: 99.5,
        c: 100.7,
        v: 120_000_000,
        n: 1200
      },
      {
        t: 1673166000000,
        o: 100.7,
        h: 101.2,
        l: 99.8,
        c: 100.1,
        v: 130_000_000,
        n: 1250
      },
      {
        t: 1673252400000,
        o: 100.1,
        h: 101.8,
        l: 99.6,
        c: 101.3,
        v: 115_000_000,
        n: 1100
      },
      {
        t: 1673338800000,
        o: 101.3,
        h: 102.2,
        l: 100.9,
        c: 101.8,
        v: 100_000_000,
        n: 1000
      },
      {
        t: 1673425200000,
        o: 101.8,
        h: 102.5,
        l: 101.0,
        c: 102.1,
        v: 125_000_000,
        n: 1300
      },
      {
        t: 1673511600000,
        o: 102.1,
        h: 103.0,
        l: 101.2,
        c: 102.6,
        v: 130_000_000,
        n: 1350
      },
      {
        t: 1673598000000,
        o: 102.6,
        h: 103.5,
        l: 101.8,
        c: 103.1,
        v: 140_000_000,
        n: 1400
      }
    ]
  },
  MSFT: {
    symbol: 'MSFT',
    bars: [
      {
        t: 1672820400000,
        o: 250.3,
        h: 252.5,
        l: 249.2,
        c: 251.4,
        v: 80_000_000,
        n: 950
      },
      {
        t: 1672906800000,
        o: 251.4,
        h: 253.0,
        l: 250.5,
        c: 252.2,
        v: 90_000_000,
        n: 1000
      },
      {
        t: 1672993200000,
        o: 252.2,
        h: 254.0,
        l: 251.2,
        c: 253.5,
        v: 85_000_000,
        n: 980
      },
      {
        t: 1673079600000,
        o: 253.5,
        h: 255.0,
        l: 252.1,
        c: 254.2,
        v: 88_000_000,
        n: 990
      },
      {
        t: 1673166000000,
        o: 254.2,
        h: 256.2,
        l: 253.0,
        c: 255.8,
        v: 100_000_000,
        n: 1100
      },
      {
        t: 1673252400000,
        o: 255.8,
        h: 257.0,
        l: 254.5,
        c: 256.2,
        v: 95_000_000,
        n: 1050
      },
      {
        t: 1673338800000,
        o: 256.2,
        h: 258.5,
        l: 255.9,
        c: 257.9,
        v: 90_000_000,
        n: 990
      },
      {
        t: 1673425200000,
        o: 257.9,
        h: 259.0,
        l: 256.5,
        c: 258.4,
        v: 92_000_000,
        n: 1020
      },
      {
        t: 1673511600000,
        o: 258.4,
        h: 260.0,
        l: 257.2,
        c: 259.5,
        v: 98_000_000,
        n: 1080
      },
      {
        t: 1673598000000,
        o: 259.5,
        h: 261.2,
        l: 258.8,
        c: 260.7,
        v: 105_000_000,
        n: 1200
      }
    ]
  },
  BTC: {
    symbol: 'BTC',
    bars: [
      {
        t: 1672820400000,
        o: 20500,
        h: 21000,
        l: 20200,
        c: 20800,
        v: 2_500_000,
        n: 5000
      },
      {
        t: 1672906800000,
        o: 20800,
        h: 21250,
        l: 20700,
        c: 21100,
        v: 2_700_000,
        n: 5500
      },
      {
        t: 1672993200000,
        o: 21100,
        h: 21500,
        l: 21000,
        c: 21350,
        v: 3_000_000,
        n: 6000
      },
      {
        t: 1673079600000,
        o: 21350,
        h: 21600,
        l: 21200,
        c: 21550,
        v: 2_800_000,
        n: 5800
      },
      {
        t: 1673166000000,
        o: 21550,
        h: 21700,
        l: 21400,
        c: 21620,
        v: 2_900_000,
        n: 5900
      },
      {
        t: 1673252400000,
        o: 21620,
        h: 22000,
        l: 21500,
        c: 21800,
        v: 3_100_000,
        n: 6100
      },
      {
        t: 1673338800000,
        o: 21800,
        h: 22300,
        l: 21700,
        c: 22100,
        v: 3_200_000,
        n: 6200
      },
      {
        t: 1673425200000,
        o: 22100,
        h: 22500,
        l: 22000,
        c: 22400,
        v: 3_300_000,
        n: 6300
      },
      {
        t: 1673511600000,
        o: 22400,
        h: 22700,
        l: 22300,
        c: 22600,
        v: 3_400_000,
        n: 6400
      },
      {
        t: 1673598000000,
        o: 22600,
        h: 22900,
        l: 22500,
        c: 22850,
        v: 3_500_000,
        n: 6500
      }
    ]
  },
  ETH: {
    symbol: 'ETH',
    bars: [
      {
        t: 1672820400000,
        o: 1500,
        h: 1520,
        l: 1485,
        c: 1510,
        v: 1_800_000,
        n: 3000
      },
      {
        t: 1672906800000,
        o: 1510,
        h: 1530,
        l: 1500,
        c: 1525,
        v: 1_900_000,
        n: 3100
      },
      {
        t: 1672993200000,
        o: 1525,
        h: 1550,
        l: 1515,
        c: 1535,
        v: 2_000_000,
        n: 3200
      },
      {
        t: 1673079600000,
        o: 1535,
        h: 1560,
        l: 1530,
        c: 1550,
        v: 1_950_000,
        n: 3150
      },
      {
        t: 1673166000000,
        o: 1550,
        h: 1575,
        l: 1540,
        c: 1568,
        v: 2_100_000,
        n: 3300
      },
      {
        t: 1673252400000,
        o: 1568,
        h: 1580,
        l: 1550,
        c: 1572,
        v: 2_000_000,
        n: 3200
      },
      {
        t: 1673338800000,
        o: 1572,
        h: 1595,
        l: 1560,
        c: 1582,
        v: 2_050_000,
        n: 3250
      },
      {
        t: 1673425200000,
        o: 1582,
        h: 1600,
        l: 1570,
        c: 1590,
        v: 2_200_000,
        n: 3400
      },
      {
        t: 1673511600000,
        o: 1590,
        h: 1610,
        l: 1580,
        c: 1602,
        v: 2_300_000,
        n: 3500
      },
      {
        t: 1673598000000,
        o: 1602,
        h: 1620,
        l: 1595,
        c: 1610,
        v: 2_400_000,
        n: 3600
      }
    ]
  }
};

const famousStockSymbols = ['AAPL', 'TSLA', 'AMZN', 'MSFT'];
const famousCryptoSymbols = ['BTC', 'ETH', 'LTC', 'XRP'];


const stockImages = {
  AAPL: "https://1000logos.net/wp-content/uploads/2016/10/Apple-Logo.png",
  TSLA: "https://images.seeklogo.com/logo-png/32/2/tesla-logo-png_seeklogo-329764.png",
  AMZN: "https://i.pinimg.com/originals/01/ca/da/01cada77a0a7d326d85b7969fe26a728.jpg",
  MSFT: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGakmtD9KmyEVkjHPNDlieQrJeosrX7HVj_g&s"
};

const cryptoImages = {
  BTC: "https://media.istockphoto.com/id/1139020309/vector/bitcoin-internet-money-icon-vector.jpg?s=612x612&w=0&k=20&c=vcRUEDzhndMOctdM7PN1qmipo5rY_aOByWFW0IkW8bs=",
  ETH: "https://cdn.pixabay.com/photo/2021/05/24/09/15/ethereum-6278326_1280.png",
  LTC: "https://www.shutterstock.com/image-vector/litecoin-symbol-vector-illustration-ltc-260nw-1806389452.jpg",
  XRP: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ050STDN9zDIEbLe6aKtla6JcdqB5NjBpP7g&s"
};

const HamburgerMenu = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 bg-[var(--orange-color)] text-[var(--black-color)] border border-[var(--orange-color)] rounded-md focus:outline-none"
      >
        {open ? (
          <XIcon className="h-6 w-6" />
        ) : (
          <MenuIcon className="h-6 w-6" />
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-[var(--white-color)] text-[var(--black-color)] shadow-lg rounded-md z-10">
          <a href="#home" className="block px-4 py-2 hover:bg-[var(--orange-color)]">Home</a>
          <a href="#about" className="block px-4 py-2 hover:bg-[var(--orange-color)]">About</a>
          <a href="#contact" className="block px-4 py-2 hover:bg-[var(--orange-color)]">Contact</a>
        </div>
      )}
    </div>
  );
};

const ChartSection = ({ title, data, famousSymbols, images }) => {
  const [currentSymbol, setCurrentSymbol] = useState(famousSymbols[0]);
  const [searchQuery, setSearchQuery] = useState(famousSymbols[0]);
  const [chartType, setChartType] = useState('candlestick');
  const [timeline, setTimeline] = useState('one_year');
  const navigate = useNavigate(); 

  const currentData = data[currentSymbol] || null;

  const handleCardClick = (sym) => {
    setCurrentSymbol(sym);
    setSearchQuery(sym);
  };

  const getCandlestickSeries = () => {
    return currentData.bars.map((bar) => ({
      x: new Date(bar.t),
      y: [bar.o, bar.h, bar.l, bar.c]
    }));
  };

  const handleViewClick = () => {
    if (title === "Stocks") {
      navigate(`/view-stock/${currentSymbol}`);
    } else if (title === "Crypto") {
      navigate(`/view-crypto/${currentSymbol}`);
    }
  };

  const getCloseSeries = () => {
    return currentData.bars.map(bar => [bar.t, bar.c]);
  };

  const getCandlestickOptions = () => ({
    chart: {
      type: 'candlestick',
      height: 350,
      toolbar: {
        show: true
      },
      foreColor: 'var(--white-color)'
    },
    title: { text: `${currentSymbol} ${title} Chart`, align: 'left', style: { color: 'var(--orange-color)' } },
    xaxis: { type: 'datetime' },
    tooltip: {
      shared: true,
      background: 'var(--orange-color)',
      custom: ({ seriesIndex, dataPointIndex, w }) => {
        const o = w.globals.seriesCandleO[seriesIndex][dataPointIndex];
        const h = w.globals.seriesCandleH[seriesIndex][dataPointIndex];
        const l = w.globals.seriesCandleL[seriesIndex][dataPointIndex];
        const c = w.globals.seriesCandleC[seriesIndex][dataPointIndex];
        return `
          <div class="apexcharts-tooltip-candlestick text-[var(--black-color)] bg-[var(--orange-color)] p-2 rounded">
            <div>Open: <strong>${o}</strong></div>
            <div>High: <strong>${h}</strong></div>
            <div>Low: <strong>${l}</strong></div>
            <div>Close: <strong>${c}</strong></div>
          </div>
        `;
      }
    }
  });

  const getAreaDatetimeOptions = () => ({
    chart: {
      id: 'area-datetime',
      type: 'area',
      height: 350,
      zoom: { autoScaleYaxis: true },
      toolbar: {
        show: true
      },
      foreColor: 'var(--white-color)'
    },
    title: { text: `${currentSymbol} ${title} Area Chart`, align: 'left', style: { color: 'var(--orange-color)' } },
    annotations: {
      yaxis: [{
        y: 0,
        borderColor: '#999',
        label: { show: true, text: 'Support', style: { color: "#fff", background: '#00E396' } }
      }],
      xaxis: [{
        x: new Date(currentData.bars[0].t).getTime(),
        borderColor: '#999',
        label: { show: true, text: 'Start', style: { color: "#fff", background: '#775DD0' } }
      }]
    },
    dataLabels: { enabled: false },
    markers: { size: 0, style: 'hollow' },
    xaxis: { type: 'datetime', tickAmount: 6 },
    tooltip: { x: { format: 'dd MMM yyyy' } },
    fill: {
      type: 'gradient',
      gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.9, stops: [0, 100] }
    }
  });

  const getMixedOptions = () => ({
    chart: {
      type: 'line',
      height: 350,
      toolbar: { show: true },
      foreColor: 'var(--white-color)'
    },
    title: { text: `${currentSymbol} ${title} Mixed Chart`, align: 'left', style: { color: 'var(--orange-color)' } },
    stroke: { width: [2, 0, 2] },
    xaxis: { type: 'datetime' },
    tooltip: { shared: true },
    plotOptions: { bar: { columnWidth: '50%' } }
  });

  const getZoomableOptions = () => ({
    chart: {
      type: 'area',
      stacked: false,
      height: 350,
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true
      },
      toolbar: {
        autoSelected: 'zoom',
        show: true
      },
      foreColor: 'var(--white-color)'
    },
    dataLabels: { enabled: false },
    markers: { size: 0 },
    title: {
      text: `${currentSymbol} Zoomable Time Series`,
      align: 'left',
      style: { color: 'var(--orange-color)' }
    },
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
        formatter: function (val) {
          return (val / 1000000).toFixed(0);
        }
      },
      title: { text: 'Price' }
    },
    xaxis: { type: 'datetime' },
    tooltip: {
      shared: false,
      y: {
        formatter: function (val) {
          return (val / 1000000).toFixed(0);
        }
      }
    }
  });

  const getChartOptions = () => {
    switch (chartType) {
      case 'candlestick':
        return { options: getCandlestickOptions(), series: [{ name: 'Candlestick', data: getCandlestickSeries() }] };
      case 'area-datetime':
        return { options: getAreaDatetimeOptions(), series: [{ name: 'Close Price', data: getCloseSeries() }] };
      case 'mixed':
        return {
          options: {
            chart: { type: 'line', height: 350, toolbar: { show: true }, foreColor: 'var(--white-color)' },
            title: { text: `${currentSymbol} ${title} Mixed Chart`, align: 'left', style: { color: 'var(--orange-color)' } },
            stroke: { width: [2, 0, 2] },
            xaxis: { type: 'datetime' },
            tooltip: { shared: true },
            plotOptions: { bar: { columnWidth: '50%' } }
          },
          series: [
            { name: 'Close Price', type: 'line', data: getCloseSeries() },
            { name: 'Volume', type: 'column', data: currentData.bars.map(bar => [bar.t, bar.v]) },
            { name: 'Open Price', type: 'area', data: currentData.bars.map(bar => [bar.t, bar.o]) }
          ]
        };
      case 'zoomable':
        return { options: getZoomableOptions(), series: [{ name: 'Close Price', data: getCloseSeries() }] };
      default:
        return { options: getCandlestickOptions(), series: [{ name: 'Candlestick', data: getCandlestickSeries() }] };
    }
  };

  const updateTimeline = (range) => {
    setTimeline(range);
    const { options } = getChartOptions();
    switch (range) {
      case 'one_month':
        options.xaxis.min = new Date('2023-01-01').getTime();
        options.xaxis.max = new Date('2023-02-01').getTime();
        break;
      case 'six_months':
        options.xaxis.min = new Date('2022-09-01').getTime();
        options.xaxis.max = new Date('2023-02-01').getTime();
        break;
      case 'one_year':
        options.xaxis.min = new Date('2022-02-01').getTime();
        options.xaxis.max = new Date('2023-02-01').getTime();
        break;
      case 'ytd':
        options.xaxis.min = new Date('2023-01-01').getTime();
        options.xaxis.max = new Date('2023-02-01').getTime();
        break;
      case 'all':
        delete options.xaxis.min;
        delete options.xaxis.max;
        break;
      default:
        break;
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.trim().toUpperCase();
    if (!query) return;
    if (data[query]) {
      setCurrentSymbol(query);
    } else {
      alert(`No fake data found for symbol "${query}" in ${title}.`);
    }
  };

  const { options, series } = currentData ? getChartOptions() : { options: {}, series: [] };

  return (
    <div className="mb-16">
       <style>{`
          .apexcharts-menu, .apexcharts-menu-item {
            background-color: var(--black-color) !important;
            color: var(--white-color) !important;
          }
          .apexcharts-menu-icon {
            fill: var(--white-color) !important;
          }
        `}</style>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
  
      <div
        className="grid gap-2 mb-4"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))' }}
      >
        {famousSymbols.map((sym) => (
          <div
            key={sym}
            onClick={() => handleCardClick(sym)}
            className={`cursor-pointer border rounded-lg p-2 text-center bg-[var(--white-color)] ${
              currentSymbol === sym ? 'border-4 border-[var(--orange-color)]' : 'border'
            }`}
            style={{ height: '140px' }}
          >
            <img
              src={images[sym]}
              alt={sym}
              className="mx-auto mb-2"
              style={{ width: '50px', height: '50px', objectFit: 'contain' }}
            />
            <div className="font-bold text-[var(--black-color)] text-sm">{sym}</div>
            <div className="text-xs text-[var(--black-color)]">Company Name</div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          placeholder={`Search symbol (e.g. ${famousSymbols.join(', ')})`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-4 py-2 rounded-md bg-[var(--white-color)] text-[var(--black-color)]"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-[var(--orange-color)] hover:opacity-90 text-[var(--black-color)]"
        >
          Search
        </button>
      </form>
      <div className="flex items-center gap-4 mb-4">
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
            {type === 'candlestick'
              ? 'Candlestick'
              : type === 'area-datetime'
              ? 'Area Datetime'
              : type === 'mixed'
              ? 'Mixed Chart'
              : 'Zoomable'}
          </button>
        ))}
      </div>

      {chartType === 'area-datetime' && (
        <div className="flex items-center gap-2 mb-4">
          {['one_month', 'six_months', 'one_year', 'ytd', 'all'].map((range) => (
            <button
              key={range}
              onClick={() => updateTimeline(range)}
              className={`px-3 py-1 rounded ${
                timeline === range ? 'bg-[var(--orange-color)] text-[var(--black-color)]' : 'bg-[var(--white-color)] text-[var(--black-color)] hover:opacity-90'
              }`}
            >
              {range.toUpperCase()}
            </button>
          ))}
        </div>
      )}
      <div className="w-full h-[500px] bg-[var(--black-color)] rounded-md shadow-lg mb-4">
        {currentData ? (
          <ReactApexChart options={options} series={series} type={options.chart.type} height={350} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-gray-400">No data loaded.</p>
          </div>
        )}
      </div>
      <div className="text-center">
        <button className="px-6 py-2 rounded-md bg-[var(--orange-color)] hover:opacity-90 text-[var(--black-color)]" onClick={handleViewClick}>
          View
        </button>
      </div>
    </div>
  );
};

export default function MarketVisualization() {
  return (
    <>
      
      <Navbar />
      <ChartSection
        title="Stocks"
        data={fakeData}
        famousSymbols={famousStockSymbols}
        images={stockImages}
      />

      <ChartSection
        title="Crypto"
        data={fakeData}
        famousSymbols={famousCryptoSymbols}
        images={cryptoImages}
      />
    </>
  );
}
