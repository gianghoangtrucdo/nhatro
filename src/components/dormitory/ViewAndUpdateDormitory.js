import {useParams} from "react-router-dom";

const ViewAndUpdateDormitory = () => {
    const {id} = useParams();

    return (
        <h1>Hello world {id}</h1>
    )
};

export default ViewAndUpdateDormitory;