import React from "react";
import db, {auth, provider} from "../firebaseConfig";

const Login = ({createUserIfNotExists}) => {

    const signIn = () => {
        let userName;
        auth
            .signInWithPopup(provider)
            .then(result => {
                userName = result.additionalUserInfo.profile.name;
                createUserIfNotExists(userName);
            })
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