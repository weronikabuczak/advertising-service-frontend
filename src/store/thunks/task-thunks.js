export const getTasksApiCall = async ({isUserTasks, token}) => {
    try {
        return fetch(`http://localhost:8080/api/task?userTasks=${isUserTasks}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            if (response.ok) {
                return response.json().then(data => {
                    console.log(data)
                    return [...data]
                })
            } else {
                throw 'Authentication failed!'
            }
        })
    } catch (error) {
        throw error;
    }
};