import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {getSetOpen, getUserToken, updateUserImage} from "../../../../store/auth";
import {useAppDispatch} from "../../../../root";
import {Button, Form, Modal} from "semantic-ui-react";

const UpdateUserImage = ({open, setOpen, email}) => {
    const {t} = useTranslation();
    const token = useSelector(getUserToken);
    const dispatch = useAppDispatch();
    const openModal = useSelector(getSetOpen);
    let image = null;

    const onClose = (event) => {
        event.preventDefault()
        setOpen(false);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(updateUserImage({token, image, email}));
        setOpen(openModal);
    }

    const handleFileInput = (e) => {
        const file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        let baseURL;
        let newBaseURL;
        reader.onloadend = () => {
            baseURL = reader.result;
            newBaseURL = baseURL.split(',')[1];
            image = newBaseURL;
        };
    }

    return (
        <Modal
            centered={true}
            open={open}
            onClose={onClose}
            size='tiny'
            dimmer='blurring'
        >
            <Modal.Header>{t("chooseNewImage")}</Modal.Header>
            <Modal.Content>
                <Form onSubmit={submitHandler}>
                    <Form.Field>
                        <input type='file' required onChange={handleFileInput}/>
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

export default UpdateUserImage;