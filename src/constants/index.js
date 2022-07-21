const serverAddress = `${process.env.REACT_APP_SERVER_NAME}`;

// api constant
module.exports = Object.freeze({
    users: `${serverAddress}/user/list?offset=0&limit=100`,
    getHosts: `${serverAddress}/user/host`,
    createUser: `${serverAddress}/user/create`,
    updateUser: `${serverAddress}/user/update`,

    getDoms: `${serverAddress}/dom/list`,
    getDom: `${serverAddress}/dom`,
    createDom: `${serverAddress}/dom/create`,
    updateDom: `${serverAddress}/dom/update`,

    getRooms: `${serverAddress}/room/list`,
    createRoom: `${serverAddress}/room/create`,
    getRoomByDomId: `${serverAddress}/dom/room/list`,
});
