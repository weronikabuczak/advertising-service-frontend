import jwtDecode from "jwt-decode";

const loginUrl = 'http://localhost:8080/api/user/login';
const registerUrl = 'http://localhost:8080/api/user/register';

export const loginUserApiCall = async ({email, password}) => {
    try {
        const body = JSON.stringify({email, password});
        return fetch(loginUrl, {
            method: 'POST',
            body: body,
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if (response.ok) {
                return response.json().then(data => {
                    return {
                        token: data.token,
                        remainingTime: getExpirationTimeFromToken(data.token),
                        receivedEmail: data.email,
                        role: data.role
                    }
                })
            } else {
                throw new Error('Authentication failed!');
            }
        })
    } catch (error) {
        throw error;
    }
};

export const registerUserApiCall = async ({
                                              email,
                                              currentPassword,
                                              newPassword,
                                              name,
                                              location,
                                              phoneNumber,
                                              image
                                          }) => {
    try {
        const body = JSON.stringify({email, currentPassword, newPassword, name, location, phoneNumber, image});
        return fetch(registerUrl, {
            method: 'POST',
            body: body,
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if (response.ok) {
                return response.json().then(data => {
                    return {
                        token: data.token,
                        receivedEmail: data.email,
                        role: data.role,
                        remainingTime: getExpirationTimeFromToken(data.token)
                    }
                })
            } else {
                throw new Error('Authentication failed!');
            }
        })
    } catch (err) {
        throw err;
    }
};

export const getExpirationTimeFromToken = (token) => {
    const {exp} = jwtDecode(token);
    console.log(exp)
    // return exp;
    const currentTime = new Date().getTime();
    const receivedExpirationTime = exp * 1000;
    const remainingTime = receivedExpirationTime - currentTime;
    // const remainingTime = 6000;
    console.log(remainingTime);
    return remainingTime;

};

export const getRemainingTimeFromToken = (expirationTime) => {
    const currentTime = new Date().getTime();
    const receivedExpirationTime = expirationTime * 1000;
    //const remainingTime = receivedExpirationTime - currentTime;
    const remainingTime = 1000000;
    return remainingTime;
};

export const getUserApiCall = async ({token}) => {
    try {
        let url = 'http://localhost:8080/api/user/me';
        return fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            if (response.ok) {
                return response.json().then(data => {
                    return data
                })
            } else {
                throw 'Fetching user failed!'
            }
        })
    } catch (error) {
        throw error;
    }
};

export const getAnotherUserApiCall = async ({token, email}) => {
    try {
        let url = `http://localhost:8080/api/user/${email}`;
        return fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            if (response.ok) {
                return response.json().then(data => {
                    return data
                })
            } else {
                throw 'Fetching user failed!'
            }
        })
    } catch (error) {
        throw error;
    }
};

export const getAllUsersEmailsApiCall = async ({token}) => {
    try {
        let url = 'http://localhost:8080/api/user/all';
        return fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            if (response.ok) {
                return response.json().then(data => {
                    return data
                })
            } else {
                throw 'Fetching emails failed!'
            }
        })
    } catch (error) {
        throw error;
    }
};

export const updatePasswordApiCall = async ({token, email, currentPassword, newPassword}) => {
    try {
        const body = JSON.stringify({currentPassword, newPassword});
        let passwordUpdateUrl = `http://localhost:8080/api/user/updatePassword/${email}`;
        return fetch(passwordUpdateUrl, {
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
                throw 'Password update failed!'
            }
        })
    } catch (error) {
        throw error;
    }
};

export const updateUserApiCall = async ({token, email, name, phoneNumber, location}) => {
    try {
        const body = JSON.stringify({email, name, phoneNumber, location});
        let userUpdateUrl = `http://localhost:8080/api/user/${email}`;
        return fetch(userUpdateUrl, {
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
                throw 'User update failed!'
            }
        })
    } catch (error) {
        throw error;
    }
};

export const updateUserImageApiCall = async ({token, image, email}) => {
    try {
        const body = JSON.stringify({image});
        let userUpdateUrl = `http://localhost:8080/api/user/image/${email}`;
        return fetch(userUpdateUrl, {
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
                throw 'User image update failed!'
            }
        })
    } catch (error) {
        throw error;
    }
};

export const deleteUserImageApiCall = async ({token, email}) => {
    try {
        let userDeleteImageUrl = `http://localhost:8080/api/user/image/${email}`;
        return fetch(userDeleteImageUrl, {
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





