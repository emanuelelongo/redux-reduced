import React from 'react'
import { wrapAction } from 'redux-reduced'
import { connect } from '../store'
import { setNameAndSurname, setFoo } from '../actions'

class App extends React.Component {

    renderStyle() {
        return (
            <style>{"\
                .section{\
                    border:1px solid gray;\
                    width: 400px;\
                    padding: 10px;\
                }\
            "}</style>
        )
    }

    renderCurrentState() {
        return (
            <div className="section">
                <h3>Current state</h3>
                Name: {this.props.contact.name}<br/>
                Surname: {this.props.contact.surname}<br/>
            </div>
        )
    }

    renderNameSurname() {
        return (
            <div className="section">
                <h3>Set values</h3>
                Name <br/>
                <input type="text" ref={i => this.nameInput = i } /><br />
                Surname <br/>
                <input type="text" ref={i => this.surnameInput = i } /><br/>
                <button onClick={() => this.props.setNameAndSurname(this.nameInput.value, this.surnameInput.value)}>SET</button>
            </div>
        )
    }

    renderUnsupported() {
        return (
            <div className="section">
                <b>Note</b> <br/>
                <i>At the moment you can't set a state property not yet initialized by reducers</i>
                <br />
                <br />
                <i>So, for example this has no effetcs</i><br/>
                <br/>
                Foo: {this.props.foo || 'undefined'}<br/>
                <button onClick={() => this.props.setFoo('bar')}>Bar</button>
            </div>
        )
    }

    render() {
        return (
            <div>
                { this.renderStyle() }
                { this.renderCurrentState() }
                <br/>
                { this.renderNameSurname() }
                <br/>
                { this.renderUnsupported()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        contact: state.contact,
        foo: state.foo
    }
}

export default connect(mapStateToProps, { setNameAndSurname, setFoo })(App)
