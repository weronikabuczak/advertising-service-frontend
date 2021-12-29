import {Button, Card, Container, Divider, Grid, Header, Icon, Image, Table} from "semantic-ui-react";
import taskIcon from "../../../../../../files/task.png";
import classes from './TaskDetails.module.css';
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import {useSelector} from "react-redux";
import {getCurrentTask} from "../../../../../../store/task";
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import {useState} from "react";
import DeleteTask from "./DeleteTask";
import EditTask from "./EditTask";

const TaskDetails = () => {
    const task = useSelector(getCurrentTask);
    let avatar = null;
    const latitude = task.latitude;
    const longitude = task.longitude;
    const position = [latitude,longitude];
    const [modalOpenDelete, setModalOpenDelete] = useState(false);
    const [modalOpenEdit, setModalOpenEdit] = useState(false);

    if (task.user.image) {
        avatar = "data:image/jpeg;base64," + task.user.image;
    }

    //leaflet icon issue
    let DefaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow
    });
    L.Marker.prototype.options.icon = DefaultIcon;

    const deleteTaskHandler = () => {
        setModalOpenDelete(true);
    }

    const editTaskHandler = () => {
        setModalOpenEdit(true);
        console.log(task.category)
    }

    return (<Container className={classes.task__container}>
        <DeleteTask open={modalOpenDelete} setOpen={setModalOpenDelete} id={task.id}/>
        <EditTask open={modalOpenEdit} setOpen={setModalOpenEdit} id={task.id} task={task}/>
        <Grid>
            <Grid.Row>
                <Grid.Column width={10}>
                    <Image src={taskIcon} rounded size='large'/>
                </Grid.Column>
                <Grid.Column width={6}>
                    <Button onClick={deleteTaskHandler}>Usuń</Button>
                    <Button onClick={editTaskHandler}>Edytuj</Button>
                    <Card fluid>
                        <Card.Content className={classes.category__container}>
                            <span className={classes.category__chip}>{task.category}</span></Card.Content>
                        <Card.Content><Header as='h2'>{task.title}</Header></Card.Content>
                        <Table>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>
                                        <Header as='h4'>
                                            <Header.Content>Adres</Header.Content>
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell>{task.address}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Header as='h4'>
                                            <Header.Content>Zapłata</Header.Content>
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell>{task.pay} zł</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Header as='h4'>
                                            <Header.Content>Przewidywany czas wykonania</Header.Content>
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell>{task.estimatedTime} h</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Header as='h4'>
                                            <Header.Content>Data wygaśnięcia</Header.Content>
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell>{task.expirationDate}</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </Card>
                    <Card fluid>
                        <Card.Content>
                            {avatar != null
                                ? <Image src={avatar} rounded size='tiny' floated='right'/>
                                : <Image src={taskIcon} rounded size='tiny' floated='right'/>
                            }
                            <Card.Header>Osoba zlecająca</Card.Header>
                            <Card.Content>{task.user.name}</Card.Content>
                            <Card.Content><Icon name='home'/>{task.user.location}</Card.Content>
                            <Card.Content><Icon name='phone'/>{task.user.phoneNumber}</Card.Content>
                            <Card.Content><Icon name='mail'/>{task.user.email}</Card.Content>
                        </Card.Content>
                    </Card>
                </Grid.Column>
            </Grid.Row>
            <Divider className={classes.taskDetails__divider}/>
            <Grid.Row>
                <Container textAlign='justified'>
                    <Header>Szczegóły</Header>
                    {task.content}</Container>
            </Grid.Row>
            <Grid.Row>
                <MapContainer className={classes.taskMap__container} center={position} zoom={17}
                              scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position}>
                        <Popup>
                            Miejsce wykonania zlecenia
                        </Popup>
                    </Marker>
                </MapContainer>
            </Grid.Row>
        </Grid>
    </Container>)
}

export default TaskDetails;