import React from 'react';
import {ax} from '../App';

export default class NotFound extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        return ( 
            <div className = "NotFound" >
            <b> NotFound! </b> 
            </div>

        );

    }
}