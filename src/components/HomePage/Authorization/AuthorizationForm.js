import {useRef, useState} from 'react';
import classes from './AuthorizationForm.module.css';
import {Redirect, useHistory} from "react-router-dom";
import {isUserLoggedIn, loginUser, registerUser} from "../../../store/auth";
import {useSelector} from "react-redux";
import {useAppDispatch} from "../../../root";

const AuthorizationForm = () => {
        const history = useHistory();
        const dispatch = useAppDispatch();
        const emailInput = useRef();
        const passwordInput = useRef();
        const nameInput = useRef();
        const locationInput = useRef();
        const phoneInput = useRef();
       // const [imageContent, setImageContent] = useState();

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
                const currentPassword = passwordInput.current.value;
                const newPassword = passwordInput.current.value;
                const name = nameInput.current.value;
                const location = locationInput.current.value;
                const phone = phoneInput.current.value;
               // const image = Array.from(imageContent);
                dispatch(registerUser({email, currentPassword, newPassword, name, location, phone}))
                history.push('/')
            }
        }


        const switchAuthModeHandler = () => {
            setIsLogin((prevState) => !prevState);
        };

        const imageUploadHandler = (e) => {
            const newImage = e.target.files[0];
            newImage
                .text()
                .then(data => {
                  //  setImageContent(data);
                })
        }

        return (
            <section className={classes.auth}>
                <h2>{isLogin ? 'Zaloguj się' : 'Zarejestruj nowe konto'}</h2>
                <form onSubmit={brandNewHandlerForForm}>
                    {isLogin ? (
                            <div>
                                <div className={classes.control}>
                                    <label htmlFor='email'>E-mail</label>
                                    <input type='email' id='email' value='test1@test.com' required ref={emailInput}/>
                                </div>
                                <div className={classes.control}>
                                    <label htmlFor='password'>Hasło</label>
                                    <input type='password' id='password' value='test1@test.com' required ref={passwordInput}/>
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
                                    <input type='file' onChange={imageUploadHandler} id='image'/>
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