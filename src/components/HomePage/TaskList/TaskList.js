import TaskItem from "./TaskItem/TaskItem";

const TaskList = ({tasks, onClick, isUserTasks}) => {
    return (
        <ul>
            {tasks && tasks.map((task) => (
                <TaskItem task={task} onClick={onClick} isUserTasks={isUserTasks}/>
            ))}
        </ul>
    );
};

export default TaskList;