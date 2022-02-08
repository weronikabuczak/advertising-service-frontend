import React, {useEffect, useRef, useState} from 'react'
import {
    Icon,
    Menu, MenuItem,
    Sidebar
} from 'semantic-ui-react'
import {Link} from "react-router-dom";
import classes from './Navigation.module.css';
import {useTranslation} from "react-i18next";
import Redirect from "react-router-dom/es/Redirect";

const AppSidebar = ({toggleFn, toggleMenu}) => {
    const {t} = useTranslation();


    return (
        <Sidebar
            as={Menu}
            animation='push'
            icon='labeled'
            className={classes.paddingClasses}
            inverted
            vertical
            visible={toggleMenu}
            width='wide'
        >
            <MenuItem onClick={toggleFn}>
                <Link to='/'><Icon name='home' className={classes.paddingClasses}/>{t("home")}</Link>
            </MenuItem>
            <MenuItem onClick={toggleFn}>
                <Link to={{
                    pathname: "/profile",
                    // search: "?utm=your+face",
                    state: { me: true, email: null }}}><Icon name='user'/>{t("myAccount")}</Link>
                {/*<Redirect*/}
                {/*    to={{*/}
                {/*        pathname: "/profile",*/}
                {/*        // search: "?utm=your+face",*/}
                {/*        state: { me: true, email: null }*/}
                {/*    }}><Icon name='home' className={classes.paddingClasses}/>sdfsdfsd</Redirect>*/}
            </MenuItem>
            <MenuItem onClick={toggleFn}>
                <Link to='/newTask'><Icon name='add'/>{t("newTask")}</Link>
            </MenuItem>
        </Sidebar>
    );
}

export default AppSidebar;