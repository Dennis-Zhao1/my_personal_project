import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"
import { Link } from "react-router-dom";

function App() {
 

  return (
    <>
      <h1>Hello travel planner</h1>
      <Navbar />
      <Link to='TripBoards'>TripBoards</Link>
      <Outlet />

    </>
  )
};

export default App;
