import { useState } from "react";
import axios from "axios";
import config from "./../config";

const url = config.backendUrl;

function Login(){
    let [ data, setData ] = useState({
        username : ""
        , password : ""
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
                console.log(res)
            })
            .catch( err => {
                console.log("Error", err)
            })
    }

    return (
        <>
            <h3>Sign In</h3>
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