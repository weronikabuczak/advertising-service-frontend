import classes from './HomePageContent.module.css';
import {Button, Grid, Icon} from "semantic-ui-react";
import TaskList from "./TaskList/TaskList";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
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
import {useTranslation} from "react-i18next";
import {getCategoryLabel} from "../../../utils/functions";
import i18n from "../../../i18n";

const HomePageContent = () => {
    const {t} = useTranslation();
    const {language} = i18n;

    const [latitude, setLatitude] = useState(52);
    const [longitude, setLongitude] = useState(19);
    const center = [latitude, longitude]
    const tasks = useSelector(getAllTasks);
    const dispatch = useAppDispatch();
    const token = useSelector(getUserToken);
    const [currentTask, setCurrentTask] = useState({})
    const [zoom, setZoom] = useState(6);
    const [category, setCategory] = useState('');
    const [status] = useState('AWAITING');

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

    const categoriesBar = Object.entries(categories).map((arr) => {
        const [categoryId, categoryObj] = arr

        const label = getCategoryLabel(categoryId,language);

        return <Button color={categoryObj.colors} onClick={filterCategory}
                       content={categoryId}>{label}</Button>
    })

    return (
        <section className={classes.section}>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={1}/>
                    <Grid.Column width={15}>
                        <div className={classes.locationButtons}>
                            <Button floated='left' onClick={componentDidMount}><Icon
                                name='compass'/>{t("detectLocation")}</Button>
                            <Button onClick={resetMapHandler} className={classes.refreshMap__button} floated='left'>{t("defaultMap")}</Button>
                        </div>
                        <div >
                            <Button className={classes.categoryButtons} content='' floated='left' onClick={filterCategory}>{t("all")}</Button>
                            <Button.Group className={classes.categoryButtons}floated='left' >
                                {categoriesBar}
                            </Button.Group>
                        </div>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column only={"computer tablet"} widescreen={10} largeScreen={9} computer={8} tablet={7}>
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
                                        {t("taskLocation")}
                                    </Popup>
                                </Marker>
                            ))}
                            }
                        </MapContainer>
                    </Grid.Column>
                    <Grid.Column widescreen={6} largeScreen={7} computer={8} tablet={9} mobile={16}>
                        {tasks?.length > 0 && tasks
                            ?
                            <TaskList tasks={tasks} onClick={onClickFunction} isUserTasks={false}/>
                            :
                            (<div className={classes.noTask__button}>
                                <Button><Link to="/newTask">{t("noTasksAddNew")}</Link></Button>
                            </div>)
                        }
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </section>
    );
};

export default HomePageContent;