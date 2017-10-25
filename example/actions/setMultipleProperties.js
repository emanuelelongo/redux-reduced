export default function setMultipleProperties() {
    return (dispatch, getState, setState) => {
        setState({
            simpleProperty: "-",
            foo: '-',
        }, "SET_MULTIPLE_PROPERTIES")
    }
}