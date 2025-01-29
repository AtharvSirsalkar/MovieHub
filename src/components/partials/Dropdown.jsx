import React from "react";

const Dropdown = ({ title, options, fun }) => {
  const structuredOptions = options.map((option, i) =>{
    return option.split('_').join(' ');
  })
  return (
    <div className="select">
      <select
        defaultValue="0"
        name=""
        id=""
        onChange={fun}
      >
        <option value="0" disabled>{title.toUpperCase()}</option>
        {options.map((elem, i) => {
          return (
            <option value={elem} key={i}>
              {structuredOptions[i].toUpperCase()}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Dropdown;
