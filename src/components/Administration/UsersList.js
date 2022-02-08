import {List, Message, Table} from "semantic-ui-react";
import {getAllUsersEmails, getUsersEmails, getUserToken, setCurrentUserEmail,} from "../../store/auth";
import {useAppDispatch} from "../../root";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {setCurrentTaskId} from "../../store/task";
import {useHistory} from "react-router-dom";

const UsersList = () => {
    const dispatch = useAppDispatch();
    const token = useSelector(getUserToken);
    const usersEmails = useSelector(getUsersEmails);
    const history = useHistory();
    useEffect(() => {
        // const getAllUsersEmailsHandler = () => {
        dispatch(getAllUsersEmails({token}));
        // };
    }, []);


    return (
        <List selection divided verticalAlign='center'>
            <List.Header as='h2'>users</List.Header>
            {usersEmails?.length === 0 &&
                <Message>Brak użytkowników</Message>}
            {usersEmails?.length > 0 && usersEmails.map((email) => (
                <List.Item content={email} onClick={() => {
                    dispatch(setCurrentUserEmail(email));
                    history.push({
                        pathname: `/user/${email}`
                    });
                }}>{email}</List.Item>
            ))}
        </List>
    )
}

    export default UsersList;