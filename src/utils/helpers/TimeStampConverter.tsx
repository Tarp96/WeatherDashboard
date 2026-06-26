interface TimeStampConverterProps {
  epochSeconds: number;
}

export const TimeStampConverter = ({
  epochSeconds,
}: TimeStampConverterProps) => {
  const epochInSeconds = epochSeconds;
  const formattedSeconds = new Date(epochInSeconds * 1000).toLocaleString();

  return <p>{formattedSeconds}</p>;
};
