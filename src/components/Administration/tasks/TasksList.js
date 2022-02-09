import {List, Message} from "semantic-ui-react";
import {getUserToken,} from "../../../store/auth";
import {useAppDispatch} from "../../../root";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {getAllTasks, getCurrentTask, getTasks, setCurrentTaskId} from "../../../store/task";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";

const TasksList = () => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const token = useSelector(getUserToken);
    const tasks = useSelector(getAllTasks);
    const history = useHistory();
    const task = useSelector(getCurrentTask);

    useEffect(() => {
        if (token) {
            dispatch(getTasks({isUserTasks: false, token}));
        }
    }, []);


    return (
        <List selection divided verticalAlign='center'>
            <List.Header as='h2'>{t("tasksList")}</List.Header>
            {tasks?.length === 0 &&
                <Message>{t("noTasks")}</Message>}
            {tasks?.length > 0 && tasks.map((task) => {
                const showTaskHandler = () => {
                    dispatch(setCurrentTaskId(task.id))
                    history.push({
                        pathname: `/taskDetails/${task.id}`, state: {isUserTasks: true}
                    });
                }

                return (
                    <List.Item onClick={showTaskHandler}>
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