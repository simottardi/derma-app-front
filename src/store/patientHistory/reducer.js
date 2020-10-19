import { FETCH_PATIENTHISTORY_SUCCESS } from "./actions";
import { MYDAY_UPDATED } from "./actions";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    
    case FETCH_PATIENTHISTORY_SUCCESS:{
          console.log(" fetched history in the reducer", action.payload )
    
      return [...state, ...action.payload];
    }
    case MYDAY_UPDATED:{
          console.log(" MyDayUpdated in the reducer", action.payload,"state", state )
    return state.map(day => {
       if (day.id !== action.payload.id) {
          return day;
      }
      return {...action.payload};
      });
    }

    default:
      return state;
  }
};
