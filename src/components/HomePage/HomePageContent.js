import classes from './HomePageContent.module.css';
import AuthorizationForm from "./Authorization/AuthorizationForm";

const HomePageContent = () => {
    return (
        <section className={classes.starting}>
            <AuthorizationForm/>
        </section>
    );
};

export default HomePageContent;