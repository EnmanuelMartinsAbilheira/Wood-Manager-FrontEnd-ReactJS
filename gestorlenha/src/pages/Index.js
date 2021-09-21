import React from 'react';
import ax from '../App';

/*ax.get('/encomenda')
            .then(r => {
                console.log(r);
            })
            .catch(e => {
                console.log(e);
            })
            */

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        return ( <
            div className = "Index" >
            <
            b > Index! < /b> <
            /div>

        );

    }
}