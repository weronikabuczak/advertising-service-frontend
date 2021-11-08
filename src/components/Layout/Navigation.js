import {Link} from 'react-router-dom';
import classes from './Navigation.module.css';
import AppSidebar from "./AppSidebar";
import {useState} from "react";
import flag from '../../files/flag.png'
import task from '../../files/task.png'

const Navigation = () => {

    const [toggle, setToggle] = useState(false);

    function toggleMenu() {
        setToggle(!toggle);
    }

    return (
        <header className={classes.header}>
            <Link to='/'>
                <button className={classes.logo} onClick={toggleMenu}>MENU</button>
            </Link>
            <Link to='/'>
                <div className={classes.logo}>
                    <img src={task} alt='task'></img>Services App
                </div>
            </Link>
            <nav>
                <ul>
                    <li>
                        <button>Logout</button>
                    </li>
                    <li>
                        <Link to='/'><img src={flag} alt='flag'/></Link>
                    </li>
                </ul>
            </nav>
            <div>
                <AppSidebar toggleMenu={toggle}/>
            </div>
        </header>

    );
};

export default Navigation;