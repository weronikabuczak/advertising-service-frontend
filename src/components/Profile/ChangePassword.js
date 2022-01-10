import {Button, Form, Modal} from "semantic-ui-react";
import {useRef} from "react";
import {useSelector} from "react-redux";
import {getSetOpen, getUserToken, updatePassword} from "../../store/auth";
import {useAppDispatch} from "../../root";

const ChangePassword = ({open, setOpen, email}) => {
    const token = useSelector(getUserToken);
    const currentPasswordInput = useRef();
    const newPasswordInput = useRef();
    const dispatch = useAppDispatch();
    const openModal = useSelector(getSetOpen);

    const onClose = (event) => {
        event.preventDefault()
        setOpen(false);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        const currentPassword = currentPasswordInput.current.value;
        const newPassword = newPasswordInput.current.value;
        dispatch(updatePassword({token, email, currentPassword, newPassword}));
        setOpen(openModal);
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