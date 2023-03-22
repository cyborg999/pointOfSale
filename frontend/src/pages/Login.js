import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FlashMessage from "./FlashMessage";
import axios from "axios";
import config from "./../config";

const url = config.backendUrl;

function Login(props){
    const navigate = useNavigate();
    let [msg, setMsg ] = useState("")
    let [ data, setData ] = useState({
        username : ""
        , password : ""
        , allowed : false
    });

    let handleChange = (e) => {
        let { name, value } = e.target

        setData( prev => ({
            ...data, [name] : value
        }))
    }

    let handleSubmit = (e) => {
        e.preventDefault();

        axios.post(url+"/user/login", data)
            .then( res => {
                if(res.data != false){
                    localStorage.setItem("user", JSON.stringify(res.data));
                    props.setActiveUser(res.data)
                    navigate("/")
                } else {
                    console.log("Err")
                    setMsg(<FlashMessage msg="Invalid Login" type="error" cs="block" duration="1000"
                    />)
                }
            })
            .catch( err => {
                console.log("Error", err)
            })
    }

    return (
        <>
            <h3>Sign In</h3>
            { msg }
            <form method="post" onSubmit={ handleSubmit }>
                <fieldset>
                    <label>Username:</label>
                    <input type="text" name="username" value={ data.username } onChange={ handleChange } placeholder="Username..."/>
                </fieldset>
                <fieldset>
                    <label>Password:</label>
                    <input type="password" name="password" value={ data.password } onChange={ handleChange } placeholder="Password..."/>
                </fieldset>
                <fieldset className="btn-container">
                    <input type="submit" className="btn" value="Login"/>
                </fieldset>
            </form>
        </>
    )
}

export default Login;