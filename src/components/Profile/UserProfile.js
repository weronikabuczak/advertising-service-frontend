import classes from './UserProfile.module.css';
import {Button, Card, Grid, Header, Icon, Image, Table} from "semantic-ui-react";
import profile from '../../files/profile.jpg'
import {useEffect, useState} from "react";
import ChangePassword from "./ChangePassword";
import ChangeUserData from "./ChangeUserData";
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import {getUser, getUserInfo, getUserToken} from "../../store/auth";
import {useAppDispatch} from "../../root";

const UserProfile = () => {
    const history = useHistory();
    const dispatch = useAppDispatch();
    const userInfo = useSelector(getUserInfo);
    // const [userInfo, setUserInfo] = useState({});
    const [modalOpenPassword, setModalOpenPassword] = useState(false);
    const [modalOpenUserInfo, setModalOpenUserInfo] = useState(false);
    const token = useSelector(getUserToken);


    // useEffect(() => {
    //     const fetchUserInfo = async () => {
    //         const response = await fetch('http://localhost:8080/api/user/me', {
    //             method: 'get',
    //             headers: {
    //                 'Authorization': 'Bearer ' + token,
    //                 'Content-Type': 'application/json'
    //             }
    //         })
    //         const responseData = await response.json();
    //         const createDate = new Date(responseData.createDate);
    //         responseData.createDate = createDate.toLocaleDateString();
    //         if (responseData.image) {
    //             let avatar = "data:image/jpeg;base64," + responseData.image;
    //             responseData.image = avatar;
    //         }
    //         setUserInfo(responseData);
    //     };
    //     fetchUserInfo();
    // }, []);

    useEffect(() => {
        if (token) {
            dispatch(getUser({token}));
        }
        console.log(userInfo)
    }, [token]);

    const userInfoHandler = () => {
        history.replace('/profile');
    }

    const userTasksHandler = () => {
        history.replace('/userTasks');
    }

    const changePasswordHandler = () => {
        setModalOpenPassword(true);
    }
    const changeUserInfoHandler = () => {
        setModalOpenUserInfo(true);
    }

    return (
        <section className={classes.section}>
            <Button className={classes.button} onClick={userInfoHandler}>Dane</Button>
            <Button className={classes.button} onClick={userTasksHandler}>Moje ogłoszenia</Button>
            <ChangePassword open={modalOpenPassword} setOpen={setModalOpenPassword} email={userInfo.email} />
            <ChangeUserData open={modalOpenUserInfo} setOpen={setModalOpenUserInfo} email={userInfo.email} user={userInfo}/>
            <Card fluid className={classes.userCard__container}>
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
                        <Grid.Column width={6}>
                            {userInfo.image != null
                                ? <Image src={userInfo.image} rounded size='medium'/>
                                : <Image src={profile} rounded size='medium'/>
                            }
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <Header as='h1'>
                                <>{userInfo.name}</>
                                <Button floated='right' onClick={changeUserInfoHandler}>
                                    <Button.Content>Edytuj dane</Button.Content>
                                </Button>
                                <Button floated='right' onClick={changePasswordHandler}>
                                    <Button.Content>Zmień hasło</Button.Content>
                                </Button></Header>

                            <Header as='h2'>{userInfo.location}</Header>
                            <Table className={classes.userInfo__container}>
                                <Table.Body className={classes.userInfo__container}>
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