import TaskItem from "./TaskItem/TaskItem";

const TaskList = ({tasks, onClick, isUserTasks, listStyle, currentTask}) => {
    const sortedTasks = [...tasks].sort((a, b) => a.id === currentTask?.id ? -1 : 1);

    return (
        <ul style={listStyle}>
            {tasks && sortedTasks.map((task) => (
                <TaskItem task={task} onClick={onClick} isUserTasks={isUserTasks} currentTask={currentTask}/>
            ))}
        </ul>
    );
};

export default TaskList;