import React from 'react'
import { wrapAction } from 'redux-reduced'
import { connect } from '../store'
import { 
    setSimpleProperty,
    setUnmanagedProperty,
    setMultipleProperties,
    increment,
    decrement
} from '../actions'

class App extends React.Component {

    renderStyle() {
        return (
            <style>{"\
                body { font-family: Helvetica, Arial, Sans-Serif }\
                .box{ border:1px solid gray; width: 400px; padding: 30px; }\
                button { float: right; font-size:14px; font-weight: bold }\
            "}</style>
        )
    }

    simplePropertyExample() {
        return (
            <div className="box">
                <h3> Simple property example</h3>
                Value: {this.props.simple}<br/>
                <button onClick={() => this.props.setSimpleProperty("Hello!")}>SET</button>
            </div>
        )
    }

    unmanagedPropertyExample() {
        return (
            <div className="box">
                <h3>Unmanaged property example</h3>
                Foo: {this.props.foo}<br/>
                <br />
                <button onClick={() => this.props.setUnmanagedProperty("bar")}>SET</button>
            </div>
        )
    }

    multiplePropertiesExample() {
        return (
            <div className="box">
                <h3>Multiple properties example</h3>
                <button onClick={() => this.props.setMultipleProperties()}>CLEAR</button>
            </div>
        )
    }

    oldStandardReducerExample() {
        return (
            <div className="box">
                <h3>Old standard reducer example</h3>
                Counter: { this.props.counter }
                <button onClick={() => this.props.increment(1)}>+</button>
                <button onClick={() => this.props.decrement(1)}>-</button>
            </div>
        )
    }

    render() {
        return (
            <div>
                { this.renderStyle() }
                { this.simplePropertyExample() }
                <br/>
                { this.unmanagedPropertyExample()}
                <br/>
                { this.multiplePropertiesExample()}
                <br/>
                { this.oldStandardReducerExample()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        simple: state.simpleProperty,
        foo: state.global.foo,
        counter: state.oldStandardReducer.counter
    }
}

export default connect(mapStateToProps, { setSimpleProperty, setUnmanagedProperty, setMultipleProperties, increment, decrement })(App)
