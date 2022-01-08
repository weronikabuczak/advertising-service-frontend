import {Link, useHistory} from 'react-router-dom';
import classes from './Navigation.module.css';
import AppSidebar from "./AppSidebar";
import { useState} from "react";
import {useAppDispatch} from "../../root";
import {useSelector} from "react-redux";
import appIcon from '../../files/app.png'

import {isUserLoggedIn, logoutUser} from "../../store/auth";
import {Icon} from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from './LanguageSwitcher';


const Navigation = () => {
    const { t, i18n } = useTranslation();


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
                <button onClick={toggleMenu}>Menu</button>
            )}
            {isLoggedIn && (
                <Link to='/'>
                    <div className={classes.logo}>
                        <Icon link={appIcon} name='calendar check'/>
                        Services App
                    </div>
                </Link>
            )}
            {!isLoggedIn && (

                <div className={classes.logo}>
                    <Icon link='/' name='calendar check'/>
                    Services App
                </div>
            )}
            <nav>
                {isLoggedIn && (
                    <div>
                    <button onClick={logoutHandler}>{t("logout")}</button>
                    <LanguageSwitcher/>
                    </div>
                )}
            </nav>

            <AppSidebar toggleMenu={toggle} toggleFn={toggleMenu}/>
        </header>
    );
};

export default Navigation;