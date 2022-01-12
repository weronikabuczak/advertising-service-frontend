import TaskItem from "./TaskItem/TaskItem";

const TaskList = ({tasks, onClick, isUserTasks, listStyle}) => {
    return (
        <ul style={listStyle}>
            {tasks && tasks.map((task) => (
                <TaskItem task={task} onClick={onClick} isUserTasks={isUserTasks}/>
            ))}
        </ul>
    );
};

export default TaskList;