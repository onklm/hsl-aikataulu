const ENDPOINT = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql';

export async function fetchSchedule(stopId, stopType = 'stop') {
  const query = `{
    ${stopType}(id: "${stopId}") {
      name
      stoptimesWithoutPatterns(numberOfDepartures: 5) {
        realtime
        scheduledDeparture
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

console.log(query);

  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'digitransit-subscription-key': '236f334fa2644be08da8c3239c89fb3d',
    },
    body: JSON.stringify({ query })
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
}

