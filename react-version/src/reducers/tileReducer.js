const tileReducer = (state = {
    isLoading: true,
    index: 0,
    increment: 24, // this.props.increment || 24,
    error: null
}, action) => {
    switch (action.type) {
        case "FETCH_DATA_FULFILLED":
            const initialIncrement = this.state.increment - 2;

            //temporary while videos don't work
            action.payload.feeds = action.payload.feeds.filter(tile => tile.type.toLowerCase() === "image");

            state = {
                ...state,
                data: action.payload.feeds,
                isLoading: false,
                revealedData: action.payload.feeds.slice(0, initialIncrement),
                index: ( state.index + initialIncrement )
            };
            break;
        case "FETCH_DATA_REJECTED":
            state = {
                ...state,
                data: null,
                isLoading: false,
                error: action.payload
            };
            break;
    }
    return state;
};

export default tileReducer;