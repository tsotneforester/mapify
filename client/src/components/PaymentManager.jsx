import { useEffect, useState /* useContext */ } from 'react';
//import { AppContext } from '../Context';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

const API_URL = import.meta.env.VITE_API_URL;
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';

const PaymentManager = () => {
  const token = sessionStorage.getItem('token');

  const [qnt, setQnt] = useState('');

  useEffect(() => {}, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      let response = await axios.post(
        `${API_URL}/api/payment`,
        { qnt, token },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      window.location.href = response.data.session;

      setQnt('');
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  return (
    <S.Container>
      <S.Form onSubmit={handleSubmit}>
        <Form.Control
          type="number"
          value={qnt}
          onChange={(e) => setQnt(e.target.value)}
          placeholder="10"
        />

        <Button style={{ width: '100%' }} type="submit" variant="primary">
          Checkout
        </Button>
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

// S.LoaderContainer = styled.div`
//   width: 100%;
//   height: 100%;
//   display: flex;
//   flex-flow: row nowrap;
//   justify-content: center;
//   align-items: center;
// `;
