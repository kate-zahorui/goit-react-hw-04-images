import PropTypes from 'prop-types';

import s from './Button.module.css';

const Button = ({ onClick, text, disabled }) => {
  return (
    <button
      type="button"
      className={s.button}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export { Button };
