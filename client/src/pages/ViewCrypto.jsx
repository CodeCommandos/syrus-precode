import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';


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


const fakeDetailData = {
  BTC: {
    id: "cde1234f-abc1-5678-def0-1234567890ab",
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
  },
  ETH: {
    id: "def5678a-1234-9abc-ef01-234567890abc",
    cusip: null,
    class: "crypto",
    exchange: "CRYPTO",
    symbol: "ETH",
    name: "Ethereum",
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
    min_order_size: "0.01",
    min_trade_increment: "0.0001",
    price_increment: "0.01"
  }
};

// Fake chart configurations for details (default to candlestick)
const fakeChartData = {
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
  },
  ETH: {
    candlestick: {
      options: {
        chart: {
          type: 'candlestick',
          height: 350,
          toolbar: { show: true },
          foreColor: 'var(--white-color)'
        },
        title: { text: 'ETH Candlestick', align: 'left' },
        xaxis: { type: 'datetime' }
      },
      series: [{
        name: 'Candlestick',
        data: [
          { x: new Date(1672820400000), y: [1500, 1520, 1485, 1510] },
          { x: new Date(1672824000000), y: [1510, 1530, 1500, 1525] },
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
        title: { text: 'ETH Price Movement', align: 'left' },
        xaxis: { type: 'datetime' }
      },
      series: [{
        name: 'Close Price',
        data: [
          [1672820400000, 1510],
          [1672824000000, 1525],
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
        title: { text: 'ETH Mixed Chart', align: 'left' },
        xaxis: { type: 'datetime' }
      },
      series: [
        {
          name: 'Close Price',
          type: 'line',
          data: [
            [1672820400000, 1510],
            [1672824000000, 1525],
            // ... additional data points
          ]
        },
        {
          name: 'Volume',
          type: 'column',
          data: [
            [1672820400000, 1800000],
            [1672824000000, 1900000],
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
        title: { text: 'ETH Zoomable Time Series', align: 'left' },
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
          [1672820400000, 1510],
          [1672824000000, 1525],
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
