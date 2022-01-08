import classes from "../NewTask/NewTaskForm.module.css";
import {useRef, useState} from "react";
import {useHistory} from "react-router-dom";
import {QuantityPicker} from 'react-qty-picker';
import {useSelector} from "react-redux";
import {getUserToken} from "../../store/auth";
import LocationPicker from "react-leaflet-location-picker";
import {categories} from "../../utils/taskCategory";
import {Button} from "semantic-ui-react";
import {useTranslation} from "react-i18next";


const NewTaskForm = () => {
    const {t} = useTranslation();

    const [isLoading, setIsLoading] = useState(false);
    const [pickerValue, setPickerValue] = useState();
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [category, setCategory] = useState();
    const token = useSelector(getUserToken);

    const titleInput = useRef();
    const contentInput = useRef();
    const addressInput = useRef();
    const payInput = useRef();
    const expirationDateInput = useRef();
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
        console.log(image);

        setIsLoading(true);
        let url;
        let init;

        const enteredTitle = titleInput.current.value;
        const enteredContent = contentInput.current.value;
        const enteredCategory = category;
        const enteredAddress = addressInput.current.value;
        const enteredPay = payInput.current.value;
        const enteredExpirationDate = expirationDateInput.current.value;
        const enteredEstimatedTime = pickerValue;
        //const enteredImage = image;
        const enteredLongitude = longitude;
        const enteredLatitude = latitude;
        console.log(image);


        url =
            'http://localhost:8080/api/task';
        init = {
            title: enteredTitle,
            content: enteredContent,
            category: enteredCategory,
            address: enteredAddress,
            pay: enteredPay,
            expirationDate: new Date(enteredExpirationDate),
            estimatedTime: enteredEstimatedTime,
            image,
            longitude: enteredLongitude,
            latitude: enteredLatitude
        }

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(init),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        })
            .then((response) => {
                setIsLoading(false);
                if (response.ok) {
                    return response.json().then(data => {
                        history.replace('/taskAdded');
                    })
                } else {
                    return response.json().then((data) => {
                        if (data.status === 500) {
                            alert(data.message)
                            throw new Error(data.message);
                        }
                    });
                }
            })
            .catch((err) => {
                alert(err.message);
            });
    };

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

    const getCategory = (e, button) => {
        e.preventDefault();
        const {content} = button;
        setCategory(content);
    }

    console.log(category)


    return (
        <section className={classes.section}>
            <h2>{t("addNewTask")}</h2>
            <form onSubmit={submitHandler}>
                <div>
                    <div className={classes.control}>
                        <label htmlFor='title'>{t("title")}</label>
                        <input  required type='text' id='title' minLength="10" maxLength="100" ref={titleInput}/>
                    </div>
                    <div className={classes.control}>
                        <label className={classes.category__button} htmlFor='category'>{t("category")}</label>
                        <Button.Group>
                            {categories.map((category) => (
                                <Button toggle color={category.color} onClick={getCategory}
                                        content={category.label}>{category.label}</Button>
                            ))}
                        </Button.Group>
                        {/*required*/}
                    </div>

                    <div className={classes.control}>
                        <label htmlFor='content'>{t("content")}</label>
                        <textarea required ref={contentInput} minLength="20" maxLength="800"
                                  placeholder={t("enterTasksDetails")} className={classes.content__textarea}/>
                    </div>

                    <div className={classes.control}>
                        <label htmlFor='address'>{t("address")}</label>
                        <input required type='text' id='address' minLength="5" maxLength="100"
                               ref={addressInput}/>
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='pay'>{t("pay")}</label>
                        <input required type='number' id='pay' maxLength="10" ref={payInput}/>
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='expirationDate'>{t("expDate")}</label>
                        <input required type='date' id='expirationDate' ref={expirationDateInput}/>
                    </div>
                    <div className={classes.control}>
                        <label>{t("estimatedTime")}</label>
                        <div className={classes.quantityPicker}>
                            <QuantityPicker onChange={getPickerValue} min={1} max={24} value={1}
                                            smooth/>
                            {/*required*/}
                        </div>
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='image'>{t("image")}</label>
                        <input type='file' onChange={handleFileInput} id='image'/>
                    </div>
                </div>
                <div className={classes.control}>
                    <LocationPicker startPort={startPort} pointMode={pointMode}/>
                </div>
                <div className={classes.actions}>
                    <button>{t("addAdvert")}</button>
                    {isLoading && <p>{t("sendingRequest")}</p>}
                </div>
            </form>
        </section>
    );
}

export default NewTaskForm;