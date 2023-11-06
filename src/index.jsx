import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './styles/tailwind.css';
import {Clock} from './Clock';

function App() {
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ENDPOINT = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql';
    const STOP_ID = 'HSL:2112401';
    const query = `{
      stop(id: "${STOP_ID}") {
        name
        stoptimesWithoutPatterns(numberOfDepartures: 3) {
          realtimeDeparture
          trip {
            route {
              shortName
            }
          }
          headsign
        }
      }  
    }`;

    fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'digitransit-subscription-key': '236f334fa2644be08da8c3239c89fb3d',
      },
      body: JSON.stringify({ query })
    })
    .then(response => response.json())
    .then(data => {
      setSchedule(data.data.stop);
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching schedule:', error);
      setError('Failed to fetch schedule');
      setLoading(false);
    });
  }, []);

  function formatTime(seconds) {
    const date = new Date(seconds * 1000);
    const helsinkiOffset = date.getTimezoneOffset() + 120; // Helsingin aikavyöhyke on UTC+2
    date.setMinutes(date.getMinutes() + helsinkiOffset);
    return date.toISOString().substring(11, 16);
  }

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
            <tr></tr>
          </thead>
          <tbody>
            {schedule.stoptimesWithoutPatterns.map((stoptime, index) => (
              <tr key={index}>
                <td className="p-3 border-b border-white text-xl md:text-6xl">{stoptime.trip.route.shortName}</td>
                <td className="p-3 border-b border-white text-xl md:text-4xl">{stoptime.headsign}</td>
                <td className="p-3 border-b border-white text-xl md:text-8xl"></td>
                <td className="p-3 border-b border-white text-xl md:text-6xl">
                  <span className="pr-10">{formatTime(stoptime.realtimeDeparture)}</span>
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
