import {Button, Container, Divider, Grid, Header, Icon} from "semantic-ui-react";
import classes from './TaskDetails.module.css';
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import {useSelector} from "react-redux";
import {getCurrentTask} from "../../../../../store/task";
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import React, {useEffect, useState} from "react";
import DeleteTask from "./TaskDetailsModals/DeleteTask";
import EditTask from "./TaskDetailsModals/EditTask";
import {getUserEmail, getUserToken} from "../../../../../store/auth";
import {useAppDispatch} from "../../../../../root";
import {
    createOffer,
    getAllOffers,
    getOffers,
} from "../../../../../store/offer";
import {useLocation} from "react-router-dom";
import OfferItem from "./Offer/OfferItem";
import {useTranslation} from "react-i18next";
import {
    getCategoryColorClass,
    getCategoryLabel,
    getStatusColorClass,
    getStatusLabel
} from "../../../../../utils/functions";
import {TaskCreatedBy} from "./TaskDetailsCard/TaskCreatedBy";
import TaskDetailsCard from "./TaskDetailsCard/TaskDetailsCard";
import DeleteTaskImage from "./TaskDetailsModals/DeleteTaskImage";
import UpdateTaskImage from "./TaskDetailsModals/UpdateTaskImage";
import {setPosition} from "leaflet/src/dom/DomUtil";
import mapLeafletComponent from "../../../../NewTask/MapLeafletComponent";
import MapLeafletComponent from "../../../../NewTask/MapLeafletComponent";

const TaskDetails = () => {
    const {t, i18n} = useTranslation();
    const {language: currentLanguage} = i18n;
    const dispatch = useAppDispatch();
    const location = useLocation();

    const token = useSelector(getUserToken);
    const task = useSelector(getCurrentTask);
    const currentUser = useSelector(getUserEmail);
    const offers = useSelector(getAllOffers);
    let avatar = null;
    let taskId = task.id;
    const latitude = task.latitude;
    const longitude = task.longitude;
    const [zoom, setZoom] = useState();
    let position = [latitude, longitude];

    const [modalOpenDelete, setModalOpenDelete] = useState(false);
    const [modalOpenEdit, setModalOpenEdit] = useState(false);
    const [modalOpenUpdateTaskImage, setModalOpenUpdateTaskImage] = useState(false);
    const [modalOpenDeleteTaskImage, setModalOpenDeleteTaskImage] = useState(false);
    const [isUserTasks, setIsUserTasks] = useState(false);
    const [isCurrentUserTask, setIsCurrentUserTask] = useState(false);
    const [offerSent, setOfferSent] = useState(false);

    //leaflet icon issue
    let DefaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow
    });
    L.Marker.prototype.options.icon = DefaultIcon;


    useEffect(() => {
            setIsCurrentUserTask(currentUser === task.user.email);
            if (location.state.isUserTasks !== null) {
                setIsUserTasks(location.state.isUserTasks === true);
            }
            switch (token && task.status) {
                case 'AWAITING':
                    dispatch(getOffers({token, taskId, offerStatus: 'ACTIVE'}));
                    break;
                case 'IN_PROGRESS':
                    dispatch(getOffers({token, taskId, offerStatus: 'ACCEPTED'}));
                    break;
                case 'DONE':
                    dispatch(getOffers({token, taskId, offerStatus: 'COMPLETED'}));
                    break;
            }
        },
        [dispatch, task.status, location.state.isUserTasks, taskId, token, task, offerSent, isCurrentUserTask, currentUser, modalOpenDelete, modalOpenEdit]);


    const taskStatus = getStatusLabel(task.status, currentLanguage);

    const statusColor = {
        'backgroundColor': getStatusColorClass(task.status)
    };

    const taskCategory = getCategoryLabel(task.category, currentLanguage);

    const categoryColor = {
        'backgroundColor': getCategoryColorClass(task.category)
    };

    if (task.user.image) {
        avatar = "data:image/jpeg;base64," + task.user.image;
    }

    const deleteTaskHandler = () => {
        setModalOpenDelete(true);
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

    const updateTaskImageHandler = () => {
        setModalOpenUpdateTaskImage(true);
    }

    const deleteTaskImageHandler = () => {
        setModalOpenDeleteTaskImage(true);
    }
    return (<Container className={classes.task__container}>
        <DeleteTask open={modalOpenDelete} setOpen={setModalOpenDelete} id={task.id}/>
        <EditTask open={modalOpenEdit} setOpen={setModalOpenEdit} id={task.id} task={task} zoom={zoom}/>
        <DeleteTaskImage open={modalOpenDeleteTaskImage} setOpen={setModalOpenDeleteTaskImage} id={task.id}/>
        <UpdateTaskImage open={modalOpenUpdateTaskImage} setOpen={setModalOpenUpdateTaskImage} id={task.id}/>
        <Grid stackable>
            <Grid.Row>
                <Grid.Column width={8}>
                    <MapContainer className={classes.taskMap__container} center={position} zoom={13}
                                  scrollWheelZoom={true}>
                        <MapLeafletComponent center={position}/>
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
                    <Divider/>
                    <Container textAlign='justified'>
                        <Header>{t("details")}:</Header>
                        {task.content}</Container>
                </Grid.Column>
                <Grid.Column width={8}>
                    <TaskDetailsCard isUserTasks={isUserTasks} isCurrentUserTask={isCurrentUserTask}
                                     deleteTaskHandler={deleteTaskHandler}
                                     editTaskHandler={editTaskHandler} categoryColor={categoryColor}
                                     statusColor={statusColor}
                                     taskCategory={taskCategory} taskStatus={taskStatus} task={task}
                                     updateTaskImageHandler={updateTaskImageHandler}
                                     deleteTaskImageHandler={deleteTaskImageHandler}/>
                    <TaskCreatedBy avatar={avatar} task={task}/>

                    {!isUserTasks && !offerSent && !isCurrentUserTask && (
                        <Button animated onClick={offerHandler}>
                            <Button.Content visible>{t("makeAnOffer")}</Button.Content>
                            <Button.Content hidden>
                                <Icon size='large' name='chat'/>
                            </Button.Content>
                        </Button>)
                    }
                    {offerSent &&
                        <div fluid className={classes.offerInfo__card}>
                            <p>{t("offerHasBeenSent")}</p>
                        </div>
                    }
                    {offers?.length > 0 && offers.map((offer) => (
                        <OfferItem offer={offer} isUserTasks={isUserTasks} currentOffId={offer.id}/>
                    ))}
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </Container>)
}

export default TaskDetails;