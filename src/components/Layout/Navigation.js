import {Link, useHistory} from 'react-router-dom';
import classes from './Navigation.module.css';
import AppSidebar from "./AppSidebar";
import {useEffect, useRef, useState} from "react";
import {useAppDispatch} from "../../root";
import {useSelector} from "react-redux";
import {getRole, isUserLoggedIn, logoutUser} from "../../store/auth";
import {useTranslation} from "react-i18next";
import LanguageSwitcher from './LanguageSwitcher';
import {Icon} from "semantic-ui-react";


const Navigation = () => {
    const {t} = useTranslation();

    const dispatch = useAppDispatch();
    const isLoggedIn = useSelector(isUserLoggedIn);
    const history = useHistory();
    const [toggle, setToggle] = useState(false);
    const role = useSelector(getRole);
    console.log(role)

    const logoutHandler = () => {
        dispatch(logoutUser({}));
        history.push('/auth')
    };

    const adminPanelHandler = () => {
        history.push('/admin')
    }
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
                        <Icon name='calendar check'/>
                        Services App
                    </div>
                </Link>
            )}
            {!isLoggedIn && (
                <div className={classes.logo}>
                    <Icon name='calendar check'/>
                    Services App
                </div>
            )}
            <nav>
                <span>

                    </span>
                {isLoggedIn && (
                    <div>
                        <button onClick={logoutHandler}>{t("logout")}</button>
                        <LanguageSwitcher/>
                    </div>
                )}

                {isLoggedIn && role === 'ADMIN' && (
                    <div>
                        <button onClick={adminPanelHandler}>{t("adminPanel")}</button>
                    </div>
                )}
            </nav>
            <AppSidebar toggleMenu={toggle} toggleFn={toggleMenu}/>
        </header>
    );
};

export default Navigation;