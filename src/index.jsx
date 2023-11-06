import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import './styles/tailwind.css';

import { Clock } from './Clock';
import { fetchSchedule } from './apiClient';

import { formatDepartureTime } from './formatTime';

function App() {
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const STOP_ID = 'HSL:2112401';
    let intervalId = null; // Tallentaa intervalId:n myöhempää käyttöä varten

    async function getSchedule() {
      try {
        const data = await fetchSchedule(STOP_ID);
        setSchedule(data.data.stop);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching schedule:', error);
        setError('Failed to fetch schedule');
        setLoading(false);
      }
    }

    getSchedule();

    // Aseta päivitys tapahtumaan joka 15 sekuntti
    intervalId = setInterval(getSchedule, 15000);

    // Puhdistusfunktio, joka suoritetaan, kun komponentti poistetaan DOM:sta
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

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
        <span className="text-xl font-bold"></span>
        <div className=""> {/* Lisätty responsive fontti-koko */}
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
                  {formatDepartureTime(stoptime.realtimeDeparture)}
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
