import React from 'react';
import {ax} from '../App';
import {Redirect} from "react-router-dom";

export default class VerPedidos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'redirect' : false,
            'encomendas': []
        };
        this.getPedidos();
    }

    getPedidos(){
        ax.get(
            '/api/encomendas/?cliente=' + this.props.login.pk, 
            {headers: this.props.login.headers})
        .then(r => {
            this.setState({encomendas : (r.data)});
        })
        .catch(e => {
            console.log("getPedidos Error!");
        })
    }
    componentWillReceiveProps(props){
        this.setState({login: props.login});
    }

    VerPedidos(event){
        event.preventDefault();
    }

    render() {
        console.log(this.state.encomendas);
        return ( 
            <div className = "VerPedidos" >
                <table align="center">
                    <thead>
                        <tr>
                            <th>Estado</th>
                            <th>Data</th>
                            <th>Morada Entrega</th>
                            <th>Preco</th>
                            <th>Quantidade</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.encomendas.map((enc, i) => {        
                        return (
                            <tr>
                                <td>{enc.estado}</td>
                                <td>{enc.data_entrega}</td>
                                <td>{enc.morada_entrega}</td>
                                <td>{enc.preco}</td>
                                <td>{enc.quantidade}</td>
                            </tr>
                        ) 
                    })}
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    { this.state.redirect === true && <Redirect to='/'></Redirect>}
                </div>

            </div>

        );

    }
}