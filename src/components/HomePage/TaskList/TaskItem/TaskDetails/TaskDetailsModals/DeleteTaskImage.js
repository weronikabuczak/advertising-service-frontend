import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {Button, Modal} from "semantic-ui-react";
import {deleteTaskImage, getSetOpenTask} from "../../../../../../store/task";
import {useAppDispatch} from "../../../../../../root";
import { getUserToken} from "../../../../../../store/auth";

const DeleteTaskImage = ({open, setOpen, id}) => {
    const {t} = useTranslation();
    const token = useSelector(getUserToken);
    const dispatch = useAppDispatch();
    const openModal = useSelector(getSetOpenTask);

    const onClose = (event) => {
        event.preventDefault()
        setOpen(false);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(deleteTaskImage({token, id}));
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

export default DeleteTaskImage;