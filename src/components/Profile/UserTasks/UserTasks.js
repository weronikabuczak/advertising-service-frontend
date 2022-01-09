import TaskList from "../../HomePage/HomePage/TaskList/TaskList";
import {Button, Segment} from "semantic-ui-react";
import {useHistory} from "react-router-dom";
import classes from "../UserProfile.module.css";
import React, {useEffect, useState} from "react";
import {getAllTasks, getTasks} from "../../../store/task";
import {useAppDispatch} from "../../../root";
import {useSelector} from "react-redux";
import {getUserToken} from "../../../store/auth";
import Link from "react-router-dom/es/Link";
import {statuses} from "../../../utils/taskStatus";
import {useTranslation} from "react-i18next";
import {getStatusColor, getStatusLabel} from "../../../utils/functions";


const UserTasks = () => {
    const {t, i18n} = useTranslation();
    const {language} = i18n;

    const history = useHistory();
    const dispatch = useAppDispatch();
    const token = useSelector(getUserToken);
    const tasks = useSelector(getAllTasks);
    const [status, setStatus] = useState('');
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

    useEffect(() => {
        if (token) {
            dispatch(getTasks({isUserTasks: true, token, status}));
        }
    }, [token, status]);


    const statusesBar = Object.entries(statuses).map((arr) => {
        const [statusId, statusObj] = arr

        const label = getStatusLabel(statusId,language);


        // TODO: do it your way
        const categoryColor = {
            'background-color': getStatusColor(statusId)
        };


        return <Button color={statusObj.colors} onClick={filterTasks}
                       content={statusId}>{label}</Button>
    })


    return <div className={classes.section}>
        <Button primary onClick={userInfoHandler}>{t("userData")}</Button>
        <Button secondary onClick={userTasksHandler}>{t("myAdverts")}</Button>
        <Button.Group>
            <Button content='' floated='left' onClick={filterTasks}>{t("all")}</Button>
            {statusesBar}
        </Button.Group>
        {tasks?.length > 0 && tasks
            ?
            <Segment basic>
                <TaskList tasks={tasks} onClick={onClickFunction} isUserTasks='true'/>
            </Segment>
            :
            (<div className={classes.noTask__button}>
                <Button><Link to="/newTask">{t("noTasksAddNew")}</Link></Button>
            </div>)
        }
    </div>
}

export default UserTasks;