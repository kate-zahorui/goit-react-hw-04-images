import { Oval } from 'react-loader-spinner';
// import 'Grid.css';

import s from './Loader.module.css';

const Loader = () => {
  return (
    <div className={s.container}>
      <Oval color="#3f51b5" height={80} width={80} />
    </div>
  );
};

export { Loader };
