import TaskList from "../../HomePage/HomePage/TaskList/TaskList";
import {Button} from "semantic-ui-react";
import {useHistory} from "react-router-dom";
import classes from "../UserProfile.module.css";
import {useEffect} from "react";
import {getAllTasks, getTasks} from "../../../store/task";
import {useAppDispatch} from "../../../root";
import {useSelector} from "react-redux";
import {getUserToken} from "../../../store/auth";

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
        <Button onClick={userInfoHandler}>Dane</Button>
        <Button onClick={userTasksHandler}>Moje ogłoszenia</Button>
        <TaskList tasks={tasks} onClick={onClickFunction} isUserTasks='true'/>
    </div>
}

export default UserTasks;