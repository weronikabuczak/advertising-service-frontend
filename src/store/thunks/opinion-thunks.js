export const createOpinionApiCall = async ({token, offerId, rating, content}) => {
    const url = `http://localhost:8080/api/opinion?offerId=${offerId}`;
    try {
        const body = JSON.stringify({rating, content});
        return fetch(url, {
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
                        id: data.id,
                        rating: data.rating,
                        content: data.content
                    }
                })
            }
        })
    } catch (err) {
        throw err;
    }
};

export const getOpinionApiCall = async ({token, offerId}) => {
    const url = `http://localhost:8080/api/opinion/${offerId}`;
    try {
        return fetch(url, {
            method: 'GET',
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
            }
        })
    } catch (err) {
        throw err;
    }
};

export const deleteOpinionApiCall = async ({token, id}) => {
    try {
        const url = `http://localhost:8080/api/opinion/${id}`;
        return fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            if (response.ok) {
            return response.json().then(data => {
                return data
            })
        }})
    } catch (error) {
        throw error;
    }
};
