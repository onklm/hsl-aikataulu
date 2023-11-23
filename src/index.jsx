import React, { useEffect, useState } from 'react';
import { createRoot }  from 'react-dom/client';

import './styles/tailwind.css';
import { Header } from './Header';
import { fetchSchedule } from './apiClient';
import { getDepartureTime } from './formatTime';


function App() {
  const [stopId, setStopId] = useState('HSL:2112401');
  const [stopType, setStopType] = useState('stop');
  const [activeMenuItem, setActiveMenuItem] = useState('HSL:2112401'); // Lisätty aktiivisen valikkokohdan tila
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let intervalId = null;

    async function getSchedule() {
      try {
        console.log('Fetching schedule...');
        const data = await fetchSchedule(stopId, stopType).catch(console.error);
        console.log('Data received:', data);

        if (data) {
          setSchedule(data.data[stopType]);
        } else {
          console.log('No data received from fetchSchedule');
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching schedule:', error);
        setError('Failed to fetch schedule');
        setLoading(false);
      }
    }

    getSchedule();
    intervalId = setInterval(getSchedule, 15000);

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [stopId, stopType]);

  const handleMenuClick = (newStopId, newStopType = 'stop') => {
    setStopId(newStopId);
    setStopType(newStopType);
    setActiveMenuItem(newStopId);
  };

  const getMenuItemClass = (id) => {
    return `px-2 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-full ${id === activeMenuItem
        ? 'bg-white text-blue-800'
        : 'text-black hover:bg-gray-200 hover:text-blue-800'
      }`;
  };

  if (loading) {
    return <div className="mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="mt-10">Error: {error}</div>;
  }

  if (!schedule) {
    return <div className="mt-10">No schedule available</div>;
  }

  return (
    <div className="min-h-screen bg-blue-800 text-white flex flex-col">
      <Header
        handleMenuClick={handleMenuClick}
        getMenuItemClass={getMenuItemClass}
      />

      <div className="table-responsive">
        <table className="w-full border-collapse mt-4">
          <thead>
            <tr>
              <th className="p-2 border-b border-white text-2xl text-left">Linja</th>
              <th className="p-2 border-b border-white text-2xl text-left">Määränpää</th>
              <th className="p-2 border-b border-white text-2xl text-right">Aika / min</th>
            </tr>
          </thead>
          <tbody>
            {schedule.stoptimesWithoutPatterns.map((stoptime, index) => (
              <tr key={index}>
                <td className="p-2 border-b border-white text-4xl lg:text-6xl">{stoptime.trip.route.shortName}</td>
                <td className="p-2 border-b border-white lg:text-4xl">{stoptime.headsign}</td>
                <td className="p-2 border-b border-white text-4xl lg:text-6xl text-right">
                  {getDepartureTime(stoptime)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
