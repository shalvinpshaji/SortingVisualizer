import React, { Component } from 'react'

export default class Dropdown extends Component {
    constructor(props){
        super(props)
        this.state = {value: 'bubble'}

        this.handleChange = this.handleChange.bind(this)
    }
 handleChange(e){
    this.setState({value: e.target.value})
    }
    render() {
        return (
            <div>
                <select name="method" id="methos" value={this.state.value} onChange={this.handleChange}>
                    <option value="bubble">Bubble sort</option>
                    <option value="merge">Merge Sort</option>
                    <option value="selection">Selection Sort</option>
                </select>
            </div>
        )
    }
}
