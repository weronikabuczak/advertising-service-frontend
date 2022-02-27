import {useMap, useMapEvents} from "react-leaflet";

const MapLeafletComponent = ({center, zoom, clickEventHandler}) => {
    //const map = useMap();
    const handlers = clickEventHandler ? {
        click(e) {
            clickEventHandler(e)
        },
    } : {};
    console.log(clickEventHandler)
    const map = useMapEvents(handlers)

    map.setView(center);
    console.log(center)
    console.log(zoom)
    return null;
}
export default MapLeafletComponent;