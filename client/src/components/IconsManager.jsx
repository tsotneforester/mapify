import { useState, useEffect } from 'react';
import api from '../axiosInterseptor';
import Icon from './Icon';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import IconsContainer from './IconsContainer';

import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import HexSvg from '../assets/hexadd.svg?react';
import ReturnSvg from '../assets/return.svg?react';
import NoContent from './NoContent';
import SubmitButton from '../components/SubmitButton';
import { useForm } from 'react-hook-form';
import { Input } from 'antd';

const IconsManager = () => {
  const [data, setData] = useState([]);

  let [loading, setLoading] = useState(true);
  let [loadingButton, setLoadingButton] = useState(false);
  let [showForm, setShowForm] = useState(false);
  const [activeIconName, setActiveIconName] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  async function fetchMyIcons() {
    // setLoading(true);
    try {
      const response = await api(`/api/icons`);
      let { data: result } = response.data;
      setData(result);
    } catch (error) {
      toast.error(`${error.response.data.message}`);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(e, id) {
    try {
      e.preventDefault();
      await api.delete(`/api/icons/${id}`);
      toast.success('Icon deleted');

      setActiveIconName('');
      setLoading(true);
      fetchMyIcons();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  const onSubmit = async (data) => {
    setLoadingButton(true);
    try {
      const formData = new FormData();
      formData.append('icon', data.file[0]);
      formData.append('name', data.iconName);

      let response = await api.post(`/api/icons`, formData);

      toast.success(response.data.message);

      setShowForm((e) => !e);
      setLoading(true);
      fetchMyIcons();
    } catch (error) {
      toast.error(`${error.response.data.message}`);
    } finally {
      setLoadingButton(false);
      reset();
    }
  };

  useEffect(() => {
    fetchMyIcons();
  }, []);

  return (
    <S.Container>
      {showForm ? (
        <ReturnIcon
          onClick={() => {
            setShowForm((e) => !e);
          }}
        />
      ) : (
        <HexIcon
          onClick={() => {
            setShowForm((e) => !e);
          }}
        />
      )}

      {showForm && (
        <S.AddIcon>
          <S.Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Control
              isInvalid={!!errors.iconName}
              type="text"
              {...register('iconName', {
                required: 'This field is required',
              })}
              placeholder="Icon Name"
            />
            {errors.iconName && (
              <p style={{ color: 'red' }}>* {errors.iconName.message}</p>
            )}
            <Form.Control
              isInvalid={!!errors.file}
              type="file"
              accept="image/png"
              {...register('file', { required: 'This field is required' })}
            />
            {errors.file && (
              <p style={{ color: 'red' }}>* {errors.file.message}</p>
            )}

            <SubmitButton label="Upload Icon" loading={loadingButton} />
          </S.Form>
          <p>
            png|jpg|jpeg|ico ფორმატის სასურველია კვადრატული ფორმის მინიმალური
            ზომით 48px * 48px
          </p>
        </S.AddIcon>
      )}
      {showForm || (
        <IconsContainer iconName={activeIconName} loading={loading}>
          {data.length === 0 ? (
            <NoContent />
          ) : (
            data.map((img) => (
              <Icon
                onClickHandler={() => setActiveIconName(img.name)}
                selected={img.name == activeIconName}
                key={img.id}
                {...img}
                handler={(e) => handleDelete(e, img.id)}
              />
            ))
          )}
        </IconsContainer>
      )}
    </S.Container>
  );
};

export default IconsManager;

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
  justify-content: flex-start;
  align-items: flex-start;
`;

S.AddIcon = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;

  align-items: center;
  gap: 12px;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 100%;
    gap: 20px;
  }

  p {
    font-size: 16px;
    color: #042914;
    font-weight: 400;
    text-align: center;
    font-style: italic;
  }
`;

S.Form = styled.form`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
`;

S.LoaderContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`;

const HexIcon = styled(HexSvg)`
  width: 30px;
  position: absolute;
  left: -19px;
  top: -20px;
  color: white;
  cursor: pointer;
`;

const ReturnIcon = styled(ReturnSvg)`
  width: 30px;
  position: absolute;
  right: -19px;
  bottom: -27px;
  color: white;
  cursor: pointer;
`;
