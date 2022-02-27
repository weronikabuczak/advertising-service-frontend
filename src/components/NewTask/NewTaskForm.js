import classes from "../NewTask/NewTaskForm.module.css";
import React, {useEffect, useRef, useState} from "react";
import {useHistory} from "react-router-dom";
import {QuantityPicker} from 'react-qty-picker';
import {useSelector} from "react-redux";
import {getUserToken} from "../../store/auth";
import {categories} from "../../utils/taskCategory";
import {Button, Checkbox, Message} from "semantic-ui-react";
import {useTranslation} from "react-i18next";
import {getCategoryLabel} from "../../utils/functions";
import i18n from "../../i18n";
import {useAppDispatch} from "../../root";
import {createTask} from "../../store/task";
import DatePicker, {registerLocale} from "react-datepicker";
import pl from 'date-fns/locale/pl';
import "react-datepicker/dist/react-datepicker.css";
import {useDebouncedCallback} from "use-debounce";
import {MapContainer, Marker, TileLayer} from "react-leaflet";
import MapLeafletComponent from "./MapLeafletComponent";

const NewTaskForm = () => {
    const {t} = useTranslation();
    const token = useSelector(getUserToken);
    const {language} = i18n;
    const dispatch = useAppDispatch();
    const history = useHistory();

    const [pickerValue, setPickerValue] = useState();
    const [img, setImg] = useState();
    registerLocale('pl', pl);
    const [startDate, setStartDate] = useState(new Date());
    const [latitude, setLatitude] = useState(65);
    const [longitude, setLongitude] = useState(20);
    const center = [latitude, longitude]
    const [zoom, setZoom] = useState(5);
    const [generatedAddress, setGeneratedAddress] = useState();
    const [category, setCategory] = useState('Housework');

    const titleInput = useRef();
    const contentInput = useRef();
    let addressInput = useRef();
    const payInput = useRef();

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

    const submitHandler = async (event) => {
        event.preventDefault();

        const title = titleInput.current.value;
        const content = contentInput.current.value;
        const address = generatedAddress;
        const pay = payInput.current.value;
        const estimatedTime = pickerValue;
        const expirationDate = startDate;
        const image = img;
        dispatch(createTask({
            token,
            title,
            content,
            category,
            address,
            pay,
            expirationDate,
            estimatedTime,
            image,
            longitude,
            latitude
        }))
        history.replace('/taskAdded');
    }

    const getPickerValue = (value) => {
        setPickerValue(value);
    }

    const handleFileInput = (e) => {
        const file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        let baseURL;
        let newBaseURL;
        reader.onload = () => {
            baseURL = reader.result;
            newBaseURL = baseURL.split(',')[1];
            setImg(newBaseURL);
        };
    }

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
        <section className={classes.section}>
            <h2>{t("addNewTask")}</h2>
            <div className={classes.control__main}>
                <label className={classes.categoryButton__label} htmlFor='category'>{t("category")}</label>
                <Button.Group className={classes.categoryButtons}>
                    {categoriesBar}
                </Button.Group>
            </div>
            <form onSubmit={submitHandler}>
                <div>
                    <div className={classes.control__main}>
                        <label htmlFor='title'>{t("title")}</label>
                        <input required type='text' id='title' minLength="10" maxLength="100" ref={titleInput}/>
                    </div>

                    <div className={classes.control__main}>
                        <label htmlFor='content'>{t("content")}</label>
                        <textarea required ref={contentInput} minLength="20" maxLength="800"
                                  placeholder={t("enterTaskDetails")} className={classes.content__textarea}/>
                    </div>
                    <div className={classes.control__secondary}>
                        <label htmlFor='expirationDate'>{t("expDate")}</label>
                        <DatePicker
                            selected={startDate}
                            onChange={date => setStartDate(date)}
                            minDate={new Date()}
                            locale="pl"
                        />
                    </div>
                    <div className={classes.control__secondary}>
                        <label htmlFor='pay'>{t("pay")} [PLN]</label>
                        <input required type='number' min='1' id='pay' max='100000' ref={payInput}/>
                    </div>
                    <div className={classes.control__secondary}>
                        <label>{t("estimatedTime")} [h]</label>
                        <div className={classes.quantityPicker}>
                            <QuantityPicker onChange={getPickerValue} min={1} max={24} value={1}
                                            smooth/>
                        </div>
                    </div>
                </div>
                <div className={classes.control__secondary}>
                    <label htmlFor='image'>{t("image")}</label>
                    <input type='file' onChange={handleFileInput}/>
                </div>
                <div className={classes.control__main}>
                    <label htmlFor='address'>{t("findAddress")}</label>
                    <input type='text' id='address' maxLength="100" defaultValue={addressDebouncedValue}
                           ref={addressInput} onChange={(e) => debounced(e.target.value)}/>
                </div>
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
                <div className={classes.actions}>
                    <button>{t("addAdvert")}</button>
                </div>
            </form>


        </section>

    );
}

export default NewTaskForm;