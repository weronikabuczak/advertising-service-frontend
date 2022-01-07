import {useRef, useState} from 'react';
import classes from './AuthorizationForm.module.css';
import {Redirect, useHistory} from "react-router-dom";
import {isUserLoggedIn, loginUser, registerUser} from "../../../store/auth";
import {useSelector} from "react-redux";
import {useAppDispatch} from "../../../root";
import {Icon} from "semantic-ui-react";

const AuthorizationForm = () => {
        const history = useHistory();
        const dispatch = useAppDispatch();
        const emailInput = useRef();
        const passwordInput = useRef();
        const nameInput = useRef();
        const locationInput = useRef();
        const phoneInput = useRef();
        let image = null;

        const [isLogin, setIsLogin] = useState(true);
        const [isLoading, setIsLoading] = useState(false);
        const isLoggedIn = useSelector(isUserLoggedIn);


        if (isLoggedIn) {
            return <Redirect to={'/'}/>
        }

        const FormHandler = async (event) => {
            event.preventDefault();
            if (!isLoggedIn && isLogin) {
                const email = emailInput.current.value;
                const password = passwordInput.current.value;
                dispatch(loginUser({email, password}))
                history.push('/')
            } else if (!isLogin) {
                const email = emailInput.current.value;
                const currentPassword = passwordInput.current.value;
                const newPassword = passwordInput.current.value;
                const name = nameInput.current.value;
                const location = locationInput.current.value;
                const phoneNumber = phoneInput.current.value;
                dispatch(registerUser({email, currentPassword, newPassword, name, location, phoneNumber, image}))
                history.push('/')
            }
        }


        const switchAuthModeHandler = () => {
            setIsLogin((prevState) => !prevState);
        };


        const handleFileInput = (e) => {
            const file = e.target.files[0];
            let reader = new FileReader();
            reader.readAsDataURL(file);
            let baseURL;
            let newBaseURL;
            reader.onload = () => {
                baseURL = reader.result;
                newBaseURL = baseURL.split(',')[1];
                image = newBaseURL;
            };
        }


        return (
            <section className={classes.auth}>
                <h3><Icon name='user circle outline'/>{isLogin ? 'Zaloguj się' : 'Zarejestruj nowe konto'}</h3>
                <form onSubmit={FormHandler}>
                    {isLogin ? (
                            <div>
                                <div className={classes.control}>
                                    <label htmlFor='email'>E-mail</label>
                                    <input type='email' id='email' defaultValue='test1@test.com' required ref={emailInput}/>
                                </div>
                                <div className={classes.control}>
                                    <label htmlFor='password'>Hasło</label>
                                    <input type='password' id='password' defaultValue='test1234' required ref={passwordInput}/>
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
                                    <label htmlFor='image' >Zdjęcie</label>
                                    <input type='file' onChange={handleFileInput}/>
                                </div>
                            </div>
                        )
                    }

                    <div className={classes.actions}>
                        {!isLoading && (
                            <button>{isLogin ? 'Zaloguj się' : 'Utwórz konto'}</button>)}
                        {isLoading && <p>Wysyłanie żądania...</p>}
                        <button type='button' onClick={switchAuthModeHandler}>
                            {isLogin ? 'Stwórz konto' : 'Masz już konto? Zaloguj się'}
                        </button>
                    </div>
                </form>
            </section>
        );
    }
;


export default AuthorizationForm;