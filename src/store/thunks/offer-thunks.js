export const createOfferApiCall = async ({token, taskId}) => {
    const url = `http://localhost:8080/api/offer?taskId=${taskId}`;
    try {
        const body = JSON.stringify({token, taskId});
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
                        status: data.status
                    }
                })
            }
        })
    } catch (err) {
        throw err;
    }
};

export const getOffersApiCall = async ({token, taskId, offerStatus}) => {
    try {
        const url = `http://localhost:8080/api/offer?taskId=${taskId}&offerStatus=${offerStatus}`;
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
            }
        })
    } catch (error) {
        throw error;
    }
};

export const updateOfferApiCall = async ({token, offerId, offerStatus}) => {
    const url = `http://localhost:8080/api/offer?id=${offerId}&offerStatus=${offerStatus}`;
    try {
        const body = JSON.stringify({offerId, offerStatus});
        return fetch(url, {
            method: 'PUT',
            body: body,
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if (response.ok) {
                return response.json().then(data => {
                    return {
                        ...data
                    }
                })
            }
        })
    } catch (err) {
        throw err;
    }
};
