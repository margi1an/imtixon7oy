import React from "react";

function FormCheckbox({name}) {
  return (
    <div className="form-control">
      <label className="label d-flex gap-4 cursor-pointer">
        <span className="label-text font-semibold">Completed : </span>
        <input name={name} type="checkbox" defaultChecked className="checkbox" />
      </label>
    </div>
  );
}

export default FormCheckbox;
