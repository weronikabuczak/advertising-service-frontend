export const createOfferApiCall = async ({token, taskId}) => {
    const offerUrl = `http://localhost:8080/api/offer?taskId=${taskId}`;
    try {
        const body = JSON.stringify({token, taskId});
        return fetch(offerUrl, {
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
            } else {
                throw 'Cannot create offer'
            }
        })
    } catch (err) {
        throw err;
    }
};

export const getOffersApiCall = async ({token, taskId, offerStatus}) => {
    try {
        const offerUrl = `http://localhost:8080/api/offer?taskId=${taskId}&offerStatus=${offerStatus}`;
        return fetch(offerUrl, {
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
                throw 'Fetching offers failed!'
            }
        })
    } catch (error) {
        throw error;
    }
};

export const updateOfferApiCall = async ({token, offerId, offerStatus}) => {
    const offerUrl = `http://localhost:8080/api/offer?id=${offerId}&offerStatus=${offerStatus}`;
    try {
        const body = JSON.stringify({offerId, offerStatus});
        return fetch(offerUrl, {
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
            } else {
                throw 'Cannot update offer';
            }
        })
    } catch (err) {
        throw err;
    }
};
