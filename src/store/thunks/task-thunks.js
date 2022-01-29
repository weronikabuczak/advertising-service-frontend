export const createTaskApiCall = async ({
                                            token,
                                            title,
                                            content,
                                            category,
                                            address,
                                            pay,
                                            expirationDate,
                                            estimatedTime,
                                            image,
                                            longitude,
                                            latitude
                                        }) => {
    const taskUrl = 'http://localhost:8080/api/task';
    try {
        const body = JSON.stringify({
            title, content, category, address, pay, expirationDate, estimatedTime, image, longitude, latitude
        });
        return fetch(taskUrl, {
            method: 'POST',
            body: body,
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if (response.ok) {
                return response.json().then(data => {
                    return {
                        data
                    }
                })
            } else {
                throw 'Cannot create task'
            }
        })
    } catch (err) {
        throw err;
    }
};

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

export const getAnotherUserCompletedTasksApiCall = async ({token, email}) => {
    try {
        let url = `http://localhost:8080/api/task/complete-by-user/${email}`;
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

export const updateTaskApiCall = async ({
                                            token,
                                            id,
                                            title,
                                            content,
                                            category,
                                            address,
                                            pay,
                                            expirationDate,
                                            estimatedTime,
                                            longitude,
                                            latitude
                                        }) => {
    try {
        const body = JSON.stringify({
            title, content, category, address, pay, expirationDate, estimatedTime, longitude, latitude
        });
        let taskUpdateUrl = `http://localhost:8080/api/task/${id}`;
        return fetch(taskUpdateUrl, {
            method: 'PUT',
            body: body,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        }).then((response) => {
            if (response.ok) {
                return response.json().then(data => {
                    return {
                        data
                    }
                })
            } else {
                throw 'Task update failed!'
            }
        })
    } catch (error) {
        throw error;
    }
};

export const updateTaskImageApiCall = async ({token, image, id}) => {
    try {
        const body = JSON.stringify({image});
        let taskUpdateUrl = `http://localhost:8080/api/task/image/${id}`;
        return fetch(taskUpdateUrl, {
            method: 'PUT',
            body: body,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        }).then((response) => {
            if (response.ok) {
                return response.json().then(data => {
                    return {
                        data
                    }
                })
            } else {
                throw 'Task image update failed!'
            }
        })
    } catch (error) {
        throw error;
    }
};

export const deleteTaskImageApiCall = async ({token, id}) => {
    try {
        let taskDeleteImageUrl = `http://localhost:8080/api/task/image/${id}`;
        return fetch(taskDeleteImageUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        })
    } catch (error) {
        throw error;
    }
};
