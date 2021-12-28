import classes from './HomePageContent.module.css';
import {Grid} from "semantic-ui-react";
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

const HomePageContent = () => {
    const [latitude, setLatitude] = useState(50);
    const [longitude, setLongitude] = useState(40);
    const center = [latitude, longitude]
    const tasks = useSelector(getAllTasks);
    const dispatch = useAppDispatch();
    const token = useSelector(getUserToken);
    const [currentTask, setCurrentTask] = useState({})
    const [zoom, setZoom] = useState(3);

    //leaflet icon issue
    let DefaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow
    });
    L.Marker.prototype.options.icon = DefaultIcon;

    useEffect(() => {
        if (token) {
            dispatch(getTasks({isUserTasks: false, token}));
        }
    }, [token]);

    const onClickFunction = (id) => {
        const task = tasks.find(t => t.id === id)
        setCurrentTask(task)
        setZoom(12);
        setLatitude(task.latitude)
        setLongitude(task.longitude)
    }


    return (
        <section className={classes.section}>
            <h3>Ogłoszenia</h3>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={10}>
                        <MapContainer className={classes.taskMap__container} center={center} zoom={zoom}
                                      scrollWheelZoom={true}>
                            <MapTrickyComponent zoom={zoom} center={center}/>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {tasks && tasks.map((task) => (
                                /* TODO if task.id === currentTaskId then color = red ?*/
                                <Marker position={[task.latitude, task.longitude]}>
                                    <Popup>
                                        Miejsce wykonania zlecenia
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <TaskList tasks={tasks} onClick={onClickFunction}/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </section>
    );
};

export default HomePageContent;