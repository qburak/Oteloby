import { createSlice, createAsyncThunk, isAction } from '@reduxjs/toolkit'
import { act } from 'react';
import { collection, getDocs } from 'firebase/firestore'
import { query, where, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';


export const getTickets = createAsyncThunk('user/tickets', async ({ userEmail }) => {
    const allData = [];
    const allCheck = [];
    try {
        const q = query(collection(db, "tickets"), where("email", "==", userEmail));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            if('check' in data){
                allCheck.push(data.check);
            }
            allData.push(data);
        });
        return {allData, allCheck};
    } catch (e) {
        console.error("Biletlerin Çekilmesinde Hata : ", e);
        throw e;
    }
})
export const getChecks = createAsyncThunk('user/checks', async ({ userEmail }) => {
    const allCheck = [];
    try {
        const q = query(collection(db, "tickets"), where("email", "==", userEmail));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            if ('check' in data) {
                allCheck.push(data.check);
            }
        });
        return allCheck;
    } catch (e) {
        console.error("CheckIn'lerin Çekilmesinde Hata : ", e);
        throw e;
    }
});



export const checkIn = createAsyncThunk('user/checkIn', async ({ id,date }) => {
    try {
        const today = new Date();
        const startDate = date.toDate();

        today.setHours(0,0,0,0);
        startDate.setHours(0,0,0,0);

        if(startDate.getTime() == today.getTime()){
            const documentRef = doc(db, "tickets", id);

            await updateDoc(documentRef, {
                check: true
            });
            return "basarili"
        }else{
            return "zaman"
        }
        
    } catch (e) {
        console.error("ERROR: güncellenemedi ", e);
        throw e;
    }
})

const initialState = {
    data: [],
    checks:[],
    status:null,
    isLoading: false,
    error: null,
}

export const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setStatus : (state,action) =>{
            state.status = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTickets.pending, (state) => {
                state.isLoading = true;
                state.error = null;

            })
            .addCase(getTickets.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload.allData;
                state.checks = action.payload.allCheck
            })
            .addCase(getTickets.rejected, (state, action) => {
                state.isLoading = false;
                state.data = null;
                state.checks = null;
                state.error = action.error.message
            })

            .addCase(getChecks.pending,(state) =>{
                state.isLoading =true;
                state.error = null;
            })
            .addCase(getChecks.fulfilled,(state,action) =>{
                state.isLoading = false;
                state.error = null;
                state.checks = action.payload
            })
            .addCase(getChecks.rejected,(state,action) =>{
                state.isLoading = false;
                state.error = action.error.message
            })
            .addCase(checkIn.pending, (state) =>{
                state.isLoading = true;
                state.error = false;
            })
            .addCase(checkIn.fulfilled, (state,action) =>{
                state.isLoading = false;
                state.error = false;
                state.status = action.payload

            })
            .addCase(checkIn.rejected, (state,action) =>{
                state.isLoading = false;
                state.error = action.error.message;
                state.status = "basarisiz"

            })

    }
})


export default ticketSlice.reducer;
export const {setStatus} = ticketSlice.actions;
