import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './styles/tailwind.css';

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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!schedule) {
    return <div>No schedule available</div>;
  }

  return (
    <div className="min-h-screen bg-blue-800 text-white">
      <div className="text-left p-4 ml-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="text-6xl">
        
          </div>
        </div>

        <table className="w-full border-collapse mt-4">
          <thead>
            <tr>
            </tr>
          </thead>
          <tbody>
            {schedule.stoptimesWithoutPatterns.map((stoptime, index) => (
              <tr key={index}>
                <td className="p-2 border-b border-white text-xl md:text-6xl text-left">{stoptime.trip.route.shortName}</td> {/* Lisätty text-left luokka tähän */}
                <td className="p-2 border-b border-white text-xl md:text-4xl text-left">{stoptime.headsign}</td> {/* Lisätty text-left luokka tähän */}
                <td className="p-2 border-b border-white text-xl md:text-8xl text-left">{/* Laituri/laiturit tiedot tähän */}</td> {/* Lisätty text-left luokka tähän */}
                <td className="p-2 border-b border-white text-xl md:text-6xl text-left">
                  <span className="pr-1">{formatTime(stoptime.realtimeDeparture)}</span>
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
