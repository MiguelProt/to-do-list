'use client';
import React from "react";
import PropTypes from "prop-types";

import "./Tasks.css";

export default function Task({ title, description, id, action}) {
  
  return (
    
    <li className="task" id={id}>
      <div>
        {title}
        <span onClick={action} >x</span>
      </div>
      {description}
    </li>
  );
}

Task.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  action: PropTypes.func,
};
