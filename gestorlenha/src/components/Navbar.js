import React from 'react';
import {ax} from '../App';
import '../styles/Navbar.css'
import {Link} from 'react-router-dom'


export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            login: {}
        };
    }

    componentWillReceiveProps(props){
        this.setState({login: props.login});
    }

    logout(){
        this.props.update_login({});
    }

    render() {
        return ( 
            <div className = "Navbar" >
                <div className = "leftSide">
                    Gestor de Lenha
                </div>

                <div className = "rightSide">

                    <div>{ "username" in this.state.login && <Link to='/criarpedido'>Criar Pedido</Link>}</div>
                    <div>{ "username" in this.state.login && <Link to='/verpedidos'>Ver Pedidos</Link>}</div>
                    <div>{ !("username" in this.state.login) && <Link to='/criarutilizador'>Criar Utilizador</Link>}</div>
                    <div>{ !("username" in this.state.login) && <Link to='/login'>Login</Link>}</div>
                    <div>{ "username" in this.state.login && <Link to='#' onClick={ this.logout.bind(this) }>Logout</Link>}</div>

                    <div>{ this.state.login.username !== undefined && <p>Ola {this.state.login.username}</p> }</div>
                </div>
            </div>

        );

    }
}