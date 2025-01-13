import { useEffect, useState /* useContext */ } from 'react';
//import { AppContext } from '../Context';
import api from '../axiosInterseptor';
import SubmitButton from '../components/SubmitButton';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';

const PaymentManager = () => {
  let [loadingButton, setLoadingButton] = useState(false);
  const [qnt, setQnt] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoadingButton(true);
    try {
      let response = await api.post(`/api/payment`, { qnt: data.quantity });
      console.log(response.data.session);
      window.location.href = response.data.session;
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoadingButton(false);
      reset();
    }
  };

  return (
    <S.Container>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Control
          type="number"
          {...register('quantity', {
            required: 'This field is required',
          })}
          placeholder="Quantity"
        />
        {errors.quantity && (
          <p style={{ color: 'red' }}>* {errors.quantity.message}</p>
        )}
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
