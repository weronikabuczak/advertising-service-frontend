import TaskItem from "./TaskItem/TaskItem";

const TaskList = ({tasks, onClick, isUserTasks, overflowTaskListStyle, currentTask}) => {
    const sortedTasks = [...tasks].sort((a, b) => a.id === currentTask?.id ? -1 : 1);

    return (
        <ul style={overflowTaskListStyle}>
            {tasks && sortedTasks.map((task) => (
                <TaskItem key={task.id} task={task} onClick={onClick} isUserTasks={isUserTasks}
                          currentTask={currentTask}/>
            ))}
        </ul>
    );
};

export default TaskList;