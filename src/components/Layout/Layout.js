import {Fragment} from 'react';
import Navigation from "./Navigation";
import classes from './Layout.module.css';

const Layout = (props) => {
    return (
        <Fragment>
            <Navigation/>
            <main>{props.children}</main>
            <footer><h4>Services App 2021</h4>
                <p><a href="mailto:weronika.kurczyna@gmail.com">weronika.kurczyna@gmail.com</a></p></footer>
        </Fragment>
    );
};

export default Layout;