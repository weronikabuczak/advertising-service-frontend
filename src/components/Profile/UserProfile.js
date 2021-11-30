import classes from './UserProfile.module.css';
import {Button, Card, Feed, Grid, Header, Icon, Image, Table} from "semantic-ui-react";
import profile from '../../files/profile.jpg'

const UserProfile = () => {
    return (
        <section className={classes.profile}>
            <Card fluid>
                <Card.Content>
                    <Card.Header>
                        <Header as='h5' icon textAlign='center'>
                            <Icon name='users'/>
                            Moje konto
                        </Header>
                    </Card.Header>
                </Card.Content>
                <Card.Content>
                    <Grid width={14}>
                        <Grid.Column width={4}>
                            <Image src={profile} rounded size='medium'/>
                        </Grid.Column>
                        <Grid.Column width={12}>
                            <Header as='h1'>Weronika Kurczyna
                                <Button floated='right'>
                                    <Button.Content>Edytuj dane</Button.Content>
                                </Button>
                                <Button floated='right'>
                                    <Button.Content>Zmień hasło</Button.Content>
                                </Button></Header>

                            <Header as='h2'>Bytom</Header>
                            <Table>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Header as='h4' image>
                                                <Header.Content>E-mail</Header.Content>
                                            </Header>
                                        </Table.Cell>
                                        <Table.Cell>weronika@gmail.com</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Header as='h4' image>
                                                <Header.Content>Telefon</Header.Content>
                                            </Header>
                                        </Table.Cell>
                                        <Table.Cell>77766444</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Header as='h4' image>
                                                <Header.Content>Data utworzenia konta</Header.Content>
                                            </Header>
                                        </Table.Cell>
                                        <Table.Cell>23.10.2021</Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        </Grid.Column>

                    </Grid>

                    {/*<Feed>*/}
                    {/*    <Feed.Event>*/}
                    {/*        <Feed.Label image='/images/avatar/small/jenny.jpg' />*/}
                    {/*        <Feed.Content>*/}
                    {/*            <Feed.Date content='1 day ago' />*/}
                    {/*            <Feed.Summary>*/}
                    {/*                You added <a>Jenny Hess</a> to your <a>coworker</a> group.*/}
                    {/*            </Feed.Summary>*/}
                    {/*        </Feed.Content>*/}
                    {/*    </Feed.Event>*/}

                    {/*    <Feed.Event>*/}
                    {/*        <Feed.Label image='/images/avatar/small/molly.png' />*/}
                    {/*        <Feed.Content>*/}
                    {/*            <Feed.Date content='3 days ago' />*/}
                    {/*            <Feed.Summary>*/}
                    {/*                You added <a>Molly Malone</a> as a friend.*/}
                    {/*            </Feed.Summary>*/}
                    {/*        </Feed.Content>*/}
                    {/*    </Feed.Event>*/}

                    {/*    <Feed.Event>*/}
                    {/*        <Feed.Label image='/images/avatar/small/elliot.jpg' />*/}
                    {/*        <Feed.Content>*/}
                    {/*            <Feed.Date content='4 days ago' />*/}
                    {/*            <Feed.Summary>*/}
                    {/*                You added <a>Elliot Baker</a> to your <a>musicians</a> group.*/}
                    {/*            </Feed.Summary>*/}
                    {/*        </Feed.Content>*/}
                    {/*    </Feed.Event>*/}
                    {/*</Feed>*/}
                </Card.Content>
            </Card>
        </section>
    );
};

export default UserProfile;