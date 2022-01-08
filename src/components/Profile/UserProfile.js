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
import {useTranslation} from "react-i18next";

const UserProfile = () => {
    const {t} = useTranslation();

    const history = useHistory();
    const dispatch = useAppDispatch();
    const userInfo = useSelector(getUserInfo);
    const [modalOpenPassword, setModalOpenPassword] = useState(false);
    const [modalOpenUserInfo, setModalOpenUserInfo] = useState(false);
    const token = useSelector(getUserToken);


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
            <Button onClick={userInfoHandler}>{t("userData")}</Button>
            <Button onClick={userTasksHandler}>{t("myAdverts")}</Button>
            <ChangePassword open={modalOpenPassword} setOpen={setModalOpenPassword} email={userInfo.email} />
            <ChangeUserData open={modalOpenUserInfo} setOpen={setModalOpenUserInfo} email={userInfo.email} user={userInfo}/>
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
                            {userInfo.image != null
                                ? <Image className={classes.profileImage} src={userInfo.image} rounded fluid/>
                                : <Image className={classes.profileImage} src={profile} rounded />
                            }
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <Header as='h1'>
                                <>{userInfo.name}</>
                                <Button floated='right' onClick={changeUserInfoHandler}>
                                    <Button.Content>{t("edit")}</Button.Content>
                                </Button>
                                <Button floated='right' onClick={changePasswordHandler}>
                                    <Button.Content>{t("changePassword")}</Button.Content>
                                </Button></Header>

                            <Header>{userInfo.location}</Header>
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
                                                <Header.Content></Header.Content>
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
};export default UserProfile;