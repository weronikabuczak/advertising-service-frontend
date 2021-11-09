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
                <Link to='/'>
                    <button className={classes.logo} onClick={toggleMenu}>MENU</button>
                </Link>
            )}
            <Link to='/'>
                <div className={classes.logo}>
                    <img src={task} alt='task'/>Services App
                </div>
            </Link>
            <nav>
                <ul>
                    {isLoggedIn && (
                        <li>
                            <button onClick={logoutHandler}>Logout</button>
                        </li>
                    )}
                    {isLoggedIn && (
                        <li>
                            <Link to='/'><img src={flag} alt='flag'/></Link>
                        </li>
                    )}
                </ul>
            </nav>
            <div>
                <AppSidebar toggleMenu={toggle}/>
            </div>
        </header>

    );
};

export default Navigation;