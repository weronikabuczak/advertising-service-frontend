import {Button, Form, Modal} from "semantic-ui-react";
import {useEffect, useRef} from "react";
import {useSelector} from "react-redux";
import {getSetOpen, getUserToken, updateUser} from "../../store/auth";
import {useTranslation} from "react-i18next";
import {useAppDispatch} from "../../root";

const ChangeUserData = ({open, setOpen, email, user}) => {
    const {t, i18n} = useTranslation();
    const token = useSelector(getUserToken);
    const phoneNumberInput = useRef();
    const nameInput = useRef();
    const locationInput = useRef();
    const dispatch = useAppDispatch();
    const openModal = useSelector(getSetOpen);

    useEffect(() => {
        },
        [user]);

    const onClose = () => {
        setOpen(false);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        const phoneNumber = phoneNumberInput.current.value;
        const name = nameInput.current.value;
        const location = locationInput.current.value;
        dispatch(updateUser({token, email, phoneNumber, name, location}));
        setOpen(openModal);
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
                        <input type='text' ref={phoneNumberInput} maxLength={12} defaultValue={user.phoneNumber}
                               required/>
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