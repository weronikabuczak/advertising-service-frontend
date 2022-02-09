import {Button, Card, Divider, Grid, Header, Icon, Image, Message, Table} from "semantic-ui-react";
import classes from "./TaskDetailsCard.module.css";
import taskIcon from "../../../../../../files/task.png";
import React from "react";
import {useTranslation} from "react-i18next";

const TaskDetailsCard = ({isUserTasks, deleteTaskHandler, editTaskHandler, categoryColor, statusColor, taskCategory,
                                taskStatus, task, updateTaskImageHandler, deleteTaskImageHandler}) => {
    const {t} = useTranslation();

    return (
        <div>
            {isUserTasks &&
                <Button negative animated onClick={deleteTaskHandler} className={classes.task__buttons}>
                    <Button.Content visible>{t("delete")}</Button.Content>
                    <Button.Content hidden>
                        <Icon size='large' name='delete'/>
                    </Button.Content>
                </Button>
            }
            {isUserTasks && task.status === 'AWAITING' &&
                <Button animated onClick={editTaskHandler} className={classes.task__buttons}>
                    <Button.Content visible>{t("edit")}</Button.Content>
                    <Button.Content hidden>
                        <Icon size='large' name='edit'/>
                    </Button.Content>
                </Button>
            }


            <Card fluid>
                <Card.Content className={classes.category__container}>
                    <Message style={categoryColor} className={classes.category__chip}>{taskCategory}</Message>
                    <Message style={statusColor} className={classes.status__chip}>{taskStatus}</Message>
                </Card.Content>

                <Card.Content>
                    <Grid>
                        <Grid.Column width={10}>
                            <Header as='h2'>{task.title}</Header>
                        </Grid.Column>
                        <Grid.Column width={6}>
                            {task.image ?
                                (<div><Image src={task.image} rounded floated='right' size='medium'/>
                                    <Divider fitted/>
                                    <Button size='mini' onClick={updateTaskImageHandler} className={classes.taskImage__button}>{t("changeImage")}</Button>
                                    <Button size='mini' onClick={deleteTaskImageHandler} className={classes.taskImage__button}>{t("deleteImage")}</Button></div>)
                                : (<div><Image src={taskIcon} rounded floated='right' size='medium'/>
                                    <Divider fitted/>
                                    <Button size='mini' onClick={updateTaskImageHandler} className={classes.taskImage__button}>{t("addImage")}</Button>
                                </div>)
                            }
                        </Grid.Column>
                    </Grid>
                </Card.Content>

                <Table>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>
                                <Header as='h4'>
                                    <Header.Content>{t("address")}</Header.Content>
                                </Header>
                            </Table.Cell>
                            <Table.Cell>{task.address}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>
                                <Header as='h4'>
                                    <Header.Content>{t("pay")}</Header.Content>
                                </Header>
                            </Table.Cell>
                            <Table.Cell>{task.pay} zł</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>
                                <Header as='h4'>
                                    <Header.Content>{t("estimatedTime")}</Header.Content>
                                </Header>
                            </Table.Cell>
                            <Table.Cell>{task.estimatedTime} h</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>
                                <Header as='h4'>
                                    <Header.Content>{t("expDate")}</Header.Content>
                                </Header>
                            </Table.Cell>
                            <Table.Cell>{task.expirationDate}</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </Card>
        </div>
    )
}

export default TaskDetailsCard;
        