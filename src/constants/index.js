const serverAddress = `${process.env.REACT_APP_SERVER_NAME}`;

// api constant
module.exports = Object.freeze({
    users: `${serverAddress}/user/list?offset=0&limit=100`,
    getHosts: `${serverAddress}/user/host`,
    createUser: `${serverAddress}/user/create`,
    updateUser: `${serverAddress}/user/update`
});
