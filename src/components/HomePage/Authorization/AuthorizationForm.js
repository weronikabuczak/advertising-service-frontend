import { useState } from 'react';

import classes from './AuthorizationForm.module.css';

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    return (
        <section className={classes.auth}>
            <h1>{isLogin ? 'Zaloguj się' : 'Zarejestruj nowe konto'}</h1>
            <form>
                <div className={classes.control}>
                    <label htmlFor='email'>E-mail</label>
                    <input type='email' id='email' required/>
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'>Hasło</label>
                    <input type='password' id='password' required />
                </div>
                <div className={classes.actions}>
                    <button>{isLogin ? 'Zaloguj się' : 'Stwórz konto'}</button>
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
};

export default AuthForm;