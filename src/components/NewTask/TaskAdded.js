import classes from "../NewTask/NewTaskForm.module.css";
import {Button, Divider, Grid, Header, Icon, Segment} from "semantic-ui-react";
import {useHistory} from "react-router-dom";

const TaskAdded = () => {

    const history = useHistory();

    const newTaskHandler = () => {
        history.replace('/newTask')
    }

    const tasksHandler = () => {
        history.replace('/')
    }

return (
    <section className={classes.section}>
        <Header>Pomyślnie dodano ogłoszenie.</Header>
        <Segment placeholder >
            <Grid columns={2} textAlign='center' className={classes.choiceSegment}>
                <Divider vertical>lub</Divider>
                <Grid.Row verticalAlign='middle'>
                    <Grid.Column>
                        <Header icon>
                            <Icon name='add' />
                            Nowe ogłoszenie?
                            <Button primary onClick={newTaskHandler}>Dodaj</Button>
                        </Header>
                    </Grid.Column>

                    <Grid.Column>
                        <Header icon>
                            <Icon name='search' />
                            Przeglądaj ogłoszenia
                            <Button primary onClick={tasksHandler}>Strona główna</Button>
                        </Header>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    </section>
)
}

export default TaskAdded;