import {useEffect} from "react";
import TaskItem from "./TaskItem/TaskItem";
import {useSelector} from "react-redux";
import {getUserToken} from "../../../../store/auth";
import {getAllTasks, getTasks} from "../../../../store/task";
import {useAppDispatch} from "../../../../root";

const TaskList = ({isUserTasks}) => {
    const dispatch = useAppDispatch();
    const token = useSelector(getUserToken);
    const tasks = useSelector(getAllTasks);

    useEffect(() => {
        if (token) {
            dispatch(getTasks({isUserTasks, token}));
        }
    }, [isUserTasks, token]);

    return (
        <ul>
            {tasks && tasks.map((task) => (
                <TaskItem props={task}/>
            ))}
        </ul>
    );
};

export default TaskList;