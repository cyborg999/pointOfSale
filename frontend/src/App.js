import { useState } from "react";
import { Routes,Route,Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Pos from "./Pos";
import Login from "./pages/Login"
import Home from "./pages/Home"
import SignUp from './pages/Signup';
import Dashboard from './pages/Dashboard';

import "./css/App.css";

function App(){
    let [ user,setUser ] = useState(localStorage.getItem("user"))
    const navigate = useNavigate();

  function logout(e){
    e.preventDefault();

    localStorage.clear()
    setUser(null)
    navigate("/login")  
     
  }

  function setActiveUser(data){
    setUser(data)
  }

  return (
    <>
      <header className='container-fluid'>
        <div className='container'>
          <h1><Link to="/">Shop</Link> </h1>
          <nav>
            { user ? 
            <>
              <Link to="/dashboard">Dashboard</Link> 
              <Link to="/pos">POS</Link> 
              <a href="" onClick={ (e) => logout(e)}>logout</a>
            </> 
            : 
            <>
              <Link to="/">Home</Link><Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </> }
          </nav>
        </div>
      </header>
      <div className="container">
        <Routes>
          <Route exact path="/" element={<Home/>}></Route>
          <Route exact path="/login" element={ <Login setActiveUser={ (msg)=> setActiveUser(msg)}/> } ></Route>
          <Route exact path="/signup" element={ <SignUp/>}></Route>
          <Route exact path="/dashboard" element={ <Dashboard/>}></Route>
          <Route exact path="/pos" element={ <Pos/>}></Route>
        </Routes>
      </div>
      </>
  )
}

export default App;