import { createSlice }  from '@reduxjs/toolkit';

//authSlice is for localStorage and userApiSlice is for Server


const storedUserInfo = localStorage.getItem('userInfo');
let initialState;

try {
    initialState = {
        userInfo: storedUserInfo !== undefined && storedUserInfo !== null
          ? JSON.parse(storedUserInfo)
          : null,
      };
}
catch(error){
    console.error('Error parsing storedUserInfo:', error);
    initialState = {
        userInfo: null,
  };
}

const authSlice = createSlice({
    name : 'auth',
    initialState,

    reducers: {
        setCredentials : (state,action) => {
            state.userInfo = action.payload;

            try{
                localStorage.setItem('userInfo', JSON.stringify(action.payload));
            }
            catch(error) {
                console.error('Error storing userInfo in localStorage:', error);

            }
        },

        logout : (state) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        }
    }

})

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

