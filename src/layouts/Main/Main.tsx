import type { FC, ReactNode } from "react";

import Header from "../../components/Header";
import "./Main.scss";

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
