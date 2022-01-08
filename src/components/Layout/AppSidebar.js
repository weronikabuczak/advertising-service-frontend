import React from 'react'
import {
    Icon,
    Menu, MenuItem,
    Sidebar
} from 'semantic-ui-react'
import {Link} from "react-router-dom";
import classes from './Navigation.module.css';

const AppSidebar = ({toggleFn, toggleMenu}) => {

    //const paddingClasses = classNames(classes.menu__item__padding)

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
            <MenuItem onClick={toggleFn} >
                <Link to='/'><Icon name='home' className={classes.paddingClasses}/>Strona główna</Link>
            </MenuItem>
            <MenuItem onClick={toggleFn} link='true'>
                <Link to='/profile'><Icon name='user'/>Moje konto</Link>
            </MenuItem>
            <MenuItem onClick={toggleFn}>
                <Link to='/newTask'><Icon name='add'/>Dodaj nowe ogłoszenie</Link>
            </MenuItem>
        </Sidebar>

    );
}

export default AppSidebar;