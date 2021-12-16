import React from "react";
import {auth, provider} from "../firebaseConfig";

const Login = ({setUser}) => {

    const signIn = () => {
        auth
            .signInWithPopup(provider)
            .then(result => {setUser(result.additionalUserInfo.profile.name); console.log(result)})
            .catch(error => alert(error.message));
    };

    return (
        <div className="login_btn-cont">
            <h3> Please Use the Below Option to Login in </h3>
            <button type="button" className="login-with-google-btn" onClick={signIn}>
                Sign in with Google
            </button>
        </div>
    );
}

export default Login;