import React, { Component } from 'react';

class Cell extends Component {
    handleChange() {

    }

    render() {
        return (
            <input 
                type="checkbox" 
                checked={this.props.data}
                onChange={this.props.onClick}
            />
        )
    }
}

export default Cell;