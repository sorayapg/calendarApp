// src/hooks/useCalendarForm.js
import { useEffect, useMemo, useState } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';
import Swal from 'sweetalert2';
import { useCalendarStore, useUiStore } from '../../hooks';

export const useCalendarForm = (initialForm = {}) => {

  const { activeEvent, startSavingEvent } = useCalendarStore();
  const { closeDateModal } = useUiStore();

  const [formValues, setFormValues] = useState({
    title: '',
    notes: '',
    start: new Date(),
    end: addHours(new Date(), 2),
    ...initialForm,
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const titleClass = useMemo(() => {
    if (!formSubmitted) return '';
    return formValues.title.length > 0 ? 'is-valid' : 'is-invalid';
  }, [formValues.title, formSubmitted]);



  useEffect(() => {
    if ( activeEvent !== null ) {
      setFormValues({ ...activeEvent });
    }
  
    
  }, [ activeEvent ])
  

  const onInputChanged = ({ target }) => {
    setFormValues({ ...formValues, [target.name]: target.value });
  };

  const onDateChanged = (date, type) => {
    setFormValues({ ...formValues, [type]: date });
  };

  const validateForm = async () => {
    setFormSubmitted(true);
    const diff = differenceInSeconds(formValues.end, formValues.start);
    if (isNaN(diff) || diff <= 0) {
      Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error');
      return false;
    }

    if (formValues.title.length <= 0) return false;
    
    await startSavingEvent( formValues);
    closeDateModal();
    setFormSubmitted(false);
    return true;
    
  };

  
  return {
    formValues,
    titleClass,
    onInputChanged,
    onDateChanged,
    validateForm,
    
  };
};
