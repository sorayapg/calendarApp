

export const CalendarEvent = ({ event }) => {
    
    const { title, notes, user } = event;

    return (
        <>
            <strong>{ title }</strong>
            <span> - { user.name }</span>
            { notes && <div className="cal-event-notes">{ notes }</div> }
        
        </>
    )
}
