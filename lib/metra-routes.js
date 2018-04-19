const json = [
  "schedule/stops",
  "schedule/stop_times",
  "schedule.stop_times/:tripId",  
  "schedule/trips",
  "schedule/shapes",
  "schedule/routes",
  "schedule/calendar",
  "schedule/calendar_dates",
  "schedule/agency",
  "alerts",
  "positions",
  "tripUpdates"
];

const raw = [
  "raw/schedule.zip",
  "raw/positionUpdates.dat",
  "raw/tripUpdates.dat",
  "raw/alerts.dat"
];

module.exports = {
  url: "https://gtfsapi.metrarail.com/gtfs",
  resources: { json, raw }
}
