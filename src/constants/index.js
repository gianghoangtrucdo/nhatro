const serverAddress = `${process.env.REACT_APP_SERVER_NAME}`;

// api constant
module.exports = Object.freeze({
    users: `${serverAddress}/user/list?offset=0&limit=100`,
    getHosts: `${serverAddress}/user/host`,
    getStudents: `${serverAddress}/user/students`,
    createUser: `${serverAddress}/user/create`,
    updateUser: `${serverAddress}/user/update`,
    login: `${serverAddress}/user/login`,
    logout: `${serverAddress}/user/logout`,

    getDoms: `${serverAddress}/dom/list`,
    getDom: `${serverAddress}/dom`,
    createDom: `${serverAddress}/dom/create`,
    updateDom: `${serverAddress}/dom/update`,

    getRooms: `${serverAddress}/room/list`,
    createRoom: `${serverAddress}/room/create`,
    updateRoom: `${serverAddress}/room/update`,
    getRoomByDomId: `${serverAddress}/dom/room/list`,

    getContracts: `${serverAddress}/contract/list`,
    createContract: `${serverAddress}/contract/create`,
    updateContract: `${serverAddress}/contract/update`,
});
