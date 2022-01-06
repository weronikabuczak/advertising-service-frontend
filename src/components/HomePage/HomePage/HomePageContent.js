import classes from './HomePageContent.module.css';
import {Button, Card, Form, Grid, Header, Icon} from "semantic-ui-react";
import TaskList from "./TaskList/TaskList";
import {MapContainer, Marker, Popup, TileLayer, useMap} from "react-leaflet";
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import {useEffect, useState} from "react";
import {getAllTasks, getTasks} from "../../../store/task";
import {useAppDispatch} from "../../../root";
import {useSelector} from "react-redux";
import {getUserToken} from "../../../store/auth";
import React from 'react'
import MapTrickyComponent from "../../NewTask/MapTrickyComponent";
import {categories} from "../../../utils/taskCategory";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import Link from "react-router-dom/es/Link";

const HomePageContent = () => {
    const [latitude, setLatitude] = useState(52);
    const [longitude, setLongitude] = useState(19);
    const center = [latitude, longitude]
    const tasks = useSelector(getAllTasks);
    const dispatch = useAppDispatch();
    const token = useSelector(getUserToken);
    const [currentTask, setCurrentTask] = useState({})
    const [zoom, setZoom] = useState(6);
    const [category, setCategory] = useState('');
    const [status, setStatus] = useState('AWAITING');

    //leaflet icon issue
    let DefaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow
    });
    L.Marker.prototype.options.icon = DefaultIcon;

    useEffect(() => {
        if (token) {
            dispatch(getTasks({isUserTasks: false, token, category, status}));
        }
    }, [token, category]);


    const onClickFunction = (id) => {
        const task = tasks.find(t => t.id === id);
        setCurrentTask(task);
        setZoom(12);
        setLatitude(task.latitude);
        setLongitude(task.longitude);
    }

    const resetMapHandler = () => {
        setZoom(6);
        setLongitude(19);
        setLatitude(52)
    }

    const filterCategory = (e, button) => {
        e.preventDefault();
        const {content} = button;
        setCategory(content);
        resetMapHandler();
    }

    const componentDidMount = () => {
        navigator.geolocation.getCurrentPosition(function (position) {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
            setZoom(13);
        });
    }


    return (
        <section className={classes.section}>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={1}/>
                    <Grid.Column width={15}>
                        <Button content='' floated='left' onClick={filterCategory}>Wszystkie</Button>
                        <Button floated='left' onClick={componentDidMount}><Icon name='compass'/>Zlokalizuj
                            mnie</Button>
                        <Button.Group floated='left'>
                            {categories.map((category) => (
                                <Button color={category.color} onClick={filterCategory}
                                        content={category.label}>{category.label}</Button>
                            ))}
                        </Button.Group>
                        <Button onClick={resetMapHandler} className={classes.refreshMap__button} floated='left'>Domyślny
                            widok mapy</Button>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={10}>
                        <MapContainer className={classes.taskMap__container} center={center} zoom={zoom}
                                      scrollWheelZoom={true}>
                            <MapTrickyComponent zoom={zoom} center={center}/>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {tasks?.length > 0 && tasks && tasks.map((task) => (
                                /* TODO if task.id === currentTaskId then color = red ?*/
                                <Marker position={[task.latitude, task.longitude]}>
                                    <Popup>
                                        Miejsce wykonania zlecenia
                                    </Popup>
                                </Marker>
                            ))}
                            }
                        </MapContainer>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        {tasks?.length > 0 && tasks
                            ?
                            <TaskList tasks={tasks} onClick={onClickFunction} isUserTasks='false'/>
                            :
                            (
                                <div className={classes.noTask__button}>
                                    <Button><Link to="/newTask">Brak ogłoszeń. Kliknij, aby dodać pierwsze
                                        zlecenie.</Link></Button>
                                </div>)
                        }
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </section>
    );
};

export default HomePageContent;