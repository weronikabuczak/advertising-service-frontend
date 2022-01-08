import {Button, Form, Modal} from "semantic-ui-react";
import {useSelector} from "react-redux";
import {useAppDispatch} from "../../../../../../root";
import {getUserToken} from "../../../../../../store/auth";
import {useHistory} from "react-router-dom";
import {categories} from "../../../../../../utils/taskCategory";
import {QuantityPicker} from "react-qty-picker";
import LocationPicker from "react-leaflet-location-picker";
import {useRef, useState} from "react";
import {useTranslation} from "react-i18next";

const EditTask = ({open, setOpen, id, task}) => {
    const {t} = useTranslation();

    const token = useSelector(getUserToken);
    const [isLoading, setIsLoading] = useState();
    const dispatch = useAppDispatch();
    const history = useHistory();
    const [pickerValue, setPickerValue] = useState();
    const [category, setCategory] = useState(task.category);
    const [longitude, setLongitude] = useState(task.longitude);
    const [latitude, setLatitude] = useState(task.latitude);

    const titleInput = useRef();
    const contentInput = useRef();
    const addressInput = useRef();
    const payInput = useRef();
    const expirationDateInput = useRef();

    const onClose = (event) => {
        event.preventDefault()
        setOpen(false);
    }

    const submitHandler = async (event) => {
        event.preventDefault();
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


        url =
            `http://localhost:8080/api/task/${id}`;
        init = {
            title: enteredTitle,
            content: enteredContent,
            category: enteredCategory,
            address: enteredAddress,
            pay: enteredPay,
            expirationDate: new Date(enteredExpirationDate),
            estimatedTime: enteredEstimatedTime,
            longitude: enteredLongitude,
            latitude: enteredLatitude
        }

        fetch(url, {
            method: 'PUT',
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
                        history.replace(`/taskDetails/${id}`);
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

    const getCategory = (e, button) => {
        e.preventDefault();
        const {content} = button;
        setCategory(content);
    }

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
                <Form onSubmit={submitHandler}>
                    <Form.Field>
                        <label>{t("newTitle")}</label>
                        <input type='text' id='title' minLength="10" maxLength="100" value={task.title}
                               ref={titleInput}/>
                    </Form.Field>
                    <Form.Field>
                        <label>{t("newContent")}</label>
                        <input type='text' id='content' minLength="20" maxLength="800" value={task.content}
                               ref={contentInput}/>
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor='category'>{t("newCategory")}</label>
                        <Button.Group>
                            {categories.map((category) => (
                                <Button color={category.color} onClick={getCategory}
                                        content={category.label}>{category.label}</Button>
                            ))}
                        </Button.Group>
                    </Form.Field>
                    <Form.Field>
                        <label>{t("newAddress")}</label>
                        <input type='text' id='address' minLength="5" maxLength="100" defaultValue={task.address}
                               ref={addressInput}/>
                    </Form.Field>
                    <Form.Field>
                        <label>{t("newPay")}</label>
                        <input type='number' id='pay' maxLength="10" ref={payInput} defaultValue={task.pay}/>
                    </Form.Field>
                    <Form.Field>
                        <label>{t("newExpDate")}</label>
                        <input type='date' id='expirationDate' ref={expirationDateInput}
                               defaultValue={task.expirationDate}/>
                    </Form.Field>
                    <Form.Field>
                        <label>{t("newEstTime")}</label>
                        <QuantityPicker onChange={getPickerValue} e min={1} max={24} defaultValue={task.estimatedTime}
                                        smooth/>
                    </Form.Field>
                    {/*<Form.Field>*/}
                    {/*    <label htmlFor='image'>Zdjęcie</label>*/}
                    {/*    <input type='file' onChange={handleFileInput} id='image'/>*/}
                    {/*</Form.Field>*/}
                    <Form.Field>
                        <LocationPicker startPort={startPort} pointMode={pointMode}/>
                    </Form.Field>
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