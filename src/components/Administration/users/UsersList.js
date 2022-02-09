import {List, Message} from "semantic-ui-react";
import {getAllUsersEmails, getUsersEmails, getUserToken, setCurrentUserEmail,} from "../../../store/auth";
import {useAppDispatch} from "../../../root";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";

const UsersList = () => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const token = useSelector(getUserToken);
    const usersEmails = useSelector(getUsersEmails);
    const history = useHistory();
    useEffect(() => {
        if (token) {
            dispatch(getAllUsersEmails({token}));
        }
    }, []);


    return (
        <List selection divided verticalAlign='center'>
            <List.Header as='h2'>{t("usersList")}</List.Header>
            {usersEmails?.length === 0 &&
                <Message>{t("noUsers")}</Message>}
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