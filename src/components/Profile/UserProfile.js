import classes from './UserProfile.module.css';
import {Button, Card, Feed, Grid, Header, Icon, Image, Modal, Table} from "semantic-ui-react";
import profile from '../../files/profile.jpg'
import {useContext, useEffect, useState} from "react";
import AuthContext from "../../store/auth-context";
import ChangePassword from "./ChangePassword";
import ChangeUserData from "./ChangeUserData";

const UserProfile = () => {
    const [userInfo, setUserInfo] = useState({});
    const [modalOpenPassword, setModalOpenPassword] = useState(false);
    const [modalOpenUserInfo, setModalOpenUserInfo] = useState(false);
    //const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    const authContext = useContext(AuthContext);

    //GET info
    useEffect(() => {
        const fetchUserInfo = async () => {
            const response = await fetch('http://localhost:8080/api/user/me', {
                method: 'get',
                headers: {
                    'Authorization': 'Bearer ' + authContext.token,
                    'Content-Type': 'application/json'
                }
            })
            const responseData = await response.json();
            let createDate = new Date(responseData.createDate);
            responseData.createDate = createDate.toLocaleDateString();
            setUserInfo(responseData);


        };
        fetchUserInfo();
    }, []);


    const changePasswordHandler = () => {
        setModalOpenPassword(true);
    }
    const changeUserInfoHandler = () => {
        setModalOpenUserInfo(true);
    }

    return (
        <section className={classes.profile}>
            <ChangePassword open={modalOpenPassword} setOpen={setModalOpenPassword} email={userInfo.email}/>
            <ChangeUserData open={modalOpenUserInfo} setOpen={setModalOpenUserInfo} email={userInfo.email}/>
            <Card fluid>
                <Card.Content>
                    <Card.Header>
                        <Header as='h5' icon textAlign='center'>
                            <Icon name='users'/>
                            Moje konto
                        </Header>
                    </Card.Header>
                </Card.Content>
                <Card.Content>
                    <Grid>
                        <Grid.Column width={4}>
                            <Image src={profile} rounded size='medium'/>
                        </Grid.Column>
                        <Grid.Column width={12}>
                            <Header as='h1'>
                                <>{userInfo.name}</>
                                <Button floated='right' onClick={changeUserInfoHandler}>
                                    <Button.Content>Edytuj dane</Button.Content>
                                </Button>
                                <Button floated='right' onClick={changePasswordHandler}>
                                    <Button.Content>Zmień hasło</Button.Content>
                                </Button></Header>

                            <Header as='h2'>{userInfo.location}</Header>
                            <Table>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Header as='h4' image>
                                                <Header.Content>E-mail</Header.Content>
                                            </Header>
                                        </Table.Cell>
                                        <Table.Cell>{userInfo.email}</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Header as='h4' image>
                                                <Header.Content>Telefon</Header.Content>
                                            </Header>
                                        </Table.Cell>
                                        <Table.Cell>{userInfo.phoneNumber}</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Header as='h4' image>
                                                <Header.Content>Data utworzenia konta</Header.Content>
                                            </Header>
                                        </Table.Cell>
                                        <Table.Cell>{userInfo.createDate}</Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        </Grid.Column>
                    </Grid>
                </Card.Content>
            </Card>
        </section>
    );
};

export default UserProfile;