import classes from "../TaskList/TaskItem/TaskItem.module.css";
import {Button, Card, Grid, Header, Icon, Image, Message, Segment} from "semantic-ui-react";
import taskIcon from "../../../../files/task.png";
import {formatDate} from "../../../../utils/functions";



const AnotherUserCompletedTasks = ({task}) => {
    return (
        <Card fluid>
            <Card.Content header={task.title}/>
            <Card.Content><strong>Kategoria: </strong> {task.category}</Card.Content>
            <Card.Content><Icon name='location arrow'/><strong>Adres: </strong>{task.address}</Card.Content>
            <Card.Content><Icon name='money'/><strong>Zapłata: </strong>{task.pay}</Card.Content>

            {task.opinion &&
                <Card.Content>
                    <Card.Header>Opinia:</Card.Header>
                    <Card.Content>
                        <Icon name='star'/>{task.opinion.rating}
                    </Card.Content>
                    {task.opinion.content &&
                        <Segment>
                            <strong>Opis: </strong>{task.opinion.content}
                        </Segment>
                    }
                </Card.Content>
            }
        </Card>

    );

}

export default AnotherUserCompletedTasks;