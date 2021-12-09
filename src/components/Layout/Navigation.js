import {Link} from 'react-router-dom';
import classes from './Navigation.module.css';
import AppSidebar from "./AppSidebar";
import {useContext, useState} from "react";
import flag from '../../files/flag.png'
import task from '../../files/task.png'
import AuthContext from "../../store/auth-context";

const Navigation = () => {
    const authContext = useContext(AuthContext);

    const isLoggedIn = authContext.isLoggedIn;

    const logoutHandler = () => {
        authContext.logout()
        //redirect
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