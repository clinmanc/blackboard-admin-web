export function generateRecentDateRange() {
  const dateTo = new Date();
  const yearTo = dateTo.getFullYear();
  const monthTo = dateTo.getMonth() + 1 < 10 ? '0' + (dateTo.getMonth() + 1) : dateTo.getMonth();
  const dayTo = dateTo.getDate() < 10 ? '0' + dateTo.getDate() : dateTo.getDate();

  const dateFrom = new Date(dateTo.getTime() - 7 * 24 * 3600 * 1000);
  const yearFrom = dateFrom.getFullYear();
  const monthFrom = dateFrom.getMonth() + 1 < 10 ? '0' + (dateFrom.getMonth() + 1) : dateFrom.getMonth();
  const dayFrom = dateFrom.getDate() < 10 ? '0' + dateFrom.getDate() : dateFrom.getDate();

  const from = `${yearFrom}-${monthFrom}-${dayFrom}`;
  const to = `${yearTo}-${monthTo}-${dayTo}`;

  return {
    from: from,
    to: to
  }
}
