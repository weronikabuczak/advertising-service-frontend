import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {deleteUserImage, getSetOpen, getUserToken} from "../../../../store/auth";
import {useAppDispatch} from "../../../../root";
import {Button, Form, Modal} from "semantic-ui-react";

const DeleteUserImage = ({open, setOpen, email}) => {
    const {t} = useTranslation();
    const token = useSelector(getUserToken);
    const dispatch = useAppDispatch();
    const openModal = useSelector(getSetOpen);

    const onClose = (event) => {
        event.preventDefault()
        setOpen(false);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(deleteUserImage({token, email}));
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
            <Modal.Header>{t("areYouSureDeleteImage")}</Modal.Header>
            <Modal.Content>
                    <Button positive onClick={submitHandler} type='submit'>{t("submit")}</Button>
                    <Button negative onClick={onClose}>
                        {t("cancel")}
                    </Button>
            </Modal.Content>
        </Modal>
    )
}

export default DeleteUserImage;