import styled from 'styled-components';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';

export default function SubmitButton({
  label,
  color = 'primary',
  loading,
  style = { width: '100%' },
}) {
  return (
    <Button variant={color} style={style} type="submit" disabled={loading}>
      {loading ? (
        <Spinner as="span" animation="border" size="sm" role="status" />
      ) : (
        label
      )}
    </Button>
  );
}
const S = {};
S.Container = styled.div``;
