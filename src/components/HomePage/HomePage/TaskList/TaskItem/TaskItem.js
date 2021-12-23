import {Button, Card, Grid, Header, Icon, Image} from "semantic-ui-react";
import profile from '../../../../../files/profile.jpg';
import classes from "../TaskItem/TaskItem.module.css";
import {formatDate} from "../../../../../utils/functions";
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import {getTaskId, setCurrentTaskId} from "../../../../../store/task";
import {useAppDispatch} from "../../../../../root";


const TaskItem = ({props}) => {
    const history = useHistory();
    const dispatch = useAppDispatch()

    const taskDetailsHandler = () => {
        dispatch(setCurrentTaskId(props.id))
        history.replace(`/taskDetails/${props.id}`);
    }

    return (
        <Card fluid centered className={classes.taskCard}>
            <Card.Content>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={5}>
                            {props.image != null
                                ? <Image src={props.image} rounded size='medium'/>
                                : <Image src={profile} rounded size='medium'/>
                            }
                        </Grid.Column>
                        <Grid.Column width={11}>
                            <Grid.Row className={classes.category__container}>
                                <span className={classes.category__chip}>{props.category}</span>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Row>
                                    <Header as='h2' className={classes.title__break__word} content={props.title}/>
                                </Grid.Row>

                            </Grid.Row>

                            <div className={classes.taskDetails__container}>
                                <Grid.Column width={3}>
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
                    <Grid.Row>
                        <Grid.Column width={10}>
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <Button animated='vertical' floated='right' fluid onClick={taskDetailsHandler}>
                                <Button.Content>Zobacz szczegóły</Button.Content>
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Card.Content>
        </Card>
    );
};

export default TaskItem;