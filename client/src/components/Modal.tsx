export function Modal({ message, state, setState, action, title }: any) {
  const closeModal = () => {
    setState(false);
  };

  const cta = () => {
    if (action) {
      console.log("taking action");
      setState(false);
    } else {
      setState(false);
    }
  };

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
            }}
          >
            cancel
          </button>
          <button
            onClick={cta}
            style={{ padding: "8px 16px", fontSize: "large" }}
          >
            confirm
          </button>
        </div>
      </div>
    </div>
  );
}
