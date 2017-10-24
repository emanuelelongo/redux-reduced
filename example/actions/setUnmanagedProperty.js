export default function setUnmanagedProperty(value) {
    return (dispatch, getState, setState) => {
        setState({
            foo: value,
        }, "SET_UNMANAGED_PROPERTY")
    }
}