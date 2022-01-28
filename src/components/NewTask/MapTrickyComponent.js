import {useMap} from "react-leaflet";

const MapLeafletComponent = ({center, zoom}) => {
    const map = useMap();
    map.setView(center, zoom);
    return null;
}
export default MapLeafletComponent;