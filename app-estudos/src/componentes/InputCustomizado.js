import React, { Component } from 'react';

class InputCustomizado extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div className="pure-control-group">
                <label htmlFor={this.props.nome}>{this.props.label}</label>
                <input id={this.props.id} type={this.props.type} name={this.props.name} value={this.props.value} onChange={this.props.onchange} />
            </div>
        )
    }

}

export default InputCustomizado;