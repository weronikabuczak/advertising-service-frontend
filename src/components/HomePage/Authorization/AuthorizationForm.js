import {useRef, useState} from 'react';
import classes from './AuthorizationForm.module.css';
import {Redirect, useHistory} from "react-router-dom";
import {isUserLoggedIn, loginUser, registerUser} from "../../../store/auth";
import {useSelector} from "react-redux";
import {useAppDispatch} from "../../../root";

const AuthorizationForm = () => {
        const dispatch = useAppDispatch();
        const emailInput = useRef();
        const passwordInput = useRef();
        const nameInput = useRef();
        const locationInput = useRef();
        const phoneInput = useRef();
        const imageInput = useRef();
        const history = useHistory();

        const [isLogin, setIsLogin] = useState(true);
        const [isLoading, setIsLoading] = useState(false);

        const isLoggedIn = useSelector(isUserLoggedIn);


        if (isLoggedIn) {
            return <Redirect to={'/'}/>
        }

        const brandNewHandlerForForm = (event) => {
            event.preventDefault();
            if (!isLoggedIn && isLogin) {
                const email = emailInput.current.value;
                const password = passwordInput.current.value;
                dispatch(loginUser({email, password}))
                history.push('/')
            } else if (!isLogin) {
                const email = emailInput.current.value;
                const password = passwordInput.current.value;
                const name = nameInput.current.value;
                const location = locationInput.current.value;
                const phone = phoneInput.current.value;
                const image = imageInput.current.value;
                dispatch(registerUser({email, password, name, location, phone, image}))
                history.push('/')
            }
        }

        //  const authContext = useContext(AuthContext);

        const switchAuthModeHandler = () => {
            setIsLogin((prevState) => !prevState);
        };

        // const submitUserHandler = () => {
        //     dispatch(
        //         authUser.
        //     )
        // }

        /*

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
                                    const {exp} = jwtDecode(data.token);
                                    authContext.login(data.token, exp);
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

        */


        return (
            <section className={classes.auth}>
                <h2>{isLogin ? 'Zaloguj się' : 'Zarejestruj nowe konto'}</h2>
                <form onSubmit={brandNewHandlerForForm}>
                    {isLogin ? (
                            <div>
                                <div className={classes.control}>
                                    <label htmlFor='email'>E-mail</label>
                                    <input type='email' id='email' value='test2@test.com' required ref={emailInput}/>
                                </div>
                                <div className={classes.control}>
                                    <label htmlFor='password'>Hasło</label>
                                    <input type='password' id='password' value='test12345' required ref={passwordInput}/>
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