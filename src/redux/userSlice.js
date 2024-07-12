import { createSlice, createAsyncThunk, isAction } from '@reduxjs/toolkit'
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth'

export const login = createAsyncThunk('user/login', async ({ email, password }) => {
    try {
        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(auth, email, password)

        const user = userCredential.user;
        const token = user.stsTokenManager.accessToken;
        const userId = user.uid;
        const userEmail = user.email;
        const userData = {
            token,
            user: user,
        }
        /*  await AsyncStorage.setItem("userToken", token)*/
        return { userData, userId, userEmail }
    } catch (error) {
        console.log("giriş yapma hatası : " + error);
        throw error;
    }



})


const initialState = {
    isLoading: false,
    isAuth: false,
    userId: null,
    userEmail: null,
    token: null,
    user: null,
    error: null,

}
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload
        },
        setPassword: (state, action) => {
            state.password = action.payload
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.isAuth = false;
                state.userId = null;
                state.userEmail = null;
                state.token = null;
                state.user = null;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuth = true;
                state.userId = action.payload.userId;
                state.userEmail = action.payload.userEmail;
                state.token = action.payload.userData.token;
                state.user = action.payload.userData.user;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isAuth = false;
                state.error = action.error.message;
            })
    }
})
export const { setEmail, setPassword, setIsLoading } = userSlice.actions;
export default userSlice.reducer;
