import {Button, Card, Container, Grid, Header, Icon, Image, Table} from "semantic-ui-react";
import profile from "../../../../../../files/profile.jpg";
import classes from './TaskDetails.module.css';

const TaskDetails = () => {
    return (
        <Container className={classes.task__container}>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={10}>
                        <Image src={profile} rounded size='large'/>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Card>
                        <Card.Header>Title</Card.Header>
                        <Card.Meta>Meta</Card.Meta>
                        <Card.Content>kljsdfjkdjkfkjfsdjkfdk jfds kjfsjkdjk dsfjkfdsjkfdskjjk fdjkfdskjfsd kjfnjsfdnv jcncvnxcnjkjc xvkjkxvcjkcv</Card.Content>
                           </Card>
                    </Grid.Column>
                </Grid.Row>
                {/*<Grid.Row>*/}
                {/*    <Grid.Column width={10}>*/}
                {/*    </Grid.Column>*/}
                {/*    <Grid.Column width={6}>*/}
                {/*        <Button animated='vertical' floated='right' fluid>*/}
                {/*            <Button.Content>Zobacz szczegóły</Button.Content>*/}
                {/*        </Button>*/}
                {/*    </Grid.Column>*/}
                {/*</Grid.Row>*/}
            </Grid>
        </Container>
    )
}

export default TaskDetails;