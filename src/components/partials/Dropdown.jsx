import React from "react";

const Dropdown = ({ title, options, fun }) => {
  const structuredOptions = options.map((option) =>
    option.split("_").join(" ")
  );

  return (
    <div className="w-full sm:w-auto">
      <select
        defaultValue="0"
        onChange={fun}
        className="w-auto sm:w-full px-3 py-2 rounded-lg border border-zinc-400 bg-zinc-900 text-zinc-200 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
      >
        {/* Default disabled option */}
        <option value="0" disabled>
          {title.toUpperCase()}
        </option>

        {/* Dynamic options */}
        {options.map((elem, i) => (
          <option value={elem} key={i} className="bg-zinc-900 text-zinc-200">
            {structuredOptions[i].toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
