import {Button, Card, Grid, Header, Icon, Image, Message} from "semantic-ui-react";
import taskIcon from '../../../../files/task.png';
import classes from "./TaskItem.module.css";
import {getCategoryColorClass, getCategoryLabel} from "../../../../utils/functions";
import {useHistory} from "react-router-dom";
import {setCurrentTaskId} from "../../../../store/task";
import {useAppDispatch} from "../../../../root";
import {useTranslation} from "react-i18next";
import i18n from "../../../../i18n";
import {useEffect, useState} from "react";

const TaskItem = ({task, onClick, isUserTasks, currentTask}) => {
    const {t} = useTranslation();
    const {language: currentLanguage} = i18n;
    const history = useHistory();
    const dispatch = useAppDispatch();
    const [taskBackgroundColor, setTaskBackgroundColor] = useState({});

    const taskCategory = getCategoryLabel(task.category, currentLanguage);

    const categoryColor = {
        'backgroundColor': getCategoryColorClass(task.category)
    };

    useEffect(() => {
            let color;
            if (currentTask) {
                if (task.id === currentTask.id) {
                    color = {
                        'backgroundColor': '#eee',
                        'border': '2px solid grey'
                    }
                    setTaskBackgroundColor(color);
                } else {
                    color = {
                        'backgroundColor': '#fff'
                    }
                    setTaskBackgroundColor(color);
                }
            }
        },
        [task.id, isUserTasks, currentTask]);


    const taskDetailsHandler = () => {
        dispatch(setCurrentTaskId(task.id));
        history.push({
            pathname: `/taskDetails/${task.id}`, state: {isUserTasks: isUserTasks}
        });
    }

    const onClickHandler = () => onClick(task.id);

    return (
        <Card style={taskBackgroundColor} fluid centered className={classes.taskCard} onClick={onClickHandler}>
            <Card.Content>
                <Grid stackable>
                    <Grid.Row className={classes.taskRow}>
                        <Grid.Column computer={5} widescreen={4} tablet={5}>
                            {task.image != null ?
                                <Image floated='left' className={classes.image} src={task.image} rounded
                                       size='large'/>
                                : <Image src={taskIcon} rounded size='large'/>}
                            {(isUserTasks && task.hasOffer) &&
                                (
                                    <Message color='green' size='tiny'>
                                        <Message.Header>{t("newOffer")}</Message.Header>
                                    </Message>)}
                        </Grid.Column>
                        <Grid.Column computer={11} tablet={11}>
                            <Grid.Row className={classes.taskItem__firstRow}>
                                <Grid.Column width={5}>
                                    <Message size="tiny" style={categoryColor}
                                             className={classes.taskItem__category}>{taskCategory}</Message>
                                </Grid.Column>
                                <Grid.Column width={11} floated='right'>
                                    <Button floated='right' fluid
                                            onClick={taskDetailsHandler}>
                                        <Button.Content>{t("taskDetails")}</Button.Content>
                                    </Button>
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row>
                                <Grid.Row>
                                    <Header as='h3' content={task.title}/>
                                </Grid.Row>
                            </Grid.Row>
                            <div className={classes.taskItem__secondRow}>
                                <Grid.Column className={classes.taskItem__column}>
                                    <div className={classes.taskItem__details}><Icon
                                        name='location arrow'/>{task.address}
                                    </div>
                                    <div className={classes.taskItem__details}><Icon
                                        name='calendar times'/>{task.expirationDate}</div>

                                </Grid.Column>
                                <Grid.Column width={7}>
                                    <div className={classes.taskItem__paymentDetails}><Icon
                                        name='money'/> {task.pay} PLN
                                    </div>
                                    <div className={classes.taskItem__paymentDetails}><Icon
                                        name='time'/> {task.estimatedTime} h
                                    </div>
                                </Grid.Column>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Card.Content>
        </Card>
    );
};

export default TaskItem;