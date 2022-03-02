import {useMapEvents} from "react-leaflet";

const MapLeafletComponent = ({center, zoom, clickEventHandler}) => {
    const handlers = clickEventHandler ? {
        click(e) {
            clickEventHandler(e)
        },
    } : {};
    const map = useMapEvents(handlers)
    map.setView(center, zoom);
    return null;
}
export default MapLeafletComponent;