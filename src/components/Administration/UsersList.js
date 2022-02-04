import {List, Table} from "semantic-ui-react";
import {getAllUsersEmails, getUsersEmails, getUserToken,} from "../../store/auth";
import {useAppDispatch} from "../../root";
import {useSelector} from "react-redux";
import {useEffect} from "react";

const UsersList = () => {
    const dispatch = useAppDispatch();
    const token = useSelector(getUserToken);
    const usersEmails = useSelector(getUsersEmails);

    useEffect(() => {
        // const getAllUsersEmailsHandler = () => {
            dispatch(getAllUsersEmails({token}));
        // };
    }, []);

    return (
        <List selection divided verticalAlign='center'>
            <List.Header>users</List.Header>
            {usersEmails?.length > 0 && usersEmails.map((email) => (
            <List.Item>
                <List.Content>
                    <List.Header>{email}</List.Header>
                </List.Content>
            </List.Item>
                ))}
        </List>
    )
}

export default UsersList;