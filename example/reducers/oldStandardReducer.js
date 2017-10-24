const INITIAL_STATE = { counter: 0 }

export default function (state = INITIAL_STATE, action) {
    switch(action.type) {
        case "INCREMENT": 
            return {
                counter: state.counter + action.payload
            }
        case "DECREMENT": 
            return {
                counter: state.counter - action.payload
            } 
        default: 
            return state
    }
}
