import {Button, Card, Grid, Header, Icon, Image, Segment} from "semantic-ui-react";
import taskIcon from '../../../../../files/task.png';
import classes from "../TaskItem/TaskItem.module.css";
import {formatDate, getCategoryColorClass, getCategoryLabel} from "../../../../../utils/functions";
import {useHistory} from "react-router-dom";
import {setCurrentTaskId} from "../../../../../store/task";
import {useAppDispatch} from "../../../../../root";
import {useTranslation} from "react-i18next";
import i18n from "../../../../../i18n";


const TaskItem = ({task, onClick, isUserTasks}) => {
    const {t} = useTranslation();
    const {language: currentLanguage} = i18n

    const history = useHistory();
    const dispatch = useAppDispatch()

    const taskDetailsHandler = () => {
        dispatch(setCurrentTaskId(task.id));
        history.push({
            pathname: `/taskDetails/${task.id}`, state: {isUserTasks: isUserTasks}
        });
    }

    const onClickHandler = () => onClick(task.id)

    const taskCategory = getCategoryLabel(task.category, currentLanguage);

    const categoryColor = {
        'background-color': getCategoryColorClass(task.category)
    };

    return (<Card fluid centered className={classes.taskCard} onClick={onClickHandler}>
        <Card.Content>
            <Grid stackable>
                <Grid.Row className={classes.taskRow}>
                    <Grid.Column computer={5} widescreen={4} tablet={5}>
                        {task.image != null ?
                            <Image floated='left' className={classes.image} src={task.image} rounded
                                   size='large'/>
                            : <Image src={taskIcon} rounded size='large'/>}
                    </Grid.Column>
                    <Grid.Column width={12} computer={11} tablet={11}>
                        <Grid.Row className={classes.category__container}>
                            <Grid.Column width={5}>
                                <span style={categoryColor} className={classes.category__chip}>{taskCategory}</span>
                            </Grid.Column>
                            <Grid.Column width={11} floated='right'>
                                <Button className={classes.userButton} floated='right' fluid
                                        onClick={taskDetailsHandler} size='small'>
                                    <Button.Content>{t("taskDetails")}</Button.Content>
                                </Button>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Row>
                                <Header as='h3' content={task.title}/>
                            </Grid.Row>
                        </Grid.Row>
                        <div className={classes.taskDetails__container}>
                            <Grid.Column className={classes.taskDetails__column}>
                                <div className={classes.taskDetails__main__info}><Icon
                                    name='location arrow'/>{task.address}
                                </div>
                                <div className={classes.taskDetails__main__info}><Icon
                                    name='calendar times'/>{formatDate(task.expirationDate)}</div>

                            </Grid.Column>
                            <Grid.Column width={7}>
                                <div className={classes.taskDetails__payment__details}><Icon
                                    name='money'/> {task.pay} PLN
                                </div>
                                <div className={classes.taskDetails__payment__details}><Icon
                                    name='time'/> {task.estimatedTime} h
                                </div>
                            </Grid.Column>
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Card.Content>
    </Card>);
};

export default TaskItem;