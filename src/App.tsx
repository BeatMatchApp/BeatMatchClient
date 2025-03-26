import { useState } from "react";
import "./App.css";
import UserDetails from "./components/userDetails/userDetails";

function App() {
  const [isUserDetailsOpen, setIsUserDetailsOpen] = useState(false);
  return (
    <>
      <div className="card">
        <button onClick={() => setIsUserDetailsOpen(true)}>Login</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      {isUserDetailsOpen && <UserDetails />}
    </>
  );
}

export default App;
