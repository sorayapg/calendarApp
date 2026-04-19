import { useAuthStore, useCalendarStore, useUiStore } from '../../hooks';
import { createDraftEvent } from '../helpers/createDraftEvent';

export const FabAddNew = () => {

    const { openDateModal } = useUiStore();
    const { setActiveEvent } = useCalendarStore();
    const { user } = useAuthStore();


    const handleClickNew = () => {
        setActiveEvent(createDraftEvent({ user }));
        openDateModal();
    }

    return (
        <button
            className="btn btn-primary fab"
            onClick={ handleClickNew}
        
        >
            <i className="fas fa-plus"></i>
        </button>
    )
}
