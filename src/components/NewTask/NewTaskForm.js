import classes from "../NewTask/NewTaskForm.module.css";
import {useRef, useState} from "react";
import {useHistory} from "react-router-dom";
import {QuantityPicker} from 'react-qty-picker';
import {useSelector} from "react-redux";
import {getUserToken} from "../../store/auth";
import LocationPicker from "react-leaflet-location-picker";

// const category = [
//     {key: 'HOME', value: 'Dom', text: 'Dom'},
//     {key: 'GARDEN', value: 'Ogród', text: 'Ogród'},
//     {key: 'FIXING', value: 'Naprawa', text: 'Naprawa'},
// ]

const NewTaskForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [pickerValue, setPickerValue] = useState();
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [image, setImage] = useState();
    const [imageContent, setImageContent] = useState();
    const token = useSelector(getUserToken);

    const titleInput = useRef();
    const contentInput = useRef();
    const categoryInput = useRef();
    const addressInput = useRef();
    const payInput = useRef();
    const expirationDateInput = useRef();
    //const imageInput = useRef();
    const history = useHistory();


    const submitHandler = (event) => {
        event.preventDefault();

        setIsLoading(true);
        let url;
        let init;

        const enteredTitle = titleInput.current.value;
        const enteredContent = contentInput.current.value;
        const enteredCategory = categoryInput.current.value;
        const enteredAddress = addressInput.current.value;
        const enteredPay = payInput.current.value;
        const enteredExpirationDate = expirationDateInput.current.value;
        const enteredEstimatedTime = pickerValue;
        const enteredImage = image;
        const enteredLongitude = longitude;
        const enteredLatitude = latitude;


        url =
            'http://localhost:8080/api/task';
        init = {
            title: enteredTitle,
            content: enteredContent, category: enteredCategory,
            address: enteredAddress,
            pay: enteredPay,
            expirationDate: new Date(enteredExpirationDate),
            estimatedTime: enteredEstimatedTime,
            image: enteredImage,
            // longitude: longitude,
            // latitude: latitude
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

    const imageUploadHandler = (event) => {
        const newImage = event.target.files[0];
        setImage(newImage);
        newImage
            .text()
            .then(data => {
                setImageContent(data)

                // data is file content
                // can be added to some object that is send as imageContent
            })

        // const fd = new FormData();
        // fd.append('image', image, image.name);
    }


    return (
        <section className={classes.section}>
            <h2>Dodaj nowe ogłoszenie</h2>
            <form onSubmit={submitHandler}>
                <div>
                    <div className={classes.control}>
                        <label htmlFor='title'>Tytuł</label>
                        <input type='text' id='title' minLength="10" maxLength="100" required ref={titleInput}/>
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='content'>Opis</label>
                        <input type='text' id='password' required minLength="20" maxLength="800"
                               ref={contentInput}/>
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='category'>Kategoria</label>
                        <select ref={categoryInput}>
                            <option value="Home">Dom</option>
                            <option value="Garden">Ogród</option>
                            <option value="Fixing">Naprawa</option>
                        </select>

                        {/*<Button onClick={getButtonValue.content}>kesfksdf</Button>*/}
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='address'>Adres</label>
                        <input type='text' id='address' required minLength="5" maxLength="100"
                               ref={addressInput}/>
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='pay'>Zapłata</label>
                        <input type='number' id='pay' required maxLength="10" ref={payInput}/>
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='expirationDate'>Data wygaśnięcia</label>
                        <input type='date' id='expirationDate' required ref={expirationDateInput}/>
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='estimatedTime'>Przybliżony czas na wykonanie zlecenia</label>
                        <QuantityPicker className={classes.picker} onChange={getPickerValue} min={1} max={24} value={1}
                                        smooth/>
                        {/*required*/}
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='image'>Zdjęcie</label>
                        <input type='file' onChange={imageUploadHandler} id='image'/>
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