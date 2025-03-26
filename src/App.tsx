import { useState } from "react";
import "./App.css";
import UserDetails from "./components/userDetails/userDetails";

function App() {
  const [isUserDetailsOpen, setIsUserDetailsOpen] = useState(false);
  return (
    <>
      {!isUserDetailsOpen && (
        <div className="card">
          <button onClick={() => setIsUserDetailsOpen(true)}>Login</button>
        </div>
      )}
      {isUserDetailsOpen && <UserDetails />}
    </>
  );
}

export default App;
