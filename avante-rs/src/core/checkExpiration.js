export function timeUntilExpiration(createdAt, timeString) {
  const [datePart, timePart] = createdAt.split(" ");
  const [day, month, year] = datePart.split("/").map(Number);
  const [hours, minutes] = timePart.split(":").map(Number);
  const createdAtDate = new Date(year, month - 1, day, hours, minutes);

  const now = new Date();

  const timeToMilliseconds = (timeStr) => {
    const [value, unit] = timeStr.split(" ");
    const number = parseInt(value, 10);

    if (unit === "minuto" || unit === "minutos") {
      return number * 60 * 1000;
    }
    if (unit === "horas" || unit === "hora") {
      return number * 60 * 60 * 1000;
    }
    if (unit === "dias" || unit === "dia") {
      return number * 24 * 60 * 60 * 1000;
    }
  };

  const timeInterval = timeToMilliseconds(timeString);

  const timeDifference = createdAtDate.getTime() + timeInterval - now.getTime();

  if (timeDifference <= 0) {
    return "Expirado";
  }

  const msToTime = (ms) => {
    const days = Math.floor(ms / (24 * 60 * 60 * 1000));
    const daysMs = ms % (24 * 60 * 60 * 1000);
    const hours = Math.floor(daysMs / (60 * 60 * 1000));
    const hoursMs = ms % (60 * 60 * 1000);
    const minutes = Math.floor(hoursMs / (60 * 1000));

    const parts = [];
    if (days) parts.push(`${days} dia${days > 1 ? "s" : ""}`);
    if (hours) parts.push(`${hours} hora${hours > 1 ? "s" : ""}`);
    if (minutes) parts.push(`${minutes} minuto${minutes > 1 ? "s" : ""}`);

    return parts.join(", ");
  };

  return msToTime(timeDifference);
}
