export const getTasksApiCall = async ({isUserTasks, token, category, status}) => {
    try {
        let url = `http://localhost:8080/api/task?userTasks=${isUserTasks}`;
        if (category) {
            url += `&category=${category}`
        }
        if (status) {
            url += `&status=${status}`
        }
        return fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            if (response.ok) {
                return response.json().then(data => {
                    return [...data]
                })
            } else {
                throw 'Fetching tasks failed!'
            }
        })
    } catch (error) {
        throw error;
    }
};

export const deleteTaskApiCall = async ({token, id}) => {
    try {
        return fetch(`http://localhost:8080/api/task/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            // if (response.ok) {
                return response.json().then(data => {
                    return data
                })
            // } else {
            //     throw 'Cannot delete task'
            // }
        })
    } catch (error) {
        throw error;
    }
};
