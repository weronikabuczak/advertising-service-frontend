import {Grid} from "semantic-ui-react";
import UsersList from "./users/UsersList";
import TasksList from "./tasks/TasksList";

const AdminPanel = () => {
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