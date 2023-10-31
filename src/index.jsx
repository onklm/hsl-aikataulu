import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './styles/tailwind.css';

function App() {
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ENDPOINT = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql';
    const query = `{
      stop(id: "HSL:2112401") {
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
      setLoading(false);
    });
  }, []);

  function formatTime(seconds) {
    const date = new Date(seconds * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  }

  return (
    <div className="min-h-screen bg-deepBlue text-white">
      {schedule && (
        <div className="container-fluid p-5 text-center">
          <h1 className="text-20l md:text-15xl lg:text-50xl xl:text-20xl">
            {schedule.name.replace('Leppävaaran asema', '')}
          </h1>
          
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-2 border-b border-white text-xl md:text-6xl">Linjanumero</th>
                <th className="p-2 border-b border-white text-xl md:text-6xl">Määränpää</th>
                <th className="p-2 border-b border-white text-xl md:text-6xl">Lähtöaika</th>
              </tr>
            </thead>
            <tbody>
              {schedule.stoptimesWithoutPatterns.map((stoptime, index) => (
                <tr key={index}>
                  <td className="p-2 border-b border-white text-xl md:text-7xl">{stoptime.trip.route.shortName}</td>
                  <td className="p-2 border-b border-white text-xl md:text-6xl">{stoptime.headsign}</td>
                  <td className="p-2 border-b border-white text-xl md:text-7xl">
                    <span className="pr-1">{formatTime(stoptime.scheduledArrival)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
