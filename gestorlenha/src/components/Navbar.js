import React from 'react';
import ax from '../App';
import '../styles/Navbar.css'
import {Link} from 'react-router-dom'


/*ax.get('/encomenda')
            .then(r => {
                console.log(r);
            })
            .catch(e => {
                console.log(e);
            })
            */

export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            username: '', 
            type: ''
        };
    }

    render() {

        return ( 
            <div className = "Navbar" >
                <div className = "leftSide">
                    Gestor de Lenha
                </div>

                <div className = "rightSide">
                    <div>{ this.state.type === '' && <Link to='/login'>Login</Link>}</div>
                </div>
            </div>

        );

    }
}