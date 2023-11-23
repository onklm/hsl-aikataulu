export function getDepartureTime(stoptime) {
  if (stoptime.realtime) {
    return formatDepartureTime(stoptime.realtimeDeparture, true);
  }

  return formatDepartureTime(stoptime.scheduledDeparture);
}

function formatDepartureTime(secondsSinceMidnight, realtime = false) {
  const now = new Date();
  const secondsSinceMidnightNow = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();

  const departureInSeconds = secondsSinceMidnight - secondsSinceMidnightNow;

  if (departureInSeconds < 600) {
    return `${realtime ? '' : '~'}${Math.max(Math.floor(departureInSeconds / 60), 0)} min`;
  } else {
    const hours = Math.floor(secondsSinceMidnight / 3600);
    const minutes = Math.floor((secondsSinceMidnight % 3600) / 60);

    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}`;
  }
}
