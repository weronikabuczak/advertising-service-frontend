import {useContext, useRef, useState} from 'react';
import classes from './AuthorizationForm.module.css';
import AuthContext from "../../../store/auth-context";

const AuthorizationForm = () => {

        const emailInput = useRef();
        const passwordInput = useRef();

        const [isLogin, setIsLogin] = useState(true);
        const [isLoading, setIsLoading] = useState(false);

        const authContext = useContext(AuthContext);

        const switchAuthModeHandler = () => {
            setIsLogin((prevState) => !prevState);
        };


        const submitHandler = (event) => {
            event.preventDefault();

            const enteredEmail = emailInput.current.value;
            const enteredPassword = passwordInput.current.value;

            setIsLoading(true);
            let url;
            if (isLogin) {
                url =
                    'http://localhost:8080/api/user/auth/login';
            } else {
                url =
                    'http://localhost:8080/api/user/auth/register';
            }
            fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    email: enteredEmail,
                    password: enteredPassword
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => {
                    setIsLoading(false);
                    if (response.ok) {
                        return response.json();
                    } else {
                        return response.json().then((data) => {
                            let errorMessage = 'Authentication failed!';
                            throw new Error(errorMessage);
                        });
                    }
                })
                .then((data) => {
                    authContext.login(data.token);
                })
                .catch((err) => {
                    alert(err.message);
                });
        };


        return (
            <section className={classes.auth}>
                <h2>{isLogin ? 'Zaloguj się' : 'Zarejestruj nowe konto'}</h2>
                <form onSubmit={submitHandler}>
                    <div className={classes.control}>
                        <label htmlFor='email'>E-mail</label>
                        <input type='email' id='email' required ref={emailInput}/>
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='password'>Hasło</label>
                        <input type='password' id='password' required ref={passwordInput}/>
                    </div>
                    <div className={classes.actions}>
                        {!isLoading && (
                            <button>{isLogin ? 'Zaloguj się' : 'Stwórz konto'}</button>)}
                        {isLoading && <p>Wysyłanie żądania...</p>}
                        <button
                            type='button'
                            className={classes.toggle}
                            onClick={switchAuthModeHandler}
                        >
                            {isLogin ? 'Stwórz konto' : 'Masz już konto? Zaloguj się'}
                        </button>
                    </div>
                </form>
            </section>
        );
    }
;

export default AuthorizationForm;