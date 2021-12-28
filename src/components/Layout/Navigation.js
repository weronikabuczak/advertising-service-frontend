import {Link, useHistory} from 'react-router-dom';
import classes from './Navigation.module.css';
import AppSidebar from "./AppSidebar";
import { useState} from "react";
import {useAppDispatch} from "../../root";
import {useSelector} from "react-redux";

import {isUserLoggedIn, loginUser, logoutUser} from "../../store/auth";

const Navigation = () => {

    const dispatch = useAppDispatch();
    const isLoggedIn = useSelector(isUserLoggedIn);
    const history = useHistory();

    const logoutHandler = (event) => {
        dispatch(logoutUser({}));
        history.push('/auth')
    };

    const [toggle, setToggle] = useState(false);

    function toggleMenu() {
        setToggle(!toggle);
    }


    return (
        <header className={classes.header}>
            {isLoggedIn && (
                <button onClick={toggleMenu}>MENU</button>
            )}
            {isLoggedIn && (
                <Link to='/'>
                    <div className={classes.logo}>
                        {/*<img src={task} alt='task'/>Services App*/}
                        Services App
                    </div>
                </Link>
            )}
            {!isLoggedIn && (
                <div className={classes.logo}>
                    {/*<img src={task} alt='task'/>Services App*/}
                    Services App
                </div>
            )}
            <nav>
                {isLoggedIn && (
                    <button className={classes.navButton} onClick={logoutHandler}>Wyloguj się</button>
                )}
                {/*{isLoggedIn && (*/}
                {/*        <Link to='/'><img src={flag} alt='flag'/></Link>*/}
                {/*)}*/}


            </nav>
            <AppSidebar toggleMenu={toggle} toggleFn={toggleMenu}/>
        </header>
    );
};

export default Navigation;