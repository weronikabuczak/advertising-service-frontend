import classes from "./TaskAdded.module.css";
import {Button, Divider, Grid, Header, Icon, Segment} from "semantic-ui-react";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";

const TaskAdded = () => {
    const history = useHistory();
    const {t} = useTranslation();

    const newTaskHandler = () => {
        history.replace('/newTask')
    }

    const tasksHandler = () => {
        history.replace('/')
    }

return (
    <section className={classes.section}>
        <Header>{t("adWasAddedSuccessfully")}</Header>
        <Segment placeholder >
            <Grid columns={2} textAlign='center' className={classes.choice__segment}>
                <Divider vertical> {t("or")}</Divider>
                <Grid.Row verticalAlign='middle'>
                    <Grid.Column>
                        <Header icon>
                            <Icon name='add' />
                            {t("newAd?")}
                        </Header>
                            <Button primary onClick={newTaskHandler}>{t("add")}</Button>
                    </Grid.Column>

                    <Grid.Column>
                        <Header icon>
                            <Icon name='search' />
                            {t("browseAdverts")}
                        </Header>
                            <Button secondary onClick={tasksHandler}>{t("home")}</Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    </section>
)
}

export default TaskAdded;