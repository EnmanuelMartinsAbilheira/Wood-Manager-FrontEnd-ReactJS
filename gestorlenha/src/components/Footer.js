import React from 'react';
import ax from '../App';
import '../styles/Footer.css'

/*ax.get('/encomenda')
            .then(r => {
                console.log(r);
            })
            .catch(e => {
                console.log(e);
            })
            */

export default class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        return ( 
            <div className = "Footer" >
                Emanuel@2021
            </div>

        );

    }
}