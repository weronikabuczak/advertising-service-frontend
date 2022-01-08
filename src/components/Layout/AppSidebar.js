import React from 'react'
import {
    Icon,
    Menu, MenuItem,
    Sidebar
} from 'semantic-ui-react'
import {Link} from "react-router-dom";
import classes from './Navigation.module.css';
import {useTranslation} from "react-i18next";

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
            <MenuItem onClick={toggleFn} link='true'>
                <Link to='/profile'><Icon name='user'/>{t("myAccount")}</Link>
            </MenuItem>
            <MenuItem onClick={toggleFn}>
                <Link to='/newTask'><Icon name='add'/>{t("newTask")}</Link>
            </MenuItem>
        </Sidebar>
    );
}

export default AppSidebar;