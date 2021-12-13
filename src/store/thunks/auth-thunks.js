import jwtDecode from "jwt-decode";
/*
export const getUserFromApi = async () => {
    // setIsLoading(true);
    let url;
    let init;

    if (isLogin) {
        const enteredEmail = emailInput.current.value;
        const enteredPassword = passwordInput.current.value;
        url =
            'http://localhost:8080/api/user/login';
        init = {
            email: enteredEmail,
            password: enteredPassword
        }
    } else {
        const enteredEmail = emailInput.current.value;
        const enteredPassword = passwordInput.current.value;
        const enteredName = nameInput.current.value;
        const enteredLocation = locationInput.current.value;
        const enteredPhone = phoneInput.current.value;
        const enteredImage = imageInput.current.value;
        url =
            'http://localhost:8080/api/user/register';
        init = {
            email: enteredEmail,
            currentPassword: enteredPassword,
            newPassword: enteredPassword,
            name: enteredName,
            location: enteredLocation,
            phoneNumber: enteredPhone,
            image: enteredImage
        }
    }


    fetch(url, {
        method: 'POST',
        body: JSON.stringify(init),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => {
            setIsLoading(false);
            if (response.ok) {
                return response.json().then(data => {
                    const {exp} = jwtDecode(data.token);
                    authContext.login(data.token, exp);
                    history.replace('/');
                })
            } else {
                return response.json().then((data) => {
                    let errorMessage = 'Authentication failed!';
                    if (data.status === 500) {
                        console.log(data.message)
                        alert(data.message)
                        throw new Error(data.message);
                    }
                });
            }
        })
        .catch((err) => {
            alert(err.message);
        });
    return {token: 'ey.token'};
};*/
const loginUrl = 'http://localhost:8080/api/user/login'

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
                        email: data.email
                    }
                })
            } else {
                throw 'Authentication failed!'
                /* return response.json().then((data) => {
                     let errorMessage = 'Authentication failed!';
                     if (data.status === 500) {
                         console.log(data.message)
                         alert(data.message)
                         throw new Error(data.message);
                     }
                 });*/
            }
        })
    } catch (err) {
        throw err;
    }
}
export const getExpirationTimeFromToken = (token) => {
    // Logika z expiration time
    return 10;
};

export const getRemainingTimeFromToken = (token) => {
    // Logika z remaining time
    return 10000;
};

export const getUserFromToken = (token) => {
    // ew. wyciagniecie imie, nazwisko z tokena
    return {name: 'Kapi Buczak'};
};