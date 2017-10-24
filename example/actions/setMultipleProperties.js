export default function setMultipleProperties() {
    return (dispatch, getState, setState) => {
        setState({
            simpleProperty: "-",
            complexProperty: {
                name: '-',
                surname: '-'
            },
            foo: '-',
        }, "SET_MULTIPLE_PROPERTIES")
    }
}