const userUrl = 'https://jsonplaceholder.typicode.com/users'

export const checkResponseStatus = () => {
    return fetch(userUrl)
        .then((response) => {
            const obj = {
                "status": response.status,
                "ok": response.ok,
                "url": response.url
            }
            return obj;
        });
};

export const getUsers = () => {
    return fetch(userUrl)
        .then((response) => {
            return response.json();
        });
};

export const getUserPosts = (userId, maxNumPosts) => {
    if (!maxNumPosts) maxNumPosts = 3;
    return fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
        .then((response) => {
            return response.json();
        })
        .then((responseData) => {
            const arr = [];
            for (let i = 0; i < maxNumPosts; i++) {arr.push(responseData[i])};
            return arr;
        })
};

export const createNewUser = (newUserData) => {
    const postOption = {
        method: "POST",                
        body: JSON.stringify(newUserData),       
        headers: {
            "Content-Type": "application/json"
        }  
    }

    return fetch(userUrl, postOption)
        .then((response) => {
            return response.json();
        })
        .then((responseData) => {
            return responseData;
        })
}