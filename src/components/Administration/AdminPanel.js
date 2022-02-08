import {Grid} from "semantic-ui-react";
import {useTranslation} from "react-i18next";
import UsersList from "./UsersList";
import TasksList from "./TasksList";

const AdminPanel = () => {
    const {t} = useTranslation();

    return (
        <section>
            <Grid centered>
                <Grid.Row>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={5}>
                        <UsersList/>
                    </Grid.Column>
                    <Grid.Column computer={5}>
                        <TasksList/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </section>
    )
}

export default AdminPanel;