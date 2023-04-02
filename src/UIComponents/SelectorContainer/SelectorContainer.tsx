import React, { ReactElement } from "react";

import "./SelectorContainer.css";

type SelectorContainerProps = {
  id?: string;
  selectorHeader: string | ReactElement;
  selectorForm: ReactElement;
  style?: object;
};

const SelectorContainer: React.FC<SelectorContainerProps> = ({
  id,
  selectorHeader,
  selectorForm,
  style,
}) => {
  return (
    <div
      className="selector_container"
      id={id}
      style={{ marginBottom: 20, ...style }}
    >
      <h2 className="selectorContainer__heading">{selectorHeader}</h2>
      <section className="selectorContainer__form">{selectorForm}</section>
    </div>
  );
};

export default SelectorContainer;
