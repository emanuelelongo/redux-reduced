export default function setComplexProperty(name, surname) {
    return (dispatch, getState, setState) => {
        setState({complexProperty: {
            name,
            surname
        }}, 'SET_COMPLEX_PROPERTY')
    }
}
