import React from 'react';
import ax from '../App';
import '../styles/Navbar.css'

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
        this.state = {};
    }

    render() {

        return ( 
            <div className = "Navbar" >
                <div className = "leftSide">
                    Gestor de Lenha
                </div>

                <div className = "rightSide">
                    Opcoes
                </div>
            </div>

        );

    }
}