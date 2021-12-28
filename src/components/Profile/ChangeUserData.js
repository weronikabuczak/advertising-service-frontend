import {Button, Form, Modal} from "semantic-ui-react";
import {useRef} from "react";
import {useSelector} from "react-redux";
import {getUserToken} from "../../store/auth";
import {useHistory} from "react-router-dom";

const ChangeUserData = ({open, setOpen, email, user}) => {
    const history = useHistory();
    const token = useSelector(getUserToken);
    const phoneNumberInput = useRef();
    const emailInput = useRef();
    const nameInput = useRef();
    const locationInput = useRef();

    const onClose = () => {
        setOpen(false);
    }

    const submitHandler = (event, data) => {
        event.preventDefault();

        const enteredPhoneNumber = phoneNumberInput.current.value;
        const enteredEmail = emailInput.current.value;
        const enteredName = nameInput.current.value;
        const enteredLocation = locationInput.current.value;

        let url = `http://localhost:8080/api/user/${email}`;
        let init = {
            email: enteredEmail,
            phoneNumber: enteredPhoneNumber,
            name: enteredName,
            location: enteredLocation,
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
            <Modal.Header>Edycja danych</Modal.Header>
            <Modal.Content>
                <Form onSubmit={submitHandler}>
                    <Form.Field>
                        <label>Nowa nazwa użytkownika</label>
                        <input type='text' ref={nameInput} defaultValue={user.name} required/>
                    </Form.Field>
                    <Form.Field>
                        <label>Nowy e-mail</label>
                        <input type='email' ref={emailInput} defaultValue={user.email} required/>
                    </Form.Field>
                    <Form.Field>
                        <label>Nowy numer telefonu</label>
                        <input type='number' ref={phoneNumberInput} maxLength={12} defaultValue={user.phoneNumber} required/>
                    </Form.Field>
                    <Form.Field>
                        <label>Nowa miejscowość</label>
                        <input type='text' ref={locationInput} defaultValue={user.location} required/>
                    </Form.Field>
                    <Button positive type='submit'>Zatwierdź</Button>
                    <Button negative onClick={onClose}>
                        Anuluj
                    </Button>
                </Form>
            </Modal.Content>
        </Modal>
    )
}

export default ChangeUserData;