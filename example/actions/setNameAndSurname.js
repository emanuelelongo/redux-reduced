export default function setNameAndSurname(name, surname) {
    return (dispatch, getState, setState) => {
        setState({contact: {
            name,
            surname
        }}, 'SET_NAME_AND_SURNAME')
    }
}
