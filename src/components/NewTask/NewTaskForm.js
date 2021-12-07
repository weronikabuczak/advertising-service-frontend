import classes from "../NewTask/NewTaskForm.module.css";
import {useContext, useRef, useState} from "react";
import {useHistory} from "react-router-dom";
import AuthContext from "../../store/auth-context";
import {QuantityPicker} from 'react-qty-picker';

const NewTaskForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [pickerValue, setPickerValue] = useState();
    const authContext = useContext(AuthContext);

    const titleInput = useRef();
    const contentInput = useRef();
    const categoryInput = useRef();
    const addressInput = useRef();
    const payInput = useRef();
    const expirationDateInput = useRef();
    const estimatedTimeInput = useRef();
    const imageInput = useRef();
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
        // const enteredEstimatedTime = estimatedTimeInput.current.value;
        const enteredImage = imageInput.current.value;

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
            image: enteredImage
        }


        fetch(url, {
            method: 'POST',
            body: JSON.stringify(init),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authContext.token,
            },
        })
            .then((response) => {
                setIsLoading(false);
                console.log(pickerValue);
                console.log(enteredEstimatedTime);
                console.log(typeof enteredExpirationDate);
                console.log(expirationDateInput);
                if (response.ok) {
                    return response.json().then(data => {
                        history.replace('/taskAdded');
                    })
                } else {
                    return response.json().then((data) => {
                        //let errorMessage = 'Authentication failed!';
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

    const getPickerValue = (value) =>{
        console.log(value);
        setPickerValue(value);

    }

    return (
        <section className={classes.section}>
            <h2>Dodaj nowe ogłoszenie</h2>

            <form onSubmit={submitHandler}>
                <div>
                    <div className={classes.control}>
                        <label htmlFor='title'>Tytuł</label>
                        <input type='text' id='title' minLength="10" maxLength="70" required ref={titleInput}/>
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='content'>Opis</label>
                        <input type='text' id='password' required minLength="20" maxLength="300"
    ref={contentInput}/>
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='category'>Kategoria</label>
                        <input type='text' id='category' required maxLength="30" ref={categoryInput}/>
                    </div>

                    <div className={classes.control}>
                        <label htmlFor='address'>Adres</label>
                        <input type='text' id='address' required minLength="20" maxLength="300"
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
                        <QuantityPicker onChange={getPickerValue} min={1} max={24} value={1} smooth/>
                       {/*required*/}
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='image'>Zdjęcie</label>
                        <input type='file' id='image' ref={imageInput}/>
                    </div>
                    {/*lokalizacja - longitude, latitude*/}
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