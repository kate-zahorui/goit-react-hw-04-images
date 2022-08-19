import s from './Modal.module.css';

export class Modal extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', this.closeModal);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModal);
  }

  closeModal = () => {
    console.log('closeModal');
  };
  render() {
    const { src, alt } = this.props;

    return (
      <div className={s.overlay}>
        <div className={s.modal}>
          <img src={src} alt={alt} />
        </div>
      </div>
    );
  }
}
