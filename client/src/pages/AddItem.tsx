import { useState } from "react";

export function AddItem() {
  const [name, setName] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(name);
  };

  return (
    <div className="contentContainer">
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
