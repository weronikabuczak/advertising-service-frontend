import {useMap} from "react-leaflet";

const MapTrickyComponent = ({center, zoom}) => {
    const map = useMap();
    map.setView(center, zoom);
    return null;
}
export default MapTrickyComponent;