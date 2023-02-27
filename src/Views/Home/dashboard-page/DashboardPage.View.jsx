import React, {useState} from 'react';
import {
  Chart as
    ChartJS,
  CategoryScale,
  LineElement,
  BarElement,
  RadialLinearScale,
  LinearScale,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import {Pie, PolarArea, Bubble, Bar, Doughnut, Line} from 'react-chartjs-2';
import faker from 'faker';
import Masonry from '@mui/lab/Masonry';
import {ButtonBase} from '@mui/material';
import {PopoverComponent} from 'Components';
import './DashboardPage.scss';

ChartJS.register(ArcElement, Tooltip, Legend, RadialLinearScale, LinearScale, PointElement, CategoryScale, BarElement, LineElement);

const DashboardPageView = () => {
  const [popoverAttachedWith, setPopoverAttachedWith] = useState(null);

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const bubbleData = {
    datasets: [
      {
        label: 'Red dataset',
        data: Array.from({length: 20}, () => ({
          x: faker.datatype.number({min: -100, max: 100}),
          y: faker.datatype.number({min: -100, max: 100}),
          r: faker.datatype.number({min: 5, max: 20}),
        })),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Blue dataset',
        data: Array.from({length: 30}, () => ({
          x: faker.datatype.number({min: -100, max: 100}),
          y: faker.datatype.number({min: -100, max: 100}),
          r: faker.datatype.number({min: 5, max: 20}),
        })),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const barOptions = {
    plugins: {
      title: {
        display: true,
        text: 'Chart.js Bar Chart - Stacked',
      },
    },
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  const barData = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => faker.datatype.number({min: -1000, max: 1000})),
        backgroundColor: 'rgb(255, 99, 132)',
        stack: 'Stack 0',
      },
      {
        label: 'Dataset 2',
        data: labels.map(() => faker.datatype.number({min: -1000, max: 1000})),
        backgroundColor: 'rgb(75, 192, 192)',
        stack: 'Stack 0',
      },
      {
        label: 'Dataset 3',
        data: labels.map(() => faker.datatype.number({min: -1000, max: 1000})),
        backgroundColor: 'rgb(53, 162, 235)',
        stack: 'Stack 1',
      },
    ],
  };

  const doughnutData = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: 'Chart.js Line Chart - Multi Axis',
      },
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const lineData = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => faker.datatype.number({min: -1000, max: 1000})),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        yAxisID: 'y',
      },
      {
        label: 'Dataset 2',
        data: labels.map(() => faker.datatype.number({min: -1000, max: 1000})),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        yAxisID: 'y1',
      },
    ],
  };

  return (
    <div className='dashboard-wrapper'>
      <div className='charts-wrapper'>
        <div className='chart-item is-number'>
          <div className='chart-actiion'>
            <ButtonBase onClick={(event) => setPopoverAttachedWith(event.target)} className='btns btns-icon bg-gray-light'>
              <span className='mdi mdi-dots-vertical' />
            </ButtonBase>
          </div>

          <span className='mdi mdi-cash-fast' />
          <div className='chart-title'>243 QAR</div>
          <div className='chart-body'>Revenue Today</div>
        </div>

        <div className='chart-item is-number'>
          <div className='chart-actiion'>
            <ButtonBase onClick={(event) => setPopoverAttachedWith(event.target)} className='btns btns-icon bg-gray-light'>
              <span className='mdi mdi-dots-vertical' />
            </ButtonBase>
          </div>

          <span className='mdi mdi-account-school-outline' />
          <div className='chart-title'>43 Students</div>
          <div className='chart-body'>Registered Today</div>
        </div>


        <div className='chart-item is-number'>
          <div className='chart-actiion'>
            <ButtonBase onClick={(event) => setPopoverAttachedWith(event.target)} className='btns btns-icon bg-gray-light'>
              <span className='mdi mdi-dots-vertical' />
            </ButtonBase>
          </div>

          <span className='mdi mdi-account-cancel-outline' />
          <div className='chart-title'>4 Students</div>
          <div className='chart-body'>Canceled Today</div>
        </div>

        <div className='chart-item is-number'>
          <div className='chart-actiion'>
            <ButtonBase onClick={(event) => setPopoverAttachedWith(event.target)} className='btns btns-icon bg-gray-light'>
              <span className='mdi mdi-dots-vertical' />
            </ButtonBase>
          </div>

          <span className='mdi mdi-credit-card-refund-outline' />
          <div className='chart-title'>31 QAR</div>
          <div className='chart-body'>Refunded Amount</div>
        </div>
      </div>

      <Masonry columns={4} spacing={2}>
        <div className='chart-item'><Pie data={data} /></div>
        <div className='chart-item'><Bubble options={options} data={bubbleData} /></div>
        <div className='chart-item'><PolarArea data={data} /></div>
        <div className='chart-item'><Doughnut data={doughnutData} /></div>
        <div className='chart-item'><Bar options={barOptions} data={barData} /></div>
        <div className='chart-item'><Line options={lineOptions} data={lineData} /></div>
      </Masonry>


      <PopoverComponent
        idRef="chartPopoverIdRef"
        attachedWith={popoverAttachedWith}
        handleClose={() => setPopoverAttachedWith(null)}
        component={
          <div className="more-actions-popover-wrapper">
            <ButtonBase
              id="chartsBtnId"
              className="btns theme-primary c-gray-darker"
              onClick={() => setPopoverAttachedWith(null)}
            >
              <span className='mdi mdi-calendar-today-outline mr-2' />
              Over Today
            </ButtonBase>

            <ButtonBase
              id="chartsBtnId"
              className="btns theme-primary c-gray-darker"
              onClick={() => setPopoverAttachedWith(null)}
            >
              <span className='mdi mdi-calendar-month-outline mr-2' />
              Over This Month
            </ButtonBase>

            <ButtonBase
              id="chartsBtnId"
              className="btns theme-primary c-gray-darker"
              onClick={() => setPopoverAttachedWith(null)}
            >
              <span className='mdi mdi-weather-cloudy-clock mr-2' />
              Over This Year
            </ButtonBase>

            <ButtonBase
              id="chartsBtnId"
              className="btns theme-primary c-gray-darker mr-2"
              onClick={() => setPopoverAttachedWith(null)}
            >
              <span className='mdi mdi-sigma mr-2' />
              Total
            </ButtonBase>
          </div>
        }
      />
    </div>
  );
};

export default DashboardPageView;
