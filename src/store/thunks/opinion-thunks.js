export const createOpinionApiCall = async ({token, offerId, rating, content}) => {
    const opinionUrl = `http://localhost:8080/api/opinion?offerId=${offerId}`;
    try {
        const body = JSON.stringify({rating, content});
        return fetch(opinionUrl, {
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
            } else {
                throw 'Cannot create opinion'
            }
        })
    } catch (err) {
        throw err;
    }
};
