import {Card, Icon, Image} from "semantic-ui-react";
import taskIcon from "../../../../../../files/task.png";
import React from "react";
import classes from "./TaskDetailsCard.module.css";
import {useTranslation} from "react-i18next";

export const TaskCreatedBy = ({task, avatar}) => {
    const {t} = useTranslation();

    return(
        <Card fluid className={classes.task__card}>
            <Card.Content>
                {avatar != null
                    ? <Image src={avatar} rounded size='tiny' floated='right'/>
                    : <Image src={taskIcon} rounded size='tiny' floated='right'/>
                }
                <Card.Header className={classes.card__header}>{t("createdBy")}</Card.Header>
                <Card.Content className={classes.card__username}>{task.user.name}</Card.Content>
                <Card.Content className={classes.card__content}><Icon name='home'/>{task.user.location}</Card.Content>
                <Card.Content className={classes.card__content}><Icon name='phone'/>{task.user.phoneNumber}</Card.Content>
                <Card.Content className={classes.card__content}><Icon name='mail'/>{task.user.email}</Card.Content>
            </Card.Content>
        </Card>
    )
}
