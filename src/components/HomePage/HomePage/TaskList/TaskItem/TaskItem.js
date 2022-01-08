import {Button, Card, Grid, Header, Icon, Image, Segment} from "semantic-ui-react";
import taskIcon from '../../../../../files/task.png';
import classes from "../TaskItem/TaskItem.module.css";
import {formatDate} from "../../../../../utils/functions";
import {useHistory} from "react-router-dom";
import {setCurrentTaskId} from "../../../../../store/task";
import {useAppDispatch} from "../../../../../root";
import {useTranslation} from "react-i18next";


const TaskItem = ({props, onClick, isUserTasks}) => {
    const {t} = useTranslation();

    const history = useHistory();
    const dispatch = useAppDispatch()

    const taskDetailsHandler = () => {
        dispatch(setCurrentTaskId(props.id));
        history.push({
            pathname: `/taskDetails/${props.id}`, state: {isUserTasks: isUserTasks}
        });
    }

    const onClickHandler = () => onClick(props.id)


    return (<Card fluid centered className={classes.taskCard} onClick={onClickHandler}>
        <Card.Content>
            <Grid stackable>
                <Grid.Row className={classes.taskRow}>
                    <Grid.Column computer={5} widescreen={4} tablet={5}>
                        {props.image != null ?
                            <Image floated='left' className={classes.image} src={props.image} rounded
                                   size='large'/>
                            : <Image src={taskIcon} rounded size='large'/>}


                        {/*<div className={classes.status__chip}>{props.status}</div>*/}
                    </Grid.Column>
                    <Grid.Column width={12} computer={11} tablet={11}>
                        <Grid.Row className={classes.category__container}>
                            <Grid.Column width={5}>
                                <span className={classes.category__chip}>{props.category}</span>

                            </Grid.Column>
                            <Grid.Column width={11} floated='right'>
                                <Button className={classes.userButton} floated='right' fluid onClick={taskDetailsHandler} size='small'>
                                    <Button.Content>{t("taskDetails")}</Button.Content>
                                </Button>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Row>
                                <Header as='h3' content={props.title}/>
                            </Grid.Row>
                        </Grid.Row>
                        <div className={classes.taskDetails__container}>
                            <Grid.Column className={classes.taskDetails__column}>
                                <div className={classes.taskDetails__main__info}><Icon
                                    name='location arrow'/>{props.address}
                                </div>
                                <div className={classes.taskDetails__main__info}><Icon
                                    name='calendar times'/>{formatDate(props.expirationDate)}</div>

                            </Grid.Column>
                            <Grid.Column width={7}>
                                <div className={classes.taskDetails__payment__details}><Icon
                                    name='money'/> {props.pay} PLN
                                </div>
                                <div className={classes.taskDetails__payment__details}><Icon
                                    name='time'/> {props.estimatedTime} h
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