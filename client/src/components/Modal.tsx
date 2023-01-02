export function Modal({ message, state, setState, action, title, leftButtonText, rightButtonText }: any) {
  const closeModal = () => {
    setState(false);
  };

  const cta = () => {
    if (action) {
      action();
      setState(false);
    } else {
      setState(false);
    }
  };

  const leftButton = leftButtonText || "cancel";
  const rightButton = rightButtonText || "continue";

  return (
    <div className="modalContainer" style={state ? {} : { display: "none" }}>
      <div className="modal">
        <p style={{ alignSelf: "end" }} onClick={closeModal}>
          X
        </p>
        <h3 style={{ alignSelf: "center" }}>{title}</h3>
        <p>{message}</p>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            onClick={closeModal}
            style={{
              padding: "8px 16px",
              fontSize: "large",
              backgroundColor: "gray",
              marginRight:'6px'
            }}
          >
            {leftButton}
          </button>
          <button
            onClick={cta}
            style={{ padding: "8px 16px", fontSize: "large" }}
          >
            {rightButton}
          </button>
        </div>
      </div>
    </div>
  );
}
