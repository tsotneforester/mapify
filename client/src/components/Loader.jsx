import PulseLoader from 'react-spinners/PulseLoader';

export default function Loader({ loading }) {
  return <PulseLoader color="white" loading={loading} size={15} aria-label="Loading Spinner" data-testid="loader" />;
}
