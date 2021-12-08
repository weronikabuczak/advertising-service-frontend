import {Button, Card, Grid, Header, Icon, Image} from "semantic-ui-react";
import profile from '../../../../../files/profile.jpg';
import classes from "../TaskItem/TaskItem.module.css";


const TaskItem = ({props}) => {
    return (
        <Card fluid centered className={classes.taskCard}>
            <Card.Content>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={4}>
                            <Image src={profile} rounded size='medium'/>
                        </Grid.Column>
                        <Grid.Column width={12}>
                            <Grid.Row>
                                <Grid.Row>
                                    <Header as='h3' className={classes.title__break__word} content={props.title}/>
                                </Grid.Row>
                                <Grid.Row className={classes.category__container}>
                                    <span className={classes.category__chip}>{props.category}</span>
                                </Grid.Row>
                            </Grid.Row>

                            <div className={classes.taskDetails__container}>
                                <Grid.Column width={3}>
                                    <div className={classes.taskDetails__main__info}><Icon
                                        name='location arrow'/> {props.address}
                                    </div>
                                    <div className={classes.taskDetails__main__info}><Icon
                                        name='calendar times'/> {props.expirationDate}</div>
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
                            <Button animated='vertical' floated='right' fluid>
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