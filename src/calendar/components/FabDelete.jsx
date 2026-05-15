
import { useCalendarStore } from '../../hooks';

export const FabDelete = () => {
    const { startDeletingEvent, hasExistingEventSelected } = useCalendarStore();

    const handleDelete = () => {
        startDeletingEvent();
    }

    return (
        <button
            className="btn btn-danger fab-danger"
            onClick={ handleDelete }
            style={ {
                display: hasExistingEventSelected ? '' : 'none'
            }}
        
        >
            <i className="fas fa-trash-alt"></i>
        </button>
    )
}
