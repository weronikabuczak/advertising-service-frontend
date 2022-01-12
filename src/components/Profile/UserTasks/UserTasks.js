import TaskList from "../../HomePage/TaskList/TaskList";
import {Button, Card, Icon, Segment} from "semantic-ui-react";
import {useHistory} from "react-router-dom";
import classes from "../UserProfile.module.css";
import React, {useEffect, useState} from "react";
import {getAllTasks, getAnotherUserCompletedTasks, getAnotherUserTasks, getTasks} from "../../../store/task";
import {useAppDispatch} from "../../../root";
import {useSelector} from "react-redux";
import {getUserEmail, getUserToken} from "../../../store/auth";
import Link from "react-router-dom/es/Link";
import {statuses} from "../../../utils/taskStatus";
import {useTranslation} from "react-i18next";
import {getCategoryLabel, getStatusColor, getStatusLabel} from "../../../utils/functions";
import UserCompletedTasks from "../../HomePage/TaskList/TaskItem/TaskDetails/UserDetails/userCompletedTasks";


const UserTasks = () => {

    const {t, i18n} = useTranslation();
    const {language} = i18n;

    const history = useHistory();
    const dispatch = useAppDispatch();
    const token = useSelector(getUserToken);
    const tasks = useSelector(getAllTasks);
    const email = useSelector(getUserEmail);
    const myCompletedTasks = useSelector(getAnotherUserTasks);
    const [status, setStatus] = useState('');
    const [showCompletedTasks, setShowCompletedTasks] = useState(false);

    const userInfoHandler = () => {
        history.replace('/profile');
    }

    const userTasksHandler = () => {
        history.replace('/userTasks');
    }

    const onClickFunction = (id) => {
        const task = tasks.find(t => t.id === id);
    }

    const filterTasks = (e, button) => {
        const {content} = button;
        setStatus(content);
    }

    const getTaskCompletedByMe = () => {
        if (token) {
            dispatch(getAnotherUserCompletedTasks({token, email}));
        }
        console.log(myCompletedTasks)
        setShowCompletedTasks(true);
    }

    useEffect(() => {
        if (token) {
            dispatch(getTasks({isUserTasks: true, token, status}));
        }
        setShowCompletedTasks(false);
    }, [token, status]);


    const statusesBar = Object.entries(statuses).map((arr) => {
        const [statusId, statusObj] = arr

        const label = getStatusLabel(statusId, language);


        // TODO: do it your way
        const categoryColor = {
            'background-color': getStatusColor(statusId)
        };


        return <Button color={statusObj.colors} onClick={filterTasks}
                       content={statusId}>{label}</Button>
    })


    return <div className={classes.taskSection}>
        <Button.Group className={classes.userButtons}>
            <Button primary onClick={userInfoHandler}>{t("userData")}</Button>
            <Button secondary onClick={userTasksHandler}>{t("myAdverts")}</Button>
        </Button.Group>
        <Button.Group className={classes.taskButtons}>
            <Button content='' floated='left' onClick={filterTasks}>{t("all")}</Button>
            {statusesBar}
            <Button floated='left' onClick={getTaskCompletedByMe}>Wykonane przeze mnie</Button>
        </Button.Group>
        {tasks?.length > 0 && tasks && !showCompletedTasks
            ?
            <Segment basic>
                <TaskList tasks={tasks} onClick={onClickFunction} isUserTasks={true}/>
            </Segment>
            :
            (!showCompletedTasks &&
                <div className={classes.noTask__button}>
                    <Button><Link to="/newTask">{t("noTasksAddNew")}</Link></Button>
                </div>)
        }
        <ul>
            {myCompletedTasks && showCompletedTasks && myCompletedTasks.map((task) => (
                <section className={classes.myCompletedTasks}>
                    <Card fluid className={classes.myCompletedTasksItem}>
                        <Card.Content header={task.title}/>
                        <Card.Content><strong>Kategoria: </strong> {task.category}</Card.Content>
                        <Card.Content><strong>Adres: </strong>{task.address}
                        </Card.Content>
                        <Card.Content><strong>Zapłata: </strong>{task.pay}</Card.Content>

                        {task.opinion &&
                            <Card.Content>
                                <h4>Opinia od {task.user.email} ({task.user.name}, {task.user.location}):</h4>
                                <Card.Content>
                                    <Icon name='star'/>{task.opinion.rating}/5
                                </Card.Content>

                                {task.opinion.content &&
                                    <Segment>
                                        <strong>Opis: </strong>{task.opinion.content}
                                    </Segment>
                                }
                            </Card.Content>
                        }
                    </Card>
                </section>
            ))}
        </ul>

    </div>
}


export default UserTasks;