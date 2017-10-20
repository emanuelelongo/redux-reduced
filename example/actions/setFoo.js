export default function setFoo(value) {
    return (dispatch, getState, setState) => {
        setState({
            foo: value
        })
    }
}