import styled from 'styled-components';

export const Form = styled.form`
  width: 500px;
  height: fit-content;
  min-height: 20vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 32px;
  border-radius: 12px;
  border: 2px solid #d4d4d4;
  font-size: 24px;
`;

export const Label = styled.label`
  width: 100%;
  display: flex;
  font-weight: bold;
  font-size: 24px;
  justify-content: space-between;
  align-items: center;
`;
