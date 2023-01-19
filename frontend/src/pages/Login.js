function Login(){
    let handleSubmit = (e) => {
        e.preventDefault();

        console.log("submitted")
    }

    return (
        <>
            <h3>Sign In</h3>
            <form method="post" onSubmit={ ()=> handleSubmit() }>
                <fieldset>
                    <label>Username:</label>
                    <input type="text" name="username" placeholder="Username..."/>
                </fieldset>
                <fieldset>
                    <label>Password:</label>
                    <input type="password" name="password1" placeholder="Password..."/>
                </fieldset>
                <fieldset className="btn-container">
                    <input type="submit" className="btn" value="Login"/>
                </fieldset>
            </form>
        </>
    )
}

export default Login;