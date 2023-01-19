import {BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom';
import Login from "./pages/Login"
import Home from "./pages/Home"
import SignUp from './pages/Signup';
import "./css/App.css";

function App(){
  return (
    <Router>
      <header className='container-fluid'>
        <div className='container'>
          <h1>shop</h1>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Login</Link>
          </nav>
        </div>
      </header>
      <div className="container">
        <Routes>
          <Route exact path="/" element={<Home/>}></Route>
          <Route exact path="/login" element={ <Login/> }></Route>
          <Route exact path="/signup" element={ <SignUp/>}></Route>
        </Routes>
      </div>
    </Router>
    
  )
}

export default App;