import React, { Component } from 'react'
import styles from '../assets/Bar.module.css'

export default class Bar extends Component {
    render() {

        const barstyle = {
            backgroundColor: this.props.bar.color,
            width: this.props.bar.width,
            height: this.props.bar.height,
            alignSelf: 'flex-end',
            borderRadius: '10px 10px 0 0'
        }
        return (
            <div style={barstyle} className={styles.bar}>
               <h3>{this.props.bar.value}</h3>
            </div>
            );
            
    }
}
