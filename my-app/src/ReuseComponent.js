import React from "react";
import Pt from "prop-types";
const Student1 = (props) => {
  return <h1 className="hi">Hello {props.name}</h1>;
};
Student1.propTypes = {
  name: Pt.string,
};
Student1.defaultProps = {
  name: "AKJ",
};
export default Student1;
