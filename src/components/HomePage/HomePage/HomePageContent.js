import classes from './HomePageContent.module.css';
import { Grid } from "semantic-ui-react";
import TaskList from "./TaskList/TaskList";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const HomePageContent = () => {
    const position = [50, 40];

    //leaflet icon issue
    let DefaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow
    });
    L.Marker.prototype.options.icon = DefaultIcon;


    return (
        <section className={classes.section}>
            <h3>Ogłoszenia</h3>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={10}>
                        <MapContainer className={classes.taskMap__container} center={position} zoom={17}
                                      scrollWheelZoom={true}>
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
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <TaskList isUserTasks={false}/>
                    </Grid.Column>

                </Grid.Row>
            </Grid>
        </section>
    );
};

export default HomePageContent;