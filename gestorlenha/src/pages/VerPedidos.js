import React from 'react';
import {ax} from '../App';
import {Redirect} from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default class VerPedidos extends React.Component  {
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

    btn_delete(pk){
        console.log('btn delete');
        this.state.pk = pk;

        confirmAlert({
            title: 'Delete Encomenda',
            message: 'Are you sure to do Delete?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    ax.put('/api/encomendas/' + this.state.pk + '/', 
                    {
                        headers: this.props.login.headers,
                        pk: this.state.pk,
                        estado: "deleted"
                    })
                    .then(r => {
                        this.setState({redirect:true});
                    })
                    .catch(e => {
                        console.log("Error confirm pedido: " + e);
                    })
                }
              },
              {
                label: 'No',
                onClick: () => {
                }
              }
            ]
          });
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
                            <th></th>
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
                                <td>
                                    { "new" === enc.estado && <button onClick={this.btn_delete.bind(this,enc.pk)}>Delete</button>}
                                </td>
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
