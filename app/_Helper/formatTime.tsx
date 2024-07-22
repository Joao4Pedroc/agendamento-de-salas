export default function formatDateTime(day: any, startTime: any, endTime: any) {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const isoString = date.toISOString();
    return isoString.split("T")[0];
  };

  const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toTimeString().split(" ")[0];
  };

  const formattedDay = formatDate(day);
  const formattedStartTime = formatTime(startTime);
  const formattedEndTime = formatTime(endTime);

  const startDateTime = `${formattedDay} ${formattedStartTime}`;
  const endDateTime = `${formattedDay} ${formattedEndTime}`;

  return {
    formattedDay,
    startDateTime,
    endDateTime,
  };
}
