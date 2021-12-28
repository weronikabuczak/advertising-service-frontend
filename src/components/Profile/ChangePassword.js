import {Button, Form, Modal} from "semantic-ui-react";
import {useRef} from "react";
import {useSelector} from "react-redux";
import {getUserToken} from "../../store/auth";

const ChangePassword = ({open, setOpen, email}) => {
    const token = useSelector(getUserToken);
    const currentPasswordInput = useRef();
    const newPasswordInput = useRef();

    const onClose = (event) => {
        event.preventDefault()
        setOpen(false);
    }

    const submitHandler = (event) => {
        event.preventDefault()
        const enteredCurrentPassword = currentPasswordInput.current.value;
        const enteredNewPassword = newPasswordInput.current.value;

        let url = `http://localhost:8080/api/user/updatePassword/${email}`;
        let init = {
            currentPassword: enteredCurrentPassword,
            newPassword: enteredNewPassword
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
                    <Button positive type='submit'>Zatwierdź</Button>
                    <Button negative onClick={onClose}>
                        Anuluj
                    </Button>
                </Form>
            </Modal.Content>
        </Modal>
    )
}

export default ChangePassword;