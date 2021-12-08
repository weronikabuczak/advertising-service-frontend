import {Button, Card, Container, Image} from "semantic-ui-react";
import profile from '../../../../../files/profile.jpg'

const TaskItem = ({props}) => {
    return (
        <section>
            <Card fluid centered>
                <Card.Content>
                    <Image floated='left' size='small' src={profile} rounded spaced='left'/>
                    <div>Utworzone przez: {props.user.email}</div>
                    <Card.Header>{props.title}</Card.Header>
                    <Container text fluid textAlign='justified'>{props.content}
                    </Container>
                </Card.Content>
                <Card.Content>
                    <div>
                        <Button>
                            Zobacz szczegóły
                        </Button>
                    </div>
                </Card.Content>
            </Card>
        </section>
    );
};

export default TaskItem;