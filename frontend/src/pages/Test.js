import { useNavigate } from 'react-router-dom';
function Test(){
const navigate = useNavigate();
    return (
        <div>
            
            <h1>testing </h1>
            <button onClick={ () => {
                // localStorage.removeItem("logout")
                localStorage.clear();
                navigate('/login');

                console.log("D1",localStorage.getItem("test"))
            }}>logout</button>
            <button onClick={ () => {
                console.log("login")
                localStorage.setItem("test", true)
                console.log("D2",localStorage.getItem("test"))
            }}>login</button>
        </div>
    )
}

export default Test;