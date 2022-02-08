import classes from './UserProfile.module.css';
import {Button, Card, Divider, Grid, Header, Icon, Image, Reveal, Table} from "semantic-ui-react";
import profile from '../../files/profile.jpg'
import {useEffect, useState} from "react";
import ChangePassword from "./UserTasks/UserProfileModals/ChangePassword";
import ChangeUserData from "./UserTasks/UserProfileModals/ChangeUserData";
import {useHistory, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {getMe, getUser, getUserInfo, getUserToken} from "../../store/auth";
import {useAppDispatch} from "../../root";
import {useTranslation} from "react-i18next";
import UpdateUserImage from "./UserTasks/UserProfileModals/UpdateUserImage";
import DeleteUserImage from "./UserTasks/UserProfileModals/DeleteUserImage";

const UserProfile = () => {
    const {t} = useTranslation();

    const history = useHistory();
    const dispatch = useAppDispatch();
    const userInfo = useSelector(getUserInfo);
    const [modalOpenPassword, setModalOpenPassword] = useState(false);
    const [modalOpenUserInfo, setModalOpenUserInfo] = useState(false);
    const [modalOpenUserImage, setModalOpenUserImage] = useState(false);
    const [modalOpenDeleteUserImage, setModalOpenDeleteUserImage] = useState(false);
    const token = useSelector(getUserToken);

    useEffect(() => {
        if (token) {
            dispatch(getMe({token}))
        }

    }, [modalOpenDeleteUserImage, modalOpenUserInfo, modalOpenPassword]);


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

    const updateUserImageHandler = () => {
        setModalOpenUserImage(true);
    }

    const deleteUserImageHandler = () => {
        setModalOpenDeleteUserImage(true);
    }

    return (
        <section className={classes.section}>
            <Button.Group className={classes.userButtons}>
                <Button primary onClick={userInfoHandler}>{t("userData")}</Button>
                <Button secondary onClick={userTasksHandler}>{t("myAdverts")}</Button>
            </Button.Group>
            <Button.Group className={classes.userButtons} floated='right'>
                <Button positive floated='right' onClick={changeUserInfoHandler}>
                    <Button.Content>{t("edit")}</Button.Content>
                </Button>
                <Button floated='right' onClick={changePasswordHandler}>
                    <Button.Content>{t("changePassword")}</Button.Content>
                </Button>
            </Button.Group>
            <ChangePassword open={modalOpenPassword} setOpen={setModalOpenPassword} email={userInfo.email}/>
            <ChangeUserData open={modalOpenUserInfo} setOpen={setModalOpenUserInfo} email={userInfo.email}
                            user={userInfo}/>
            <UpdateUserImage open={modalOpenUserImage} setOpen={setModalOpenUserImage} email={userInfo.email}/>
            <DeleteUserImage open={modalOpenDeleteUserImage} setOpen={setModalOpenDeleteUserImage}
                             email={userInfo.email}/>
            <Card fluid className={classes.userCard__container}>
                <Card.Content>
                    <Card.Header>
                        <Header as='h5' icon textAlign='center'>
                            <Icon name='users'/>
                            {t("myAccount")}
                        </Header>
                    </Card.Header>
                </Card.Content>
                <Card.Content>
                    <Grid stackable>
                        <Grid.Column width={6}>

                            {userInfo.image
                                ? (<div><Image className={classes.profileImage} src={userInfo.image} rounded/>
                                    <Divider fitted/>
                                    <Button size='mini' onClick={updateUserImageHandler}
                                            className={classes.userImage__button}>Zmień zdjęcie</Button>
                                    <Button size='mini' onClick={deleteUserImageHandler}
                                            className={classes.userImage__button}>Usuń zdjęcie</Button></div>)
                                : (<div><Image className={classes.profileImage} src={profile} rounded/>
                                    <Divider fitted/>
                                    <Button size='mini' onClick={updateUserImageHandler}
                                            className={classes.userImage__button}>Dodaj zdjęcie</Button></div>)
                            }

                        </Grid.Column>
                        <Grid.Column width={10}>
                            <Header as='h1'>
                                {userInfo.name}
                                <Header.Subheader>{userInfo.location}</Header.Subheader>
                            </Header>

                            <Table className={classes.userInfo__container}>
                                <Table.Body>
                                    <Table.Row >
                                        <Table.Cell>
                                            <Header as='h4' image>
                                                <Header.Content>E-mail</Header.Content>
                                            </Header>
                                        </Table.Cell>
                                        <Table.Cell >{userInfo.email}</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Header as='h4' image>
                                                <Header.Content>{t("phoneNumber")}</Header.Content>
                                            </Header>
                                        </Table.Cell>
                                        <Table.Cell>{userInfo.phoneNumber}</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Header as='h4' image>
                                                <Header.Content>{t("accountCreationDate")}</Header.Content>
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