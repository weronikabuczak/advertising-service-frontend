import {Button, Modal} from "semantic-ui-react";
import {useSelector} from "react-redux";
import {deleteTask} from "../../../../../../store/task";
import {useAppDispatch} from "../../../../../../root";
import {getUserToken} from "../../../../../../store/auth";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {deleteOpinion} from "../../../../../../store/opinion";

const DeleteOpinion = ({open, setOpen, id}) => {
    const {t} = useTranslation();
    const token = useSelector(getUserToken);
    const dispatch = useAppDispatch();
    const history = useHistory();

    // console.log(opinion)

    const onClose = (e) => {
        e.preventDefault()
        setOpen(false);
    }

    const deleteOpinionHandler = () => {
        dispatch(deleteOpinion({id, token}));
        setOpen(false);
        // history.replace('/userTasks')
    }

    return (
        <Modal
            centered={true}
            open={open}
            onClose={onClose}
            size='tiny'
            dimmer='blurring'>

            <Modal.Header>{t("deleteAdvert")}</Modal.Header>
            <Modal.Content>
                <p>{t("areYouSureDeleteAd")}</p>
            </Modal.Content>
            <Modal.Actions>
                <Button positive onClick={deleteOpinionHandler}>{t("submit")}</Button>
                <Button negative onClick={onClose}>{t("cancel")}</Button>
            </Modal.Actions>
        </Modal>
    )
}

export default DeleteOpinion;