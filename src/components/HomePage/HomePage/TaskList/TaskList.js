import {useEffect} from "react";
import TaskItem from "./TaskItem/TaskItem";
import {useSelector} from "react-redux";
import {getUserToken} from "../../../../store/auth";
import {getAllTasks, getTasks} from "../../../../store/task";
import {useAppDispatch} from "../../../../root";

const TaskList = ({tasks, onClick}) => {
    console.log(tasks)
    return (
        <ul>
            {tasks && tasks.map((task) => (
                <TaskItem props={task} onClick={onClick}/>
            ))}
        </ul>
    );
};

export default TaskList;