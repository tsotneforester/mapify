import PulseLoader from 'react-spinners/PulseLoader';

export default function Loader({ loading }) {
  return <PulseLoader color="#0008887d" loading={loading} size={15} aria-label="Loading Spinner" data-testid="loader" />;
}
