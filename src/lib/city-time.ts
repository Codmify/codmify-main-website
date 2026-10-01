// Read the visitor's device time; the campaign schedule remains Africa/Lagos.
export function cityTime(date = new Date()) {
  const hour = date.getHours() + date.getMinutes() / 60;
  const phase = hour >= 6 && hour < 12 ? "Morning" : hour >= 12 && hour < 17 ? "Afternoon" : hour >= 17 && hour < 20 ? "Evening" : "Night";
  return { hour, phase, night: hour < 6 || hour >= 20 };
}
