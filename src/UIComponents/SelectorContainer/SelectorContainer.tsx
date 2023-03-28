import React, { ReactElement } from "react";

import "./SelectorContainer.css";

type SelectorContainerProps = {
  selectorHeader: string;
  selectorForm: ReactElement;
};

const SelectorContainer: React.FC<SelectorContainerProps> = ({
  selectorHeader,
  selectorForm,
}) => {
  return (
    <div className="selector_container">
      <h2 className="selectorContainer__heading">{selectorHeader}</h2>
      <section className="selectorContainer__form">{selectorForm}</section>
    </div>
  );
};

export default SelectorContainer;
