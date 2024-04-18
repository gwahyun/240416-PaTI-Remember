export const getDateString = (dateString: string) => {
  const date = new Date(dateString);

  const formattedDate = date
    .toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
    .replace(/\./g, ' -')
    .replace('T', ' ');

  return formattedDate;
};
