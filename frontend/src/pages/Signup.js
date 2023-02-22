import { useState } from "react";
import { Link } from "react-router-dom";
import config from "./../config";
import axios from "axios";

const url = config.backendUrl;

function SignUp(){
    let [ data, setData ] = useState({
        username: ""
        , password1 : ""
        , password2 : ""
    })

    let [added, setAdded ] = useState(false)

    let [ error, setError ] = useState({
        username: false
        , password1 : false
        , password2 : false
    })

    
    let validate = (name, value, err, countError = false) => {
        if(name === "username"){
            if(value.length < 6){
                err[name] = "Username is too short."

                countError += (countError !== false) ? 1 : 0;
            }


            if(value.length === 0){
                err[name] = "Please enter username."
                countError += (countError !== false) ? 1 : 0;
            }
        }

        if(name === "password1"){
            if(value.length < 6){
                err[name] = "Password is too short."
                countError += (countError !== false) ? 1 : 0;
            }

            if(value.length === 0){
                err[name] = "Password can't be blank."
                countError += (countError !== false) ? 1 : 0;
            }
        }

        if(name === "password2"){
            if(value.length < 6){
                err[name] = "Password is too short."
                countError += (countError !== false) ? 1 : 0;
            }

            if(value.length === 0){
                err[name] = "Password can't be blank."
                countError += (countError !== false) ? 1 : 0;
            }

            if(data.password1 !== data.password2){
                err[name] = "Passwords must be the same."
                countError += (countError !== false) ? 1 : 0;
            }
        }

        setError(err)

        if(countError !== false){
            return countError;
        }
    }

    let checkInputs = () => {
        let err = {
            username: false
            , password1 : false
            , password2 : false
        }
        let errorCount = 0;


        for(var i in data){
            errorCount += validate(i, data[i], err, errorCount)
        }

        //if 0 error, allow add
        if(errorCount === 0){
            console.clear();
            axios.post(url+"/user/add", data)
                .then( response => {
                    console.log(response.data.added)
                    if(response.data.added === false){
                        setError(prev => ({
                            ...prev, username : "Username is already in use"
                        }))
                        setAdded(false)
                    } else {
                        setAdded(true)
                    }
                })
                .catch( err => {
                    console.log("err", err)
                })
        }
    }

    let handleSubmit = (e) => {
        e.preventDefault();

        checkInputs();
    }

    let handleChange = (e) => {
        let {name, value} = e.target;

        setData({...data, [name]:value})
    }

    let handleBlur = (e) => {
        let {name, value} = e.target;
        let err = {
            username: false
            , password1 : false
            , password2 : false
        }

        validate(name, value, err)
    }

    return (
        <>
            <h3>Create an account</h3>
            { added && <p className="success">You have successfully created an account. Click <Link to="/login">here</Link> to login</p>}
            <form  method="post"  onSubmit={ handleSubmit }>
                <fieldset className={ error.username !== false ? "error" : ""}>
                    <label>Username:</label>
                    <div>
                        <p>{ error.username }</p>
                        <input type="text" name="username" onBlur={ handleBlur } onChange={ handleChange } value={ data.username } placeholder="Username..."/>
                    </div>
                </fieldset>
                <fieldset  className={ error.password1 !== false ? "error" : ""}>
                    <label>Password:</label>
                    <div>
                        <p>{ error.password1 }</p>
                        <input type="password" name="password1"  onBlur={ handleBlur }  onChange={ handleChange } value={ data.password1 } placeholder="Password..."/>
                    </div>
                </fieldset>
                <fieldset  className={ error.password2 !== false ? "error" : ""}>
                    <label>Retype Password:</label>
                    <div>
                        <p>{ error.password2 }</p>
                        <input type="password" name="password2"  onBlur={ handleBlur }  onChange={ handleChange } value={ data.password2 } placeholder="Password..."/>
                    </div>
                </fieldset>
                {/* <fieldset  className={ error.mobile !== false ? "error" : ""}>
                    <label>Mobile #</label>
                    <div>
                        <p>{ error.mobile }</p>
                        <input type="number" name="mobile"  onBlur={ handleBlur }  onChange={ handleChange } value={ data.mobile } placeholder="Mobile #..."/>
                    </div>
                </fieldset> */}
                <fieldset className="btn-container">
                    <input type="submit" className="btn" value="Register"/>
                </fieldset>
            </form>
        </>
    )
}

export default SignUp;