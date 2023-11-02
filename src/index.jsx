import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './styles/tailwind.css';

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);

    return function cleanup() {
      clearInterval(timerID);
    };
  }, []);

  function tick() {
    setTime(new Date());
  }

  return (
    <div className="fixed top-0 right-0 m-4 p-4 bg-white text-black rounded shadow-lg text-4xl">
      {time.toLocaleTimeString('fi-FI', { hour: '2-digit', minute: '2-digit' })}
    </div>
  );
}




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

  return (
    <div className="min-h-screen bg-blue-800 text-white">
      <div className="container mx-auto mr-0 text-left p-4">
        <div className="flex justify-between items-center mb-6">
          {/* Lisätty Clock komponentti oikeaan yläkulmaan */}
          <div className="text-6xl"></div>
          <Clock />
        </div>

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
