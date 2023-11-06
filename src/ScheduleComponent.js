import React, { useEffect, useState } from 'react';
import { fetchSchedule } from './apiClient'; // Oleta, että tiedoston nimi on apiClient.js

const ScheduleComponent = () => {
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const STOP_ID = 'HSL:2112401';

    async function getSchedule() {
      try {
        const data = await fetchSchedule(STOP_ID);
        setSchedule(data.data.stop);
      } catch (error) {
        console.error('Error fetching schedule:', error);
        setError('Failed to fetch schedule');
      } finally {
        setLoading(false);
      }
    }

    getSchedule();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Renderöi aikataulu...
  // ...
};

export default ScheduleComponent;
