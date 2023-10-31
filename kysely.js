
const ENDPOINT = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql';
const query = `

{
    stop(id: "HSL:2112401") {
      name
      stoptimesWithoutPatterns(numberOfDepartures: 3) {
        scheduledArrival
        realtimeArrival
        trip {
          route {
            shortName
          }
        }
        realtime
        realtimeState
        headsign
      }
    }  
  } 
`

fetch(ENDPOINT, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'digitransit-subscription-key': '236f334fa2644be08da8c3239c89fb3d',
  },
  body: JSON.stringify({ query })
})
.then(r => r.json())
.then(data => console.log(data));