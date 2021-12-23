import {Button, Modal} from "semantic-ui-react";
import {useSelector} from "react-redux";
import {deleteTask} from "../../../../../../store/task";
import {useAppDispatch} from "../../../../../../root";
import {getUserToken} from "../../../../../../store/auth";
import {useHistory} from "react-router-dom";

const DeleteTask = ({open, setOpen, id}) => {
    const token = useSelector(getUserToken);
    const dispatch = useAppDispatch();
    const history = useHistory();

    const onClose = (event) => {
        event.preventDefault()
        setOpen(false);
    }

    const deleteTaskHandler = () => {
        dispatch(deleteTask({id, token}));
        history.replace('/userTasks')

    }
    return (
        <Modal
            centered={true}
            open={open}
            onClose={onClose}
            size='tiny'
            dimmer='blurring'
        >
            <Modal.Header>Usuwanie ogłoszenia</Modal.Header>
            <Modal.Content>
                <p>Czy na pewno chcesz usunąć ogłoszenie?</p>
            </Modal.Content>
            <Modal.Actions>
                <Button positive onClick={deleteTaskHandler}>Zatwierdź</Button>
                <Button negative onClick={onClose}>Anuluj</Button>

            </Modal.Actions>
        </Modal>
    )
}

export default DeleteTask;