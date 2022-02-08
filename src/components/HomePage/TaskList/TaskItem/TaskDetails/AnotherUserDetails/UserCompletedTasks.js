import {Card, Divider, Icon, Segment} from "semantic-ui-react";
import {useTranslation} from "react-i18next";
import classes from "./UserCompletedTasks.module.css";

const UserCompletedTasks = ({task}) => {
    const {t} = useTranslation();

    return (
        <Card fluid className={classes.completedTasksItem}>
            <Card.Content header={task.title}/>
            <Card.Content>{task.content}</Card.Content>
            {/*<Card.Content>*/}
            {/*    <strong>{t("category")}: </strong> {task.category}*/}
            {/*</Card.Content>*/}
            {/*todo*/}
            <Card.Content>
                <strong>{t("address")}: </strong>{task.address}
            </Card.Content>
            <Card.Content>
                <strong>{t("pay")}: </strong>{task.pay}
            </Card.Content>
            <Divider fitted/>
            {task.opinion &&
                <Card.Content>
                    <h3 className={classes.opinion__content}>{t("opinion")}:</h3>
                    <Card.Content className={classes.opinion__content}>
                        <Icon name='star'/>{task.opinion.rating}
                    </Card.Content>
                    {task.opinion.content &&
                        <Card.Content className={classes.opinion__content}>
                            <strong>{t("content")}: </strong>{task.opinion.content}
                        </Card.Content>
                    }
                </Card.Content>
            }
        </Card>

    );
}

export default UserCompletedTasks;