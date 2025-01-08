import { useEffect, useState /* useContext */ } from 'react';
//import { AppContext } from '../Context';
import api from '../axiosInterseptor';
import SubmitButton from '../components/SubmitButton';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

const API_URL = import.meta.env.VITE_API_URL;
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';

const PaymentManager = () => {
  let [loadingButton, setLoadingButton] = useState(false);

  const [qnt, setQnt] = useState('');

  useEffect(() => {}, []);

  const handleSubmit = async (e) => {
    setLoadingButton(true);
    try {
      e.preventDefault();

      let response = await api.post(`/api/payment`, { qnt });

      window.location.href = response.data.session;

      setQnt('');
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoadingButton(false);
    }
  };

  return (
    <S.Container>
      <S.Form onSubmit={handleSubmit}>
        <Form.Control
          type="number"
          required
          value={qnt}
          onChange={(e) => setQnt(e.target.value)}
          placeholder="10"
        />
        <SubmitButton label="Checkout" loading={loadingButton} />
      </S.Form>
      <div>
        <p>გაზარდე მონიშვნების რაოდენობის ლიმიტი უსასრულოდ ❤</p>
        <p>სატესტო რეჟიმში გამოიყენე ბარათის კოდი - 5555 5555 5555 4444</p>
      </div>
    </S.Container>
  );
};

export default PaymentManager;

const S = {};
S.Container = styled.div`
  gap: 40px;
  /* display: grid;
    grid-template-columns: 2fr 3fr;
    grid-template-rows: auto; */
  position: relative;
  //min-height: 240px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: flex-start;
`;

S.Form = styled.form`
  max-width: 400px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
`;
