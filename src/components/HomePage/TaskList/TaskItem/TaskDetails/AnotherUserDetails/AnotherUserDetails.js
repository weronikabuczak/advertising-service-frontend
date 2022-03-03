import classes from './AnotherUserDetails.module.css';
import {Grid, Header, Image, Modal, Table} from "semantic-ui-react";
import profile from "../../../../../../files/profile.jpg";
import {useEffect} from "react";
import {useAppDispatch} from "../../../../../../root";
import {getAnotherUser, getAnotherUserInfo, getUserToken} from "../../../../../../store/auth";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import UserCompletedTasks from "./UserCompletedTasks";
import {getAnotherUserCompletedTasks, getAnotherUserTasks} from "../../../../../../store/task";

const AnotherUserDetails = ({open, setOpen, email}) => {
    const {t} = useTranslation();
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
                dispatch(getAnotherUserCompletedTasks({token, email}));
            }
        },
        [dispatch, token, email, open]);

    return (
        <Modal
            closeIcon
            centered={true}
            open={open}
            scrolling
            onClose={onClose}
            size='large'
            dimmer='blurring'>
            <section className={classes.section}>
                <Grid>
                    <Grid.Column width={4}>
                        {anotherUser.image != null
                            ? <Image size='small' className={classes.profileImage} src={anotherUser.image} rounded/>
                            : <Image size='small' className={classes.profileImage} src={profile} rounded/>
                        }
                        {/*todo*/}
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
                                        <Header as='h4'>
                                            <Header.Content>E-mail</Header.Content>
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell>{anotherUser.email}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Header as='h4'>
                                            <Header.Content>{t("phoneNumber")}</Header.Content>
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell>{anotherUser.phoneNumber}</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                </Grid>
            </section>
            <section className={classes.section}>
                {anotherUserTasks.length > 0 ? (
                        <div>
                            <h2>{t("completedTasks")}</h2>
                            <ul>
                                <Grid centered>
                                    <Grid.Column width={14}>
                                        {anotherUserTasks && anotherUserTasks.map((task) => (
                                            <UserCompletedTasks task={task}/>
                                        ))}
                                    </Grid.Column>
                                </Grid>

                            </ul>
                        </div>
                    )
                    : (<div>{t("userHasNotPerformedAnyTasks")}</div>)
                }
            </section>

        </Modal>
    );
}

export default AnotherUserDetails;