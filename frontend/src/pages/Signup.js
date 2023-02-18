import { useState } from "react"
import config from "./../config";
import axios from "axios";

const url = config.backendUrl;

function SignUp(){
    let [ data, setData ] = useState({
        username: ""
        , password1 : ""
        , password2 : ""
    })

    let [ error, setError ] = useState({
        username: false
        , password1 : false
        , password2 : false
    })

    
    let validate = (name, value, allowSubmitCounter = 0) => {
        let counter = 0;

        if(name === "username"){
            if(value.length < 6){
                setError({...error, [name]:"Username is too short."})
                ++counter
            }

            if(value.length === 0){
                setError({...error, [name]:"Please enter username."})
                ++counter
            }
        }

        if(name === "password1"){
            if(value.length < 6){
                setError({...error, [name]:"Password is too short."})
                ++counter
            }

            if(value.length === 0){
                setError({...error, [name]:"Password can't be blank."})
                ++counter
            }
        }

        if(name === "password2"){
            if(value.length < 6){
                setError({...error, [name]:"Password is too short."})
                ++counter
            }

            if(value.length === 0){
                setError({...error, [name]:"Password can't be blank."})
                ++counter
            }

            if(data.password1 !== data.password2){
                setError({...error, [name]:"Passwords must be the same."})
                ++counter
            }
        }

        if(name === "mobile"){
            let contact = data.mobile

            if(value.length === 0){
                setError({...error, [name]:"Number can't be blank."})
                ++counter
            }

            if(value.length <11 ){
                setError({...error, [name]:"Number is too short"})
                ++counter
            }
            if(contact.isInteger === false){
                setError({...error, [name]:"Invalid Mobile Number..."})
                ++counter
            }

        }

        
        if(counter === 0){
            setError({...error, [name]:false})
        }

        allowSubmitCounter += counter;

        return allowSubmitCounter;
    }

    let checkInputs = () => {
        let allowSubmitCounter = 0;

        for(var i in data){
            console.log(i, data[i])
            allowSubmitCounter +=validate(i, data[i], allowSubmitCounter)
        }

        //if 0 error, allow add
        if(allowSubmitCounter === 0){
            axios.post(url+"/user/add")
                .then( data => {
                    console.log(data)
                })
                .catch( err => {
                    console.log("err", err)
                })
        }
    }

    let handleSubmit = (e) => {
        e.preventDefault();

        checkInputs();
        console.log("submitted")
    }

    let handleChange = (e) => {
        let {name, value} = e.target;

        setData({...data, [name]:value})
    }

    let handleBlur = (e) => {
        let {name, value} = e.target;

        validate(name, value)
    }

    return (
        <>
            <h3>Create an account</h3>
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