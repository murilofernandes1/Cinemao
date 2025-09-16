export default function dateToIso(dateStr) {
  if (!dateStr) return dateStr;

  const date = new Date(dateStr + "T00:00:00");
  if (isNaN(date.getTime())) {
    return dateStr;
  }

  return date.toISOString();
}
