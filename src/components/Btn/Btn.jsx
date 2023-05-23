import PropTypes from 'prop-types';
import { BtnElement } from './Btn.styled';

export const Btn = ({
  text,
  status,
  disabled = false,
  type = 'button',
  onClick = null,
  onSubmit = null,
}) => {
  return (
    <BtnElement
      status={status}
      type={type}
      disabled={disabled}
      onClick={onClick}
      onSubmit={onSubmit}
    >
      {text}
    </BtnElement>
  );
};

Btn.propTypes = {
  disabled: PropTypes.bool,
  type: PropTypes.string,
  text: PropTypes.string.isRequired,
  status: PropTypes.string,
  onClick: PropTypes.func,
  onSubmit: PropTypes.func,
};
