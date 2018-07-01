import axios from 'axios';

export function loadData() {
	// THUNK
    // return dispatch => {
    //     dispatch({type: 'FETCH_DATA_START'});
    //     axios.get('./oliver-data.json')
    //     	.then((response){
    //     		dispatch(
    //     			type: 'FETCH_DATA_FULFILLED',
    //     			payload: response.data
    //     		);
    //     	})
    //     	.catch((error){
    //     		dispatch(
    //     			type: 'FETCH_DATA_ERROR',
    //     			payload: error
    //     		);
    //     	})
    // };
    // REDUX PROMISE
    return {
    	type: 'FETCH_DATA',
    	payload: axios.get('./oliver-data.json')
    }
}