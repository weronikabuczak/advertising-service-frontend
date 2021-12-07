import {Button, Form, Modal} from "semantic-ui-react";
import {useContext, useRef} from "react";
import AuthContext from "../../store/auth-context";
import {useHistory} from "react-router-dom";

const ChangeUserData = ({open, setOpen, email}) => {
    const authContext = useContext(AuthContext);
    const history = useHistory();

    const phoneNumberInput = useRef();
    const emailInput = useRef();
    const nameInput = useRef();
    const locationInput = useRef();

    const onClose = () => {
        setOpen(false)
    }

    const submitHandler = (event) => {
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
            location: enteredLocation
        }

        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(init),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authContext.token,
            },
        })
            .then((response) => {
                // setIsLoading(false);
                if (response.ok) {
                    history.replace('/profile');
                } else {
                    return response.json().then((data) => {
                        if (data.status === 500) {
                            console.log(data.message);
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
                        <input type='text' required ref={nameInput}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Nowy e-mail</label>
                        <input type='email' required ref={emailInput}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Nowy numer telefonu</label>
                        <input type='number' required ref={phoneNumberInput}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Nowa miejscowość</label>
                        <input type='text' required ref={locationInput}/>
                    </Form.Field>
                    <Button positive type='submit' onClick={onClose}>Zatwierdź</Button>
                    <Button negative onClick={onClose}>
                        Anuluj
                    </Button>
                </Form>
            </Modal.Content>
        </Modal>
    )
}

export default ChangeUserData;