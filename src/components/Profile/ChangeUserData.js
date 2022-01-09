import {Button, Form, Modal} from "semantic-ui-react";
import {useEffect, useRef} from "react";
import {useSelector} from "react-redux";
import {getUserToken} from "../../store/auth";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";

const ChangeUserData = ({open, setOpen, email, user}) => {
    const {t, i18n} = useTranslation();
    const history = useHistory();
    const token = useSelector(getUserToken);
    const phoneNumberInput = useRef();
    const emailInput = useRef();
    const nameInput = useRef();
    const locationInput = useRef();

    useEffect(() => {
        },
        [user]);

    const onClose = () => {
        setOpen(false);
    }

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredPhoneNumber = phoneNumberInput.current.value;
        // const enteredEmail = emailInput.current.value;
        const enteredName = nameInput.current.value;
        const enteredLocation = locationInput.current.value;

        let url = `http://localhost:8080/api/user/${email}`;
        let init = {
            // email: enteredEmail,
            phoneNumber: enteredPhoneNumber,
            name: enteredName,
            location: enteredLocation,
        }
        // TODO Move me :)
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(init),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        })
            .then((response) => {
                if (response.ok) {
                    setOpen(false);

                } else {
                    return response.json().then((data) => {
                        if (data.status === 500) {
                            throw new Error(data.message);
                        }
                    });
                }
            })
            .catch((err) => {
                alert(err.message);
            });

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
                        <label>{t("newUsername")}</label>
                        <input type='text' ref={nameInput} defaultValue={user.name} required/>
                    </Form.Field>
                    <Form.Field>
                        <label>{t("newPhoneNumber")}</label>
                        <input type='text' ref={phoneNumberInput} maxLength={12} defaultValue={user.phoneNumber} required/>
                    </Form.Field>
                    <Form.Field>
                        <label>{t("newLocation")}</label>
                        <input type='text' ref={locationInput} defaultValue={user.location} required/>
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

export default ChangeUserData;