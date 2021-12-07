import React from 'react'
import {
    Icon,
    Menu, MenuItem,
    Sidebar
} from 'semantic-ui-react'
import {Link} from "react-router-dom";
import classNames from "classnames";

import classes from './Navigation.module.css';

const AppSidebar = ({toggleFn, toggleMenu}) => {

    const paddingClasses = classNames(classes.menu__item__padding)


    return (
        <Sidebar
            as={Menu}
            animation='overlay'
            icon='labeled'
            className={paddingClasses}
            inverted
            onHide={() => {
            }}
            vertical
            visible={toggleMenu}

        >
            <MenuItem onClick={toggleFn} className={paddingClasses}>
                <Link to='/' className={paddingClasses}><Icon name='home'/>Strona główna</Link>
            </MenuItem>
            <MenuItem onClick={toggleFn}>
                <Link to='/profile' className={paddingClasses}><Icon name='user'/>Moje konto</Link>
            </MenuItem>
            <MenuItem onClick={toggleFn}>
                <Link to='/newTask' className={paddingClasses}><Icon name='add'/>Dodaj nowe ogłoszenie</Link>
            </MenuItem>
        </Sidebar>

    );
}

export default AppSidebar;