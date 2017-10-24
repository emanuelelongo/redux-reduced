export default function setSimpleProperty(value) {
    return (dispatch, getState, setState) => {
        setState({
            simpleProperty: value
        }, 'SET_SIMPLE_PROPERTY')
    }
}
