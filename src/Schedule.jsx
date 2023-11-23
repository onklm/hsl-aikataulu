import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Header } from './Header';
import { fetchSchedule } from './apiClient';
import { getDepartureTime } from './formatTime';

export function Schedule({ defaultStopId, stopType }) {
  const { stopId: paramStopId } = useParams();
  const stopId = paramStopId || defaultStopId;

  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let intervalId = null;

    async function getSchedule() {
      try {
        console.log(`Fetching schedule for '${stopId}', '${stopType}'`);
        const data = await fetchSchedule(stopId, stopType).catch(console.error);

        if (data) {
          console.log('Received: ', data);
          setSchedule(data[stopType]);
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

  if (error) {
    return <div className="mt-10">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-blue-800 text-white flex flex-col">
      <Header />

      {loading ? (
        <div className="flex justify-center items-center h-full mt-10">
          <p className="text-4xl">Loading...</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="w-full border-collapse mt-4">
            <thead>
              <tr>
                <th className="p-2 border-b border-white text-left text-xl lg:text-2xl">Linja</th>
                <th className="p-2 border-b border-white text-left text-xl lg:text-2xl">Määränpää</th>
                <th className="p-2 border-b border-white text-right text-xl lg:text-2xl">Aika / min</th>
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
      )}
    </div>
  );
}
