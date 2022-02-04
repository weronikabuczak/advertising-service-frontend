import {Button, Grid} from "semantic-ui-react";
import {useTranslation} from "react-i18next";
import ChangePassword from "../Profile/UserTasks/UserProfileModals/ChangePassword";
import UsersList from "./UsersList";

const AdminPanel = () => {
    const {t} = useTranslation();

    //dashboard?

    //users

    return (
        <section>

            <Grid centered>
                <Grid.Row>
                    <Grid.Column width={12}>
                        <Button.Group>
                            <Button>{t("users")}</Button>
                            <Button>{t("tasks")}</Button>
                        </Button.Group>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={5}>
                        <UsersList/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </section>
    )
    //tasks


}

export default AdminPanel;