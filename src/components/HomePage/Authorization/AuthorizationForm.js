import {useContext, useRef, useState} from 'react';
import classes from './AuthorizationForm.module.css';
import AuthContext from "../../../store/auth-context";
import {useHistory} from "react-router-dom";

const AuthorizationForm = () => {

        const emailInput = useRef();
        const passwordInput = useRef();
        const confirmPasswordInput = useRef();
        const nameInput = useRef();
        const locationInput = useRef();
        const phoneInput = useRef();
        const imageInput = useRef();
        const history = useHistory();

        const [isLogin, setIsLogin] = useState(true);
        const [isLoading, setIsLoading] = useState(false);


        const authContext = useContext(AuthContext);

        const switchAuthModeHandler = () => {
            setIsLogin((prevState) => !prevState);
        };

        //const isError = passwordInput.current.value && confirmPasswordInput.current.value


        const submitHandler = (event) => {
            event.preventDefault();


            setIsLoading(true);
            let url;
            let init;

            if (isLogin) {
                const enteredEmail = emailInput.current.value;
                const enteredPassword = passwordInput.current.value;
                url =
                    'http://localhost:8080/api/user/login';
                init = {
                    email: enteredEmail,
                    password: enteredPassword
                }
            } else {
                const enteredEmail = emailInput.current.value;
                const enteredPassword = passwordInput.current.value;
                const enteredName = nameInput.current.value;
                const enteredLocation = locationInput.current.value;
                const enteredPhone = phoneInput.current.value;
                const enteredImage = imageInput.current.value;
                url =
                    'http://localhost:8080/api/user/register';
                init = {
                    email: enteredEmail,
                    currentPassword: enteredPassword,
                    newPassword: enteredPassword,
                    name: enteredName,
                    location: enteredLocation,
                    phoneNumber: enteredPhone,
                    image: enteredImage
                }
            }


            fetch(url, {
                method: 'POST',
                body: JSON.stringify(init),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => {
                    setIsLoading(false);
                    if (response.ok) {
                        return response.json().then(data => {
                            authContext.login(data.token);
                            //const expirationTime = data.expireTime;   //need this value from backend
                            // authContext.login(data.token, data.expireTime);
                            history.replace('/');
                        })
                    } else {
                        return response.json().then((data) => {
                            let errorMessage = 'Authentication failed!';
                            if (data.status === 500) {
                                console.log(data.message)
                                alert(data.message)
                                throw new Error(data.message);
                            }
                        });
                    }
                })
                .catch((err) => {
                    alert(err.message);
                });
        };


        return (
            <section className={classes.auth}>
                <h2>{isLogin ? 'Zaloguj się' : 'Zarejestruj nowe konto'}</h2>
                <form onSubmit={submitHandler}>
                    {isLogin ? (
                            <div>
                                <div className={classes.control}>
                                    <label htmlFor='email'>E-mail</label>
                                    <input type='email' id='email' required ref={emailInput}/>
                                </div>
                                <div className={classes.control}>
                                    <label htmlFor='password'>Hasło</label>
                                    <input type='password' id='password' required ref={passwordInput}/>
                                </div>
                            </div>
                        )
                        : (
                            <div>
                                <div className={classes.control}>
                                    <label htmlFor='email'>E-mail</label>
                                    <input type='email' id='email' required ref={emailInput}/>
                                </div>
                                <div className={classes.control}>
                                    <label htmlFor='password'>Hasło</label>
                                    <input type='password' id='password' required minLength='8' ref={passwordInput}/>
                                </div>
                                {/*<div className={classes.control}>*/}
                                {/*    <label htmlFor='confirm_password'>Powtórz hasło</label>*/}
                                {/*    <input type='password' id='confirm_password' required ref={confirmPasswordInput}/>*/}
                                {/*</div>*/}

                                <div className={classes.control}>
                                    <label htmlFor='name'>Nazwa</label>
                                    <input type='text' id='name' required ref={nameInput}/>
                                </div>
                                <div className={classes.control}>
                                    <label htmlFor='location'>Miejscowość</label>
                                    <input type='text' id='location' required ref={locationInput}/>
                                </div>
                                <div className={classes.control}>
                                    <label htmlFor='phone'>Numer telefonu</label>
                                    <input type='tel' id='phone' defaultValue='+48' maxLength='12' ref={phoneInput}/>
                                </div>
                                <div className={classes.control}>
                                    <label htmlFor='image'>Zdjęcie</label>
                                    <input type='file' id='image' ref={imageInput}/>
                                </div>
                            </div>
                        )
                    }


                    <div className={classes.actions}>
                        {!isLoading && (
                            <button>{isLogin ? 'Zaloguj się' : 'Utwórz konto'}</button>)}
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