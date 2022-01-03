import {Button, Card, Container, Divider, Grid, Header, Icon, Image, Table} from "semantic-ui-react";
import taskIcon from "../../../../../../files/task.png";
import classes from './TaskDetails.module.css';
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import {useSelector} from "react-redux";
import {getCurrentTask, getTasks} from "../../../../../../store/task";
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import React, {useEffect, useState} from "react";
import DeleteTask from "./DeleteTask";
import EditTask from "./EditTask";
import {getUserToken} from "../../../../../../store/auth";
import {useAppDispatch} from "../../../../../../root";
import {createOffer} from "../../../../../../store/offer";
import {useLocation} from "react-router-dom";

const TaskDetails = () => {
    const task = useSelector(getCurrentTask);

    //const offer = useSelector(getAllOffers);
    let avatar = null;
    const latitude = task.latitude;
    const longitude = task.longitude;
    const position = [latitude,longitude];
    const [modalOpenDelete, setModalOpenDelete] = useState(false);
    const [modalOpenEdit, setModalOpenEdit] = useState(false);
    const [isUserTasks, setIsUserTasks] = useState();

    const token = useSelector(getUserToken);
    const dispatch = useAppDispatch();
    const location = useLocation();

    useEffect(() => {
        setIsUserTasks(location.state.isUserTasks);
    }, [location]);


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
        let isUserTasks = location.state.isUserTasks;

        console.log(isUserTasks)
    }

    const editTaskHandler = () => {
        setModalOpenEdit(true);
        console.log(task.category)
    }

    const offerHandler = () => {
        if (token) {
            let taskId = task.id;
            dispatch(createOffer({token, taskId}));
        }
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
                    <Button negative animated  onClick={deleteTaskHandler}>
                        <Button.Content visible>Usuń</Button.Content>
                        <Button.Content hidden>
                            <Icon size='large' name='delete' />
                        </Button.Content>
                    </Button>
                    <Button animated  onClick={editTaskHandler}>
                        <Button.Content visible>Edytuj</Button.Content>
                        <Button.Content hidden>
                            <Icon size='large' name='edit' />
                        </Button.Content>
                    </Button>
                    <Button animated  onClick={offerHandler}>
                        <Button.Content visible>Zapytanie</Button.Content>
                        <Button.Content hidden>
                            <Icon size='large' name='chat' />
                        </Button.Content>
                    </Button>


                    <Card>
                        <Header>Nowa propozycja od
                            {/*{offer.task.user.name}*/}
                            {/*image*/}
                        </Header>
                        <Card.Content extra>
                            <div className='ui two buttons'>
                                <Button basic color='green'>
                                    {/*PUT offer, status=accepted*/}
                                    Zatwierdź
                                </Button>
                                <Button basic color='red'>
                                    {/*PUT offer, status=rejected*/}
                                    Odrzuć
                                </Button>
                            </div>
                        </Card.Content>
                    </Card>


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