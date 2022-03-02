import {Button, Checkbox, Form, Message, Modal} from "semantic-ui-react";
import {useSelector} from "react-redux";
import {useAppDispatch} from "../../../../../../root";
import {getUserToken} from "../../../../../../store/auth";
import {QuantityPicker} from "react-qty-picker";
import LocationPicker from "react-leaflet-location-picker";
import React, {useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {categories} from "../../../../../../utils/taskCategory";
import {getCategoryLabel} from "../../../../../../utils/functions";
import i18n from "../../../../../../i18n";
import {getSetOpenTask, updateTask} from "../../../../../../store/task";
import classes from "../../../../../NewTask/NewTaskForm.module.css";
import DatePicker, {registerLocale} from "react-datepicker";
import pl from 'date-fns/locale/pl';
import {MapContainer, Marker, TileLayer} from "react-leaflet";
import MapLeafletComponent from "../../../../../NewTask/MapLeafletComponent";
import {useDebouncedCallback} from "use-debounce";

const EditTask = ({open, setOpen, id, task}) => {
    const {t} = useTranslation();
    const {language} = i18n;
    registerLocale('pl', pl);

    const token = useSelector(getUserToken);
    const dispatch = useAppDispatch();
    const [startDate, setStartDate] = useState(new Date());
    const [pickerValue, setPickerValue] = useState();
    const [category, setCategory] = useState(task.category);
    const [longitude, setLongitude] = useState(task.longitude);
    const [latitude, setLatitude] = useState(task.latitude);
    const center = [latitude, longitude];
    const [zoom, setZoom] = useState(5);
    const [generatedAddress, setGeneratedAddress] = useState();

    const titleInput = useRef();
    const contentInput = useRef();
    const addressInput = useRef();
    const payInput = useRef();
    const openModal = useSelector(getSetOpenTask);

    const onClose = () => {
        setOpen(false);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        const title = titleInput.current.value;
        const content = contentInput.current.value;
        // const address = addressInput.current.value;
        const address = generatedAddress;
        const pay = payInput.current.value;
        const estimatedTime = pickerValue;
        const expirationDate = startDate;

        dispatch(updateTask({
            token,
            id,
            title,
            content,
            category,
            address,
            pay,
            expirationDate,
            estimatedTime,
            longitude,
            latitude
        }));
        setOpen(openModal);
    }

    const getPickerValue = (value) => {
        setPickerValue(value);
    }


    const [addressDebouncedValue, setAddressDebouncedValue] = useState();

    useEffect(() => {
        if (addressDebouncedValue) {
            setGeneratedAddress(addressDebouncedValue);
            try {
                let url = `http://api.positionstack.com/v1/forward?access_key=ef70f7232d903256e72a4cda3ddb4ebd&query=${addressDebouncedValue}`;
                return fetch(url, {
                    method: 'GET'
                }).then((response) => {
                    response.json().then(response => {
                        const {data} = response;
                        const locationFromApi = data[0];
                        if (locationFromApi) {
                            const {latitude: newLatitude, longitude: newLongitude} = locationFromApi;
                            setLatitude(newLatitude);
                            setLongitude(newLongitude);
                            setZoom(16);
                        }
                    })
                })
            } catch (error) {
                throw error;
            }
        }
    }, [addressDebouncedValue]);

    const debounced = useDebouncedCallback(
        (value) => {
            setAddressDebouncedValue(value);
        },
        1000
    );

    const addressEventHandler = (e) => {
        const {latlng} = e;
        const {lat, lng} = latlng;
        setLatitude(lat);
        setLongitude(lng);
        try {
            const url = `http://api.positionstack.com/v1/reverse?access_key=ef70f7232d903256e72a4cda3ddb4ebd&query=${lat},${lng}`;
            return fetch(url, {
                method: 'GET'
            }).then((response) => {
                response.json().then(response => {
                    const {data} = response;
                    setGeneratedAddress(data[0].label)
                })
            })
        } catch (error) {
            throw error;
        }
    }

    useEffect(() => {
    }, [generatedAddress])

    const categoriesBar = Object.entries(categories).map((arr) => {
        const [categoryId, categoryObj] = arr
        const label = getCategoryLabel(categoryId, language);
        return <Button className={classes.categoryButton} compact size='medium' color={categoryObj.colors}>
            <Checkbox radio label={label}
                      category={categoryId}
                      defaultChecked={category}
                      checked={category === categoryId}
                      onChange={(e, data) => setCategory(data.category)}> </Checkbox>
        </Button>
    })
    return (
        <Modal
            centered={true}
            open={open}
            onClose={onClose}
            size='small'
            dimmer='blurring'
        >
            <Modal.Header>{t("editData")}</Modal.Header>
            <Modal.Content>
                <div className={classes.control}>
                    <label className={classes.categoryButton__label} htmlFor='category'>{t("category")}</label>
                    <Button.Group className={classes.categoryButtons}>
                        {categoriesBar}
                    </Button.Group>
                </div>
                <Form onSubmit={submitHandler}>
                    <Form.Field>
                        <label>{t("newTitle")}</label>
                        <input type='text' id='title' minLength="10" maxLength="100" defaultValue={task.title}
                               ref={titleInput}/>
                    </Form.Field>
                    <Form.Field>
                        <label>{t("newContent")}</label>
                        <input type='text' id='content' minLength="20" maxLength="800" defaultValue={task.content}
                               ref={contentInput}/>
                    </Form.Field>
                    <Form.Field>
                        <div className={classes.control}>
                            <label htmlFor='expirationDate'>{t("expDate")}</label>
                            <DatePicker
                                selected={startDate}
                                onChange={date => setStartDate(date)}
                                minDate={new Date()}
                                locale="pl"
                            />
                        </div>
                    </Form.Field>
                    <Form.Field>
                        <label>{t("newPay")}</label>
                        <input type='number' id='pay' maxLength="10" ref={payInput} defaultValue={task.pay}/>
                    </Form.Field>
                    <Form.Field>
                        <label>{t("newEstTime")}</label>
                        <QuantityPicker onChange={getPickerValue} e min={1} max={24}
                                        value={task.estimatedTime}
                                        smooth/>
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor='address'>{t("findAddress")}</label>
                        <input type='text' id='address' maxLength="100" defaultValue={addressDebouncedValue}
                               ref={addressInput} onChange={(e) => debounced(e.target.value)}/>
                    </Form.Field>
                    {/*<LocationPicker startPort={startPort} pointMode={pointMode} showControls={false}/>*/}
                    <div>
                        <MapContainer className={classes.map__container} center={center} zoom={zoom}
                                      scrollWheelZoom={true}>
                            <MapLeafletComponent center={center} zoom={zoom} clickEventHandler={addressEventHandler}/>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={[latitude, longitude]}/>
                        </MapContainer>
                        {generatedAddress && <Message>{t("selectedAddress")}{generatedAddress}</Message>}
                    </div>
                    <Button positive type='submit'>{t("submit")}</Button>
                    <Button negative onClick={onClose}>
                        {t("cancel")}
                    </Button>
                </Form>
            </Modal.Content>
        </Modal>
    )
}

export default EditTask;