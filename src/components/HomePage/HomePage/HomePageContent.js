import classes from './HomePageContent.module.css';
import AuthorizationForm from "../Authorization/AuthorizationForm";
import {Container} from "semantic-ui-react";
import TaskList from "./TaskList/TaskList";

const HomePageContent = () => {
    return (
        <section className={classes.starting}>
            <Container>
                <TaskList/>
            </Container>
        </section>
    );
};

export default HomePageContent;