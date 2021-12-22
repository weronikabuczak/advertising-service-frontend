import { Card, Container, Divider, Grid, Header, Icon, Image, Table} from "semantic-ui-react";
import profile from "../../../../../../files/profile.jpg";
import classes from './TaskDetails.module.css';
import LocationPicker from "react-leaflet-location-picker";

const TaskDetails = () => {
    return (
        <Container className={classes.task__container}>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={10}>
                        <Image src={profile} rounded size='large'/>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Card fluid>
                            <Card.Content className={classes.category__container}>
                                <span className={classes.category__chip}>props.category</span></Card.Content>
                            <Card.Content><Header as='h2'>Tytuł ogłoszenia</Header></Card.Content>
                            <Table>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Header as='h4'>
                                                <Header.Content>Adres</Header.Content>
                                            </Header>
                                        </Table.Cell>
                                        <Table.Cell>Rajska, Bytom</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Header as='h4'>
                                                <Header.Content>Zapłata</Header.Content>
                                            </Header>
                                        </Table.Cell>
                                        <Table.Cell>300 zł</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Header as='h4'>
                                                <Header.Content>Przewidywany czas wykonania</Header.Content>
                                            </Header>
                                        </Table.Cell>
                                        <Table.Cell>5 h</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Header as='h4'>
                                                <Header.Content>Data wygaśnięcia</Header.Content>
                                            </Header>
                                        </Table.Cell>
                                        <Table.Cell>20.10.2021</Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        </Card>
                        <Card fluid>
                           <Card.Content><Header as='h2'>Wystawione przez</Header>
                               <Grid.Row>
                               <Grid.Column width={8}>
                                   <Image src={profile} rounded size='tiny'/>
                               </Grid.Column>
                               <Grid.Column width={8}>
                                   <p>hfghjktgtyhuj</p>
                               </Grid.Column>
                               </Grid.Row>
                           </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
                <Divider className={classes.taskDetails__divider}/>
                <Grid.Row>
                    <Container textAlign='justified'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                        commodo ligula eget
                        dolor. Aenean massa strong. Cum sociis natoque penatibus et magnis dis parturient montes,
                        nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
                        Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
                        arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu
                        pede link mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean
                        vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.
                        Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut
                        metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue.
                        Curabitur ullamcorper ultricies nisi.</Container>
                </Grid.Row>
                <Grid.Row>
                    MAP <div className={classes.control}>
                    <LocationPicker/>
                </div>
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