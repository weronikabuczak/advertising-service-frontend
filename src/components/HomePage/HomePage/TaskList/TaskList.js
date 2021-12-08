import TaskItem from "./TaskItem/TaskItem";
import {useCallback, useContext, useEffect, useState} from "react";
import AuthContext from "../../../../store/auth-context";

const TaskList = () => {
    const authContext = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchTasks = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const userTasks = false;
            const response = await fetch(`http://localhost:8080/api/task?userTasks=${userTasks}`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + authContext.token,
                    'Content-Type': 'application/json'
                }
            })
            console.log(response)
            if (!response.ok) {
                throw new Error('Fetch error');
            }

            const data = await response.json();
            const fetchedTasks = [];

     /*       for (const id in tasks) {
                fetchedTasks.push({
                    id: id,
                    title: data[id].title,
                    content: data[id].content,
                    pay: data[id].pay,
                });
            }*/
            setTasks([...data])
            // setTasks(fetchedTasks);
        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchTasks();
    }, []);

    console.log(tasks)
    return (
        <ul>
            {tasks.map((task) => (
                <p> {task.title}</p>

            ))}
        </ul>
    );
};

export default TaskList;