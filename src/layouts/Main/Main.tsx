import type { FC, ReactNode } from 'react';

// Components
import Header from '../../components/Header';

// Styles
import './Main.scss';

type MainProps = { children?: ReactNode };

const Main: FC<MainProps> = ({ children }) => {
  return (
    <div className="main-layout">
      <Header />
      <div className="main-layout__content">{children}</div>
    </div>
  );
};

export default Main;
