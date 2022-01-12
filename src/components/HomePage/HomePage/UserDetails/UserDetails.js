import classes from "../../../Profile/UserProfile.module.css";
import {Button, Card, Form, Grid, Header, Icon, Image, Modal, Table} from "semantic-ui-react";
import profile from "../../../../files/profile.jpg";
import {useEffect} from "react";
import {getOpinion} from "../../../../store/opinion";
import {useAppDispatch} from "../../../../root";
import {getAnotherUser, getAnotherUserInfo, getUserToken} from "../../../../store/auth";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import AnotherUserCompletedTasks from "./AnotherUserCompletedTasks";
import {getAnotherUserCompletedTasks, getAnotherUserTasks} from "../../../../store/task";
import TaskItem from "../TaskList/TaskItem/TaskItem";

const UserDetails = ({open, setOpen, email}) => {
    const {t, i18n} = useTranslation();
    const token = useSelector(getUserToken);
    const dispatch = useAppDispatch();
    const anotherUser = useSelector(getAnotherUserInfo);
    const anotherUserTasks = useSelector(getAnotherUserTasks);

    const onClose = (event) => {
        event.preventDefault()
        setOpen(false);
    }
    useEffect(() => {
            if (token && open) {
                dispatch(getAnotherUser({token, email}));
                dispatch(getAnotherUserCompletedTasks ({token, email}));
            }
            console.log(anotherUser)
            console.log(anotherUserTasks)
        },
         [email, open]);


    return (
        <Modal
            closeIcon
            centered={true}
            open={open}
            scrolling
            onClose={onClose}
            size='medium'
            dimmer='blurring'


        >
            <Card fluid>
                <Card.Content>
                    <Grid stackable>
                        <Grid.Column width={4}>
                            {anotherUser.image != null
                                ? <Image className={classes.profileImage} src={anotherUser.image} rounded/>
                                : <Image className={classes.profileImage} src={profile} rounded/>
                            }
                        </Grid.Column>
                        <Grid.Column width={12}>
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
                        <h1>Wykonane zadania:</h1>
                        <ul>
                        {anotherUserTasks && anotherUserTasks.map((task) => (
                            <AnotherUserCompletedTasks task={task}/>
                                ))}
                            </ul>
                    </Grid>
                </Card.Content>
            </Card>
        </Modal>
    );
}

export default UserDetails;