import {sample} from "lodash";

const Data = [
    {
        host_id: 1,
        name: 'An Cu Home',
        address: 'So 10 duong 494',
        nb_room: 30,
        createdAt: '',
        updatedAt: '',
        hosts: {
            user_id: 'sonle123456',
            full_name: 'Do Linh'
        },
        cover: `/static/mock-images/doms/dom_1.jpeg`,
        status: sample(['sale', 'new', '', '']),
    },
    {
        host_id: 2,
        name: 'Vinhomes',
        address: 'So 10 duong 494',
        nb_room: 10,
        createdAt: '',
        updatedAt: '',
        hosts: {
            user_id: 'sonle123456',
            full_name: 'Son Le'
        },
        cover: `/static/mock-images/doms/dom_2.jpeg`,
        status: sample(['sale', 'new', '', '']),
    },
    {
        host_id: 3,
        name: 'Central Park',
        address: 'So 10 duong 494',
        nb_room: 5,
        createdAt: '',
        updatedAt: '',
        hosts: {
            user_id: 'sonle123456',
            full_name: 'Giang Do'
        },
        cover: `/static/mock-images/doms/dom_3.jpeg`,
        status: sample(['sale', 'new', '', ''])
    }
];

export default Data;