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
          scheduledArrival
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
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
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
    <div className="min-h-screen bg-deepBlue text-white">
      <div className="container mx-auto p-5 text-center">
        <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
          {schedule.name.replace('Leppävaaran asema', '')}
        </h1>
        
        <table className="w-full border-collapse">
          <thead>
            <tr>

            </tr>
          </thead>
          <tbody>
            {schedule.stoptimesWithoutPatterns.map((stoptime, index) => (
              <tr key={index}>
                <td className="p-2 border-b border-white text-xl md:text-8xl">{stoptime.trip.route.shortName}</td>
                <td className="p-2 border-b border-white text-xl md:text-7xl">{stoptime.headsign}</td>
                <td className="p-2 border-b border-white text-xl md:text-8xl">
                  <span className="pr-1">{formatTime(stoptime.scheduledArrival)}</span>
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
