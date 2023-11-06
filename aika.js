// In formatTime.js
export function formatDepartureTime(departure, isRealtime) {
  // Choose the correct departure time based on the realtime flag
  const departureTimeInSeconds = isRealtime ? departure.realtimeDeparture : departure.scheduledDeparture;

  // Calculate hours and minutes from seconds
  const hours = Math.floor(departureTimeInSeconds / 3600);
  const minutes = Math.floor((departureTimeInSeconds % 3600) / 60);

  // Format time for display
  const formattedTime = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0');

  // Get the current time in seconds since midnight
  const now = new Date();
  const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const secondsSinceMidnight = (now - midnight) / 1000;

  // Calculate the time difference in minutes
  const timeDifference = (departureTimeInSeconds - secondsSinceMidnight) / 60;

  // Check if departure is less than 10 minutes away
  if (timeDifference < 10 && timeDifference > 0) { // Less than 10 minutes and in the future
    return `~${Math.floor(timeDifference)} min`;
  } else {
    return formattedTime;
  }
}
