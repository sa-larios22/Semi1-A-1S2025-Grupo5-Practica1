import { useDispatch, useSelector } from "react-redux";
import { onChangeStatus} from '../store';

export const useUI = () => {
    const { status } = useSelector(state => state.ui);
    const dispatch = useDispatch();

    const startChangeStatusModal = () => {
        dispatch(onChangeStatus());
    }


    return {
        status,
        startChangeStatusModal
    }
}