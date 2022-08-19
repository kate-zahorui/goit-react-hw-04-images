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

export { Button };
