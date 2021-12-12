import TaskList from "../../HomePage/HomePage/TaskList/TaskList";
import {Button} from "semantic-ui-react";
import {useHistory} from "react-router-dom";
import classes from "../UserProfile.module.css";

const UserTasks = () => {
    const history = useHistory();

    const userInfoHandler = () => {
        history.replace('/profile');
    }

    const userTasksHandler = () => {
        history.replace('/userTasks');
    }

    return <section className={classes.section}>
        <Button onClick={userInfoHandler}>Dane</Button>
        <Button onClick={userTasksHandler}>Moje ogłoszenia</Button>
        <TaskList isUserTasks={true}/>
    </section>
}

export default UserTasks;