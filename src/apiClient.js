const ENDPOINT = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql';

export async function fetchSchedule(stopId) {
  const query = `{
    stop(id: "${stopId}") {
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

