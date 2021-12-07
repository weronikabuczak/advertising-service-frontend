import classes from "../NewTask/NewTaskForm.module.css";
import {useRef, useState} from "react";
import {useHistory} from "react-router-dom";

const NewTaskForm = () => {
    //const [isLoading, setIsLoading] = useState(false);

    const titleInput = useRef();
    const contentInput = useRef();
    const categoryInput = useRef();
    const nameInput = useRef();
    const locationInput = useRef();
    const phoneInput = useRef();
    const imageInput = useRef();
    const history = useHistory();
    const submitHandler = (event) => {
    }

    return (
        <section className={classes.form}>
            <h2>Dodaj nowe ogłoszenie</h2>
            <form onSubmit={submitHandler}>
                <div>
                    <div className={classes.control}>
                        <label htmlFor='title'>Tytuł</label>
                        <input type='text' id='title' minLength="10" maxLength="70" required/>
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='content'>Opis</label>
                        <input type='text' id='password' required minLength="20" maxLength="300"></input>
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='category'>Kategoria</label>
                        <input type='text' id='category' required maxLength="30"></input>
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='address'>Adres</label>
                        <input type='text' id='address' required minLength="20" maxLength="300"></input>
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='pay'>Zapłata</label>
                        <input type='number' id='pay' required maxLength="10"></input>
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='expirationDate'>Data wygaśnięcia</label>
                        <input type='date' id='expirationDate' required></input>
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='estimatedTime'>Przybliżony czas na wykonanie zlecenia</label>
                        <input type='time' id='estimatedTime' required></input>
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='image'>Zdjęcie</label>
                        <input type='file' id='image' className={classes.inputfile}></input>
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