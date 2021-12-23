import {Button, Form, Modal} from "semantic-ui-react";
import {useSelector} from "react-redux";
import {deleteTask} from "../../../../../../store/task";
import {useAppDispatch} from "../../../../../../root";
import {getUserToken} from "../../../../../../store/auth";
import {useHistory} from "react-router-dom";
import NewTaskForm from "../../../../../NewTask/NewTaskForm";
import classes from "../../../../../NewTask/NewTaskForm.module.css";
import {categories} from "../../../../../../utils/taskCategory";
import {QuantityPicker} from "react-qty-picker";
import LocationPicker from "react-leaflet-location-picker";
import {useState} from "react";

const EditTask = ({open, setOpen, id}) => {
    const token = useSelector(getUserToken);
    const dispatch = useAppDispatch();
    const history = useHistory();
    const [pickerValue, setPickerValue] = useState();
    const [longitude, setLongitude] = useState(0);
    const [latitude, setLatitude] = useState(0);

    const onClose = (event) => {
        event.preventDefault()
        setOpen(false);
    }

    const editTaskHandler = () => {
        dispatch(deleteTask({id, token}));
        //history.replace('/userTasks')

    }

    const getPickerValue = (value) => {
        setPickerValue(value);
    }


    const points = [[latitude, longitude]];

    const getPoint = (point) => {
        setLatitude(point[0]);
        setLongitude(point[1]);
    }

    const startPort = {
        center: [52, 19],
        zoom: 5,
    }

    const pointMode = {
        banner: false,
        control: {
            values: points,
            onClick: point =>
                getPoint(point)
        }
    }

    return (
        <Modal
            centered={true}
            open={open}
            onClose={onClose}
            size='small'
            dimmer='blurring'
        >
            <Modal.Header>Edycja danych</Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <label>Nowy tytuł</label>
                        <input type='text'/>
                    </Form.Field>
                    <Form.Field>
                        <label>Nowy opis</label>
                        <input type='text'/>
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor='category'>Nowa kategoria</label>
                        <Button.Group>
                            {categories.map((category) => (
                                <Button color={category.color}
                                        content={category.label}>{category.label}</Button>
                            ))}
                        </Button.Group>
                    </Form.Field>
                    <Form.Field>
                        <label>Nowy adres</label>
                        <input type='text'/>
                    </Form.Field>
                    <Form.Field>
                        <label>Nowa zapłata</label>
                        <input type='number' maxLength='10'/>
                    </Form.Field>
                    <Form.Field>
                        <label>Nowa data wygaśnięcia</label>
                        <input type='date' maxLength='10'/>
                    </Form.Field>
                    <Form.Field>
                        <label>Nowa czas wykonania</label>
                        <QuantityPicker onChange={getPickerValue} e min={1} max={24} value={1}
                                        smooth/>
                    </Form.Field>
                    <Form.Field>
                        <LocationPicker startPort={startPort} pointMode={pointMode}/>
                    </Form.Field>
                    <Button positive type='submit'>Zatwierdź</Button>
                    <Button negative onClick={onClose}>
                        Anuluj
                    </Button>
                </Form>
            </Modal.Content>
        </Modal>
    )
}

export default EditTask;