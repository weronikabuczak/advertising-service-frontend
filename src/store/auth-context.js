import React, {useState} from 'react';

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => {
    },
    logout: () => {
    },
});

const getRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime(); //time in milliseconds
    const receivedExpirationTime = new Date(expirationTime).getTime(); //convert received expTime to milliseconds
    const remainingTime = receivedExpirationTime - currentTime;
    return remainingTime;
}

export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem('token');
    const [token, setToken] = useState(initialToken);

    const userIsLoggedIn = !!token;

    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem('token');
    };

    //expirationTime
    const loginHandler = (token) => {
        setToken(token);
        localStorage.setItem('token', token);
       // localStorage.setItem('expirationTime', expirationTime);

        //const remainingTime = getRemainingTime(expirationTime);
        //setTimeout(logoutHandler, remainingTime); //logout after remainingTime
    };


    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;