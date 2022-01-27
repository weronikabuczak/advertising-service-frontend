import React, {useEffect, useRef, useState} from 'react'
import {
    Icon,
    Menu, MenuItem,
    Sidebar
} from 'semantic-ui-react'
import {Link} from "react-router-dom";
import classes from './Navigation.module.css';
import {useTranslation} from "react-i18next";
import {set} from "react-hook-form";

const AppSidebar = ({toggleFn, toggleMenu}) => {
    const {t} = useTranslation();
    // const [showMenu, setShowMenu] = useState(false);
    // const wrapperRef = useRef(null);
    // useOutsideAlerter(wrapperRef);
    //
    // function useOutsideAlerter(ref) {
    //     useEffect(() => {
    //         setShowMenu(toggleMenu);
    //         console.log('showmenu  ' + showMenu)
    //         /**
    //          * Alert if clicked on outside of element
    //          */
    //         function handleClickOutside(event) {
    //             if  (ref.current && !ref.current.contains(event.target)) {
    //                 console.log('clicked outside');
    //                 console.log('togglemenu  ' + toggleMenu);
    //                 setShowMenu(false);
    //             }
    //         }
    //
    //         // Bind the event listener
    //         document.addEventListener("mousedown", handleClickOutside);
    //         return () => {
    //             // Unbind the event listener on clean up
    //             document.removeEventListener("mousedown", handleClickOutside);
    //         };
    //     }, [ref, toggleMenu]);
    // }

    return (
        // <div ref={wrapperRef}>
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
                {/*<button onClick={setShowSidebar(false)}><Icon name='star outline'/>*/}
                {/*</button>*/}
                <MenuItem onClick={toggleFn}>
                    <Link to='/'><Icon name='home' className={classes.paddingClasses}/>{t("home")}</Link>
                </MenuItem>
                <MenuItem onClick={toggleFn}>
                    <Link to='/profile'><Icon name='user'/>{t("myAccount")}</Link>
                </MenuItem>
                <MenuItem onClick={toggleFn}>
                    <Link to='/newTask'><Icon name='add'/>{t("newTask")}</Link>
                </MenuItem>
            </Sidebar>
        // </div>
    );
}

export default AppSidebar;