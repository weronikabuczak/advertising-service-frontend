import classes from "../NewTask/NewTaskForm.module.css";
import {useRef, useState} from "react";
import {useHistory} from "react-router-dom";
import {QuantityPicker} from 'react-qty-picker';
import {useSelector} from "react-redux";
import {getUserToken} from "../../store/auth";
import LocationPicker from "react-leaflet-location-picker";
import {categories} from "../../utils/taskCategory";
import {Button} from "semantic-ui-react";

const NewTaskForm = () => {
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




    return (
        <section className={classes.section}>
            <h2>Dodaj nowe ogłoszenie</h2>
            <form onSubmit={submitHandler}>
                <div>
                    <div className={classes.control}>
                        <label htmlFor='title'>Tytuł</label>
                        <input type='text' id='title' minLength="10" maxLength="100" ref={titleInput}/>
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='content'>Opis</label>
                        <input type='text' id='content' minLength="20" maxLength="800"
                               ref={contentInput}/>
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='category'>Kategoria</label>
                        <Button.Group>
                            {categories.map((category) => (
                                <Button color={category.color} onClick={getCategory}
                                        content={category.label}>{category.label}</Button>
                            ))}
                        </Button.Group>
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='address'>Adres</label>
                        <input type='text' id='address' minLength="5" maxLength="100"
                               ref={addressInput}/>
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='pay'>Zapłata</label>
                        <input type='number' id='pay' maxLength="10" ref={payInput}/>
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='expirationDate'>Data wygaśnięcia</label>
                        <input type='date' id='expirationDate' ref={expirationDateInput}/>
                    </div>
                    <div className={classes.control}>
                        <label>Przybliżony czas na wykonanie zlecenia</label>
                        <QuantityPicker onChange={getPickerValue} e min={1} max={24} value={1}
                                        smooth/>
                        {/*required*/}
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='image'>Zdjęcie</label>
                        <input type='file' onChange={handleFileInput} id='image'/>
                    </div>
                </div>
                <div className={classes.control}>
                    <LocationPicker startPort={startPort} pointMode={pointMode}/>
                </div>
                <div className={classes.actions}>
                    <button>Dodaj ogłoszenie</button>
                    {isLoading && <p>Wysyłanie żądania...</p>}
                </div>
            </form>
        </section>
    );
}

export default NewTaskForm;