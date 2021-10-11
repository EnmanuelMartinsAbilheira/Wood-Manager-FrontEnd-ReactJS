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

        if("groups" in this.props.login && this.props.login.groups.includes('admin') === true){
            this.getPedidos('');
        }else{
            this.getPedidos('?cliente=' + this.props.login.pk + "&is_deleted=False");
        }
    }

    getPedidos(filter){
        ax.get(
            '/api/encomendas/' + filter, 
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

    btn_set_is_deleted(pk, estado){
        console.log('btn delete');
        this.state.pk = pk;

        confirmAlert({
            title:  estado === "True" ? 'Delete Encomenda' : 'Restore Encomenda',
            message: estado === "True" ? 'Are you sure to do Delete?' : 'Are you sure you want to restore?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    ax.put('/api/encomendas/' + this.state.pk + '/', 
                    {
                        headers: this.props.login.headers,
                        pk: this.state.pk,
                        is_deleted: estado
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
        console.log("groups = " + JSON.stringify(this.props.login.groups));
        //console.log("groups check = " + 'http://localhost:8000/api/groups/1/' in this.props.login.groups);
        return ( 
            <div className = "VerPedidos" >
                <table align="center">
                    <thead>
                        <tr>
                            {"groups" in this.props.login && this.props.login.groups.includes('admin') === true && <th>User</th> }
                            <th>Estado</th>
                            <th>Data</th>
                            <th>Morada Entrega</th>
                            <th>Preco</th>
                            <th>Quantidade</th>
                            <th>Cancelado?</th>
                            <th>Ações</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.encomendas.map((enc, i) => {        
                        return (
                            <tr>
                                {"groups" in this.props.login && this.props.login.groups.includes('admin') === true && <td>{enc.username}</td> }
                                <td>{enc.estado}</td>
                                <td>{enc.data_entrega}</td>
                                <td>{enc.morada_entrega}</td>
                                <td>{enc.preco}</td>
                                <td>{enc.quantidade}</td>
                                {enc.is_deleted === true ? <td> Sim </td> : <td> Nao </td>}
                                <td>
                                    
                                    {enc.is_deleted === false ? <button onClick={this.btn_set_is_deleted.bind(this,enc.pk,"True")}>Cancelar</button> : <td> <button onClick={this.btn_set_is_deleted.bind(this,enc.pk,"False")}>Restaurar</button> </td>}
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
