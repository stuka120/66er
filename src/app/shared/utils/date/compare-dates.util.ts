export function compareDates(date1: Date, date2: Date) {
  return new Date(date1).valueOf() - new Date(date2).valueOf();
}
