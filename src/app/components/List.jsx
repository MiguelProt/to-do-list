import React from "react";

import "./Tasks.css";

const List = ({ children }) => {
  return <ul className="list">{children}</ul>;
};

export default List;
