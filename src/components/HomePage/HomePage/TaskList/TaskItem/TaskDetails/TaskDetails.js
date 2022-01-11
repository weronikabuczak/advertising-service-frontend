import {Button, Card, Container, Divider, Grid, Header, Icon, Image, Message, Table} from "semantic-ui-react";
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
import {getUserEmail, getUserToken} from "../../../../../../store/auth";
import {useAppDispatch} from "../../../../../../root";
import {
    createOffer,
    getAllOffers,
    getOffers,
} from "../../../../../../store/offer";
import {useLocation} from "react-router-dom";
import OfferItem from "./Offer/OfferItem";
import {useTranslation} from "react-i18next";
import {
    getCategoryColorClass,
    getCategoryLabel,
    getStatusColorClass,
    getStatusLabel
} from "../../../../../../utils/functions";

const TaskDetails = () => {
    const {t, i18n} = useTranslation();
    const {language: currentLanguage} = i18n

    const task = useSelector(getCurrentTask);
    const currentUser = useSelector(getUserEmail);
    const offers = useSelector(getAllOffers);
    let avatar = null;
    let taskId = task.id;
    const latitude = task.latitude;
    const longitude = task.longitude;
    const position = [latitude, longitude];
    const [modalOpenDelete, setModalOpenDelete] = useState(false);
    const [modalOpenEdit, setModalOpenEdit] = useState(false);
    const [isUserTasks, setIsUserTasks] = useState(false);

    const token = useSelector(getUserToken);
    const dispatch = useAppDispatch();
    const location = useLocation();
    const [isCurrentUserTask, setIsCurrentUserTask] = useState(false);
    const [offerSent, setOfferSent] = useState(false);

    useEffect(() => {
            setIsCurrentUserTask(currentUser === task.user.email)
            if (location.state.isUserTasks !== null) {
                setIsUserTasks(location.state.isUserTasks === true);
            }
            if (token && task.status === 'AWAITING') {
                dispatch(getOffers({token, taskId, offerStatus: 'ACTIVE'}));
            }
            if (token && task.status === 'IN_PROGRESS') {
                dispatch(getOffers({token, taskId, offerStatus: 'ACCEPTED'}));
            }
            if (token && task.status === 'DONE') {
                dispatch(getOffers({token, taskId, offerStatus: 'COMPLETED'}));
            }

        },
        [location.state.isUserTasks, dispatch, taskId, token, task, offerSent, isCurrentUserTask, currentUser, modalOpenDelete, modalOpenEdit]);
    // []);

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

    }

    const editTaskHandler = () => {
        setModalOpenEdit(true);
    }

    const offerHandler = () => {
        if (token) {
            dispatch(createOffer({token, taskId}));
        }
        setOfferSent(true);
    }


    const taskStatus = getStatusLabel(task.status, currentLanguage);

    const statusColor = {
        'background-color': getStatusColorClass(task.status)
    };

    const taskCategory = getCategoryLabel(task.category, currentLanguage);

    const categoryColor = {
        'background-color': getCategoryColorClass(task.category)
    };

    return (<Container className={classes.task__container}>
        <DeleteTask open={modalOpenDelete} setOpen={setModalOpenDelete} id={task.id}/>
        <EditTask open={modalOpenEdit} setOpen={setModalOpenEdit} id={task.id} task={task}/>
        <Grid stackable>
            <Grid.Row>
                <Grid.Column width={8}>
                    {task.image != null ?
                        <Image src={task.image} rounded size='large'/>
                        : <Image src={taskIcon} rounded size='large'/>}
                </Grid.Column>
                <Grid.Column width={8}>
                    {isUserTasks &&
                        <Button negative animated onClick={deleteTaskHandler}>
                            <Button.Content visible>{t("delete")}</Button.Content>
                            <Button.Content hidden>
                                <Icon size='large' name='delete'/>
                            </Button.Content>
                        </Button>
                    }
                    {isUserTasks &&
                        <Button animated onClick={editTaskHandler}>
                            <Button.Content visible>{t("edit")}</Button.Content>
                            <Button.Content hidden>
                                <Icon size='large' name='edit'/>
                            </Button.Content>
                        </Button>
                    }

                    <Card fluid>
                        <Card.Content className={classes.category__container}>
                            <Message style={categoryColor} className={classes.category__chip}>{taskCategory}</Message>
                            <Message style={statusColor} className={classes.status__chip}>{taskStatus}</Message>
                        </Card.Content>
                        <Card.Content><Header as='h2'>{task.title}</Header></Card.Content>
                        <Table>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>
                                        <Header as='h4'>
                                            <Header.Content>{t("address")}</Header.Content>
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell>{task.address}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Header as='h4'>
                                            <Header.Content>{t("pay")}</Header.Content>
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell>{task.pay} zł</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Header as='h4'>
                                            <Header.Content>{t("estimatedTime")}</Header.Content>
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell>{task.estimatedTime} h</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Header as='h4'>
                                            <Header.Content>{t("expDate")}</Header.Content>
                                            {/*todo*/}
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
                            <Card.Header>{t("createdBy")}</Card.Header>
                            <Card.Content>{task.user.name}</Card.Content>
                            <Card.Content><Icon name='home'/>{task.user.location}</Card.Content>
                            <Card.Content><Icon name='phone'/>{task.user.phoneNumber}</Card.Content>
                            <Card.Content><Icon name='mail'/>{task.user.email}</Card.Content>
                        </Card.Content>
                    </Card>
                    {!isUserTasks && !offerSent && !isCurrentUserTask && (
                        <Button animated onClick={offerHandler}>
                            <Button.Content visible>{t("makeAnOffer")}</Button.Content>
                            <Button.Content hidden>
                                <Icon size='large' name='chat'/>
                            </Button.Content>
                        </Button>
                    )
                    }
                    {offerSent &&
                        <div fluid className={classes.offerInfo__card}>
                            <p>{t("offerHasBeenSent")}</p>
                        </div>
                    }
                    {offers?.length > 0 && offers.map((offer) => (
                        <OfferItem offer={offer} isUserTasks={isUserTasks}/>
                    ))}
                </Grid.Column>
            </Grid.Row>
            <Divider className={classes.taskDetails__divider}/>
            <Grid.Row>
                <Container textAlign='justified'>
                    <Header>{t("details")}</Header>
                    {task.content}</Container>
            </Grid.Row>
            <Grid.Row>
                <MapContainer className={classes.taskMap__container} center={position} zoom={17}
                              scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position}>
                        <Popup>
                            {t("taskLocation")}
                        </Popup>
                    </Marker>
                </MapContainer>
            </Grid.Row>
        </Grid>
    </Container>)
}

export default TaskDetails;