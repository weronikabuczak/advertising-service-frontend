import {Button, Form, Modal} from "semantic-ui-react";
import classes from "../HomePage/Authorization/AuthorizationForm.module.css";
import {useContext, useRef} from "react";
import AuthContext from "../../store/auth-context";
import {useHistory} from "react-router-dom";

const ChangePassword = ({open, setOpen, email}) => {
    const authContext = useContext(AuthContext);
    const history = useHistory();

    const currentPasswordInput = useRef();
    const newPasswordInput = useRef();

    const onClose = () => {
        setOpen(false)
    }

    const submitHandler = (event) => {
        event.preventDefault();

        //const enteredCurrentPassword = currentPasswordInput.current.value;
        const enteredNewPassword = newPasswordInput.current.value;

        let url = `http://localhost:8080/api/user/${email}`;
        let init = {
            //email: enteredCurrentPassword,
            password: enteredNewPassword
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
            size='tiny'
            dimmer='blurring'
        >
            <Modal.Header>Zmiana hasła</Modal.Header>
            <Modal.Content>
                <Form onSubmit={submitHandler}>
                    <Form.Field>
                        <label>Obecne hasło</label>
                        <input type='password' required ref={currentPasswordInput}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Nowe hasło</label>
                        <input type='password' required ref={newPasswordInput}/>
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

export default ChangePassword;