const ENDPOINT = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql';

export async function fetchSchedule(stopId, stopType = 'stop') {
  const query = `{
    ${stopType}(id: "${stopId}") {
      name
      stoptimesWithoutPatterns(numberOfDepartures: 8, omitNonPickups:true) {
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

  const data = await response.json();
  
  // Tarkistetaan, että saimme datan ja että se sisältää pysähtymisajat
  if (data.data && data.data[stopType] && data.data[stopType].stoptimesWithoutPatterns) {
    // Suodatetaan pois Kirkkonummen juna
    const filteredStoptimes = data.data[stopType].stoptimesWithoutPatterns.filter(
      stoptime => stoptime.headsign !== 'Kirkkonummi'
    );

    // Asetetaan data.data[stopType].stoptimesWithoutPatterns olemaan suodatettu lista
    data.data[stopType].stoptimesWithoutPatterns = filteredStoptimes;
  }

  return data;
}

