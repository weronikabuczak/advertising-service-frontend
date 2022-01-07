import TaskList from "../../HomePage/HomePage/TaskList/TaskList";
import {Button} from "semantic-ui-react";
import {useHistory} from "react-router-dom";
import classes from "../UserProfile.module.css";
import React, {useEffect} from "react";
import {getAllTasks, getTasks} from "../../../store/task";
import {useAppDispatch} from "../../../root";
import {useSelector} from "react-redux";
import {getUserToken} from "../../../store/auth";
import Link from "react-router-dom/es/Link";


const UserTasks = () => {
    const history = useHistory();
    const dispatch = useAppDispatch();
    const token = useSelector(getUserToken);
    const tasks = useSelector(getAllTasks);

    const userInfoHandler = () => {
        history.replace('/profile');
    }

    const userTasksHandler = () => {
        history.replace('/userTasks');
    }

    const onClickFunction = (id) => {
        const task = tasks.find(t => t.id === id);
    }

    useEffect(() => {
        if (token) {
            dispatch(getTasks({isUserTasks: true, token}));
        }
    }, [token]);

    return <div className={classes.section}>
        <Button color='teal' onClick={userInfoHandler}>Dane</Button>
        <Button color='vk' onClick={userTasksHandler}>Moje ogłoszenia</Button>
        {tasks?.length > 0 && tasks
            ?
            <TaskList tasks={tasks} onClick={onClickFunction} isUserTasks='true'/>
            :
            (<div className={classes.noTask__button}>
                    <Button><Link to="/newTask">Brak ogłoszeń. Kliknij, aby dodać pierwsze
                        zlecenie.</Link></Button>
                </div>)
        }
        {/*<TaskList tasks={tasks} onClick={onClickFunction} isUserTasks='true'/>*/}
    </div>
}

export default UserTasks;