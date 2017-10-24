export default function(value) {
    return (dispatch) => {
        dispatch({
            type: 'DECREMENT',
            payload: value
        })
    }
}
