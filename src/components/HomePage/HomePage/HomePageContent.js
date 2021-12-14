import classes from './HomePageContent.module.css';
import AuthorizationForm from "../Authorization/AuthorizationForm";
import {Container, Header} from "semantic-ui-react";
import TaskList from "./TaskList/TaskList";

const HomePageContent = () => {
    return (
        <section className={classes.section}>
            <Container>
                <h1>Ogłoszenia</h1>
                <TaskList isUserTasks={false}/>
            </Container>
        </section>
    );
};

export default HomePageContent;