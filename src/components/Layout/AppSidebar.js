import React from 'react'
import {
    Icon,
    Menu,
    Sidebar
} from 'semantic-ui-react'
import {Link} from "react-router-dom";

const AppSidebar = (props) => {
    const [visible, setVisible] = React.useState(false)

    return (
        <Sidebar
            as={Menu}
            animation='overlay'
            icon='labeled'
            inverted
            onHide={() => setVisible(false)}
            vertical
            visible={props.toggleMenu}
            width='wide'
        >
            <Menu.Item>
                <Link to='/'><Icon name='home'/>Strona główna</Link>
            </Menu.Item>
            <Menu.Item>
                <Link to='/profile'><Icon name='user'/>Moje konto</Link>
            </Menu.Item>
            <Menu.Item>
                <Link to='/new-task'><Icon name='add'/>Dodaj nowe ogłoszenie</Link>
            </Menu.Item>
        </Sidebar>

    );
}

export default AppSidebar;