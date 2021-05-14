import React from "react";

function ButtonWithProgressBarComponent(props) {
  const { disabled, name, onClick, showSpinner, text } = props;
  return (
    <div>
      <button
        name={name}
        className="btn btn-primary"
        disabled={disabled}
        onClick={onClick}
      >
        {showSpinner && (
          <span
            className="spinner-border spinner-border-sm"
            style={{ marginRight: 20 }}
            role="status"
            aria-hidden="true"
          ></span>
        )}
        {text}
      </button>
    </div>
  );
}
export default ButtonWithProgressBarComponent;
