import {List, Message, Table} from "semantic-ui-react";
import {getAllUsersEmails, getAnotherUser, getUsersEmails, getUserToken,} from "../../store/auth";
import {useAppDispatch} from "../../root";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {getAllTasks, getAllTasksId, getCurrentTask, getTasks, getTasksId, setCurrentTaskId} from "../../store/task";
import {useHistory} from "react-router-dom";

const TasksList = () => {
    const dispatch = useAppDispatch();
    const token = useSelector(getUserToken);
    const tasks = useSelector(getAllTasks);
    const history = useHistory();
    const task = useSelector(getCurrentTask);

    useEffect(() => {
        if (token) {
            dispatch(getTasks({isUserTasks: false, token}));
        }
        console.log(tasks)
        console.log(task)
        // };
    }, []);


    return (
        <List selection divided verticalAlign='center'>
            <List.Header as='h2'>tasks</List.Header>
            {tasks?.length === 0 &&
            <Message>Brak zleceń</Message>}
            {tasks?.length > 0 && tasks.map((task) => {
                const showUserHandler = () => {
                    dispatch(setCurrentTaskId(task.id))
                    history.push({
                        pathname: `/taskDetails/${task.id}`, state: {isUserTasks: true}
                    });
                }

                return (
                    <List.Item onClick={showUserHandler}>
                        <List.Content>
                            <List.Header as='h5'>{task.id}</List.Header>
                        </List.Content>
                        <List.Content>
                            <List.Header as='h3'>{task.title}</List.Header>
                        </List.Content>
                    </List.Item>
                )
            })}
        </List>
    )
}

export default TasksList;