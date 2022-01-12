import {Card, Icon, Segment} from "semantic-ui-react";
import {useTranslation} from "react-i18next";

const UserCompletedTasks = ({task}) => {
    const {t, i18n} = useTranslation();

    return (
        <Card fluid>
            <Card.Content header={task.title}/>
            <Card.Content><strong>{t("category")}: </strong> {task.category}</Card.Content>
            <Card.Content><Icon name='location arrow'/><strong>{t("address")}: </strong>{task.address}</Card.Content>
            <Card.Content><Icon name='money'/><strong>{t("pay")}: </strong>{task.pay}</Card.Content>

            {task.opinion &&
                <Card.Content>
                    <Card.Header>{t("opinion")}:</Card.Header>
                    <Card.Content>
                        <Icon name='star'/>{task.opinion.rating}
                    </Card.Content>
                    {task.opinion.content &&
                        <Segment>
                            <strong>{t("content")}: </strong>{task.opinion.content}
                        </Segment>
                    }
                </Card.Content>
            }
        </Card>
    );
}

export default UserCompletedTasks;