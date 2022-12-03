import React from "react";
import { Form } from "semantic-ui-react";

function InputFileld({ label, placeholder, state, setState, value, check }) {
  return (
    <Form.Field>
      <label>{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => {
          const cloneJoin = { ...state };
          cloneJoin.id = e.target.value;
          setState(cloneJoin);
        }}
        value={value}
      />
      <p className="check">{check}</p>
    </Form.Field>
  );
}

export default InputFileld;
