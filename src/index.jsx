import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import './styles/tailwind.css';

import { Clock } from './Clock';
import { fetchSchedule } from './apiClient';

import { getDepartureTime } from './formatTime';

function App() {
  const [stopId, setStopId] = useState('HSL:2112401');
  const [activeMenuItem, setActiveMenuItem] = useState('HSL:2112401'); // Lisätty aktiivisen valikkokohdan tila
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let intervalId = null;

    async function getSchedule() {
      try {
        const data = await fetchSchedule(stopId);
        setSchedule(data.data.stop);
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
  }, [stopId]);

  const handleMenuClick = (newStopId) => {
    setStopId(newStopId);
    setActiveMenuItem(newStopId); // Päivittää aktiivisen valikkokohdan
  };

  const getMenuItemClass = (id) => {
    return `px-4 py-2 text-sm font-semibold rounded-full ${
      id === activeMenuItem ? 'text-black bg-white' : 'text-white hover:bg-gray-200'
    }`;
  };

  // Lataus, virhe ja tietojen tarkastelu
  if (loading) {
    return <div className="mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="mt-10">Error: {error}</div>;
  }

  if (!schedule) {
    return <div className="mt-10">No schedule available</div>;
  }


  // Tämä osa on nyt korjattu ja sijoitettu oikein
  return (
    <div className="min-h-screen bg-blue-800 text-white flex flex-col">
      <header className="p-0 flex justify-between items-center shadow-md">
        <nav className="flex">
          <a href="#" onClick={() => handleMenuClick('HSL:2112401')} className={getMenuItemClass('HSL:2112401')}>sello(15)</a>
          <a href="#" onClick={() => handleMenuClick('HSL:2112402')} className={getMenuItemClass('HSL:2112402')}>sello(juna)</a>
          <a href="#" onClick={() => handleMenuClick('HSL:2112403')} className={getMenuItemClass('HSL:2112403')}>otaniemi(15)</a>
          <a href="#" onClick={() => handleMenuClick('HSL:2112404')} className={getMenuItemClass('HSL:2112404')}>koti(113)</a>
        </nav>

        <span className="text-xl font-bold"></span>
        <div className="">
          <Clock />
        </div>
      </header>



      <div className="flex-grow container mx-auto p-4">
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
                <td className="p-2 border-b border-white text-6xl">{stoptime.trip.route.shortName}</td>
                <td className="p-2 border-b border-white text-4xl">{stoptime.headsign}</td>
                <td className="p-2 border-b border-white text-6xl text-right">
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

ReactDOM.render(<App />, document.getElementById('root'));
