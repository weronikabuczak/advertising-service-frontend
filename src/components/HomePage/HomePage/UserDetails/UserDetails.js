import classes from "../../../Profile/UserProfile.module.css";
import {Button, Card, Form, Grid, Header, Icon, Image, Modal, Table} from "semantic-ui-react";
import profile from "../../../../files/profile.jpg";
import {useEffect} from "react";
import {getOpinion} from "../../../../store/opinion";
import {useAppDispatch} from "../../../../root";
import {getAnotherUser, getAnotherUserInfo, getUserToken} from "../../../../store/auth";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

const UserDetails = ({open, setOpen, email}) => {
    const {t, i18n} = useTranslation();
    const token = useSelector(getUserToken);
    const dispatch = useAppDispatch();
    const anotherUser = useSelector(getAnotherUserInfo);

    const onClose = (event) => {
        event.preventDefault()
        setOpen(false);
    }
    useEffect(() => {
            if (token) {
                dispatch(getAnotherUser({token, email}))
            }
            console.log(anotherUser)
        },
         [email]);


    return (
        <Modal
            closeIcon
            centered={true}
            open={open}
            onClose={onClose}
            size='medium'
            dimmer='blurring'
        >
            <Card fluid>
                <Card.Content>
                    <Grid stackable>
                        <Grid.Column width={6}>
                            {anotherUser.image != null
                                ? <Image className={classes.profileImage} src={anotherUser.image} rounded/>
                                : <Image className={classes.profileImage} src={profile} rounded/>
                            }
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <Header as='h1'>
                                {anotherUser.name}
                                <Header.Subheader>{anotherUser.location}</Header.Subheader>
                            </Header>
                            <Table className={classes.userInfo__container}>
                                <Table.Body className={classes.userInfo__container}>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Header as='h4' image>
                                                <Header.Content>E-mail</Header.Content>
                                            </Header>
                                        </Table.Cell>
                                        <Table.Cell>{anotherUser.email}</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Header as='h4' image>
                                                <Header.Content>{t("phoneNumber")}</Header.Content>
                                            </Header>
                                        </Table.Cell>
                                        <Table.Cell>{anotherUser.phoneNumber}</Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        </Grid.Column>
                    </Grid>
                </Card.Content>
                <AnotherUserCompletedTasks>

                </AnotherUserCompletedTasks>
            </Card>
        </Modal>
    );
}

export default UserDetails;