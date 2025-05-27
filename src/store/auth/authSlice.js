import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', // 'checking', 'authenticated', 'not-authenticated',
        user: {},
        errorMessage: undefined,
    },
    reducers: {
        onChecking: ( state ) => {
            state.status = 'checking'; // 'checking', 'authenticated', 'not-authenticated',
            state.user = {};
            state.errorMessage = undefined;
        },
        onLogin:( state, { payload }) => {
            state.status = 'authenticated';
            state.user = payload;
            state.errorMessage = undefined;

        },
        onLogaut: (state, { payload }) => {
            state.status = 'not-authenticated'; // 'checking', 'authenticated', 'not-authenticated',
            state.user = {};
            state.errorMessage = payload; // si hay un mensaje de error, lo guardamos aqui
        },
        clearErrorMessage: (state) => {
            state.errorMessage = undefined; // limpiamos el mensaje de error
        }
    }
});


// Action creators are generated for each case reducer function
export const { onChecking, onLogin, onLogaut, clearErrorMessage } = authSlice.actions;