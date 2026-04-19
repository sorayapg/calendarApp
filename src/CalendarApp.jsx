import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router';
import { Provider } from 'react-redux';
import { store } from './store';


export const CalendarApp = () => {
  return (
    <Provider store={ store}>
      <BrowserRouter basename={ import.meta.env.BASE_URL }>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  )
}


