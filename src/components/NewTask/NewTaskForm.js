import classes from "../NewTask/NewTaskForm.module.css";
import React, {useEffect, useRef, useState} from "react";
import {useHistory} from "react-router-dom";
import {QuantityPicker} from 'react-qty-picker';
import {useSelector} from "react-redux";
import {getUserToken} from "../../store/auth";
import LocationPicker from "react-leaflet-location-picker";
import {categories} from "../../utils/taskCategory";
import {Button, Checkbox, Radio} from "semantic-ui-react";
import {useTranslation} from "react-i18next";
import {getCategoryLabel} from "../../utils/functions";
import i18n from "../../i18n";
import {useAppDispatch} from "../../root";
import {createTask, getTasks} from "../../store/task";
import DatePicker, {registerLocale} from "react-datepicker";
import pl from 'date-fns/locale/pl';
import "react-datepicker/dist/react-datepicker.css";
import {preventDefault} from "leaflet/src/dom/DomEvent";


const NewTaskForm = () => {
    const {t} = useTranslation();
    const {language} = i18n;
    const dispatch = useAppDispatch();

    const [pickerValue, setPickerValue] = useState();
    registerLocale('pl', pl);
    const [startDate, setStartDate] = useState(new Date());
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [category, setCategory] = useState();
    console.log(category)
    const token = useSelector(getUserToken);

    const titleInput = useRef();
    const contentInput = useRef();
    const addressInput = useRef();
    const payInput = useRef();
    const history = useHistory();

    let image = null;


    const handleFileInput = (e) => {
        const file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        let baseURL;
        let newBaseURL;
        reader.onload = () => {
            baseURL = reader.result;
            newBaseURL = baseURL.split(',')[1];
            image = newBaseURL;
            console.log(image);
        };
    }

    const submitHandler = async (event) => {
        event.preventDefault();

        const title = titleInput.current.value;
        const content = contentInput.current.value;
        const address = addressInput.current.value;
        const pay = payInput.current.value;
        const estimatedTime = pickerValue;
        const expirationDate = startDate;

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

    const points = [[latitude, longitude]];

    const getPoint = (point) => {
        setLatitude(point[0]);
        setLongitude(point[1]);
    }

    const pointMode = {
        banner: false,
        control: {
            values: points,
            onClick: point =>
                getPoint(point)
        }
    };

    const startPort = {
        center: [52, 19],
        zoom: 5,
    }

    const categoriesBar = Object.entries(categories).map((arr) => {
        const [categoryId, categoryObj] = arr
        const label = getCategoryLabel(categoryId, language);
        return <Button className={classes.categoryButton} compact size='medium' color={categoryObj.colors}>
            <Checkbox radio label={label}
                      category={categoryId}
                      checked={category === categoryId}
                      onChange={(e, data) => setCategory(data.category)}> </Checkbox>
        </Button>
    })

    return (
        <section className={classes.section}>
            <h2>{t("addNewTask")}</h2>
            <div className={classes.control}>
                <label className={classes.categoryButton__label} htmlFor='category'>{t("category")}</label>
                <Button.Group className={classes.categoryButtons}>
                    {categoriesBar}
                </Button.Group>
            </div>
            <form onSubmit={submitHandler}>
                <div>
                    <div className={classes.control}>
                        <label htmlFor='title'>{t("title")}</label>
                        <input required type='text' id='title' minLength="10" maxLength="100" ref={titleInput}/>
                    </div>

                    <div className={classes.control}>
                        <label htmlFor='content'>{t("content")}</label>
                        <textarea required ref={contentInput} minLength="20" maxLength="800"
                                  placeholder={t("enterTaskDetails")} className={classes.content__textarea}/>
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='expirationDate'>{t("expDate")}</label>
                        <DatePicker
                            selected={startDate}
                            onChange={date => setStartDate(date)}
                            minDate={new Date()}
                            locale="pl"
                        />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='address'>{t("address")}</label>
                        <input required type='text' id='address' minLength="5" maxLength="100"
                               ref={addressInput}/>
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='pay'>{t("pay")} [PLN]</label>
                        <input required type='number' min='1' id='pay' max='100000' ref={payInput}/>
                    </div>
                    <div className={classes.control}>
                        <label>{t("estimatedTime")} [h]</label>
                        <div className={classes.quantityPicker}>
                            <QuantityPicker onChange={getPickerValue} min={1} max={24} value={1}
                                            smooth/>
                        </div>
                    </div>
                </div>
                <div className={classes.control}>
                    <LocationPicker startPort={startPort} pointMode={pointMode}/>
                </div>
                <div className={classes.control}>
                    <label htmlFor='image'>{t("image")}</label>
                    <input type='file' onChange={handleFileInput} id='image'/>
                </div>
                <div className={classes.actions}>
                    <button>{t("addAdvert")}</button>
                </div>
            </form>
        </section>
    );
}

export default NewTaskForm;