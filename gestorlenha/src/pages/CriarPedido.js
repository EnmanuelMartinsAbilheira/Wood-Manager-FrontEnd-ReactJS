import React from 'react';
import {ax} from '../App';
import {Redirect} from "react-router-dom";

export default class CriarPedido extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'data_entrega' : '',
            'quantidade' : '0',
            'morada' : '',
            'preco_tonelada': '',
            'preco' : '0',
            'redirect' : false
        };
        this.update_preco_tonelada();
    }

    update_preco_tonelada(){
        ax.get('/api/config', {headers: this.props.login.headers})
        .then(r => {
            
            this.setState({preco_tonelada : (r.data[0].preco_tonelada)});
        })
        .catch(e => {
            console.log("update_preco_tonelada!");
        })
    }

    componentWillReceiveProps(props){
        this.setState({login: props.login});
    }

    updateInputValue(evt, field){
        this.setState( {[field]: evt.target.value} ) ;

        if(field === 'quantidade'){
            this.setState( {preco : (parseFloat(evt.target.value) * parseFloat(this.state.preco_tonelada)) } )
        }
    }

    criarPedido(event){
        event.preventDefault();
        
        ax.post('/api/encomendas/', {
                headers: this.props.login.headers,
                data_entrega: this.state.data_entrega,
                quantidade: this.state.quantidade,
                cliente: this.props.login.url,
                preco: this.state.preco,
                morada_entrega: this.state.morada_entrega,
                estado: "new"
            })
        .then(r => {
            this.setState({redirect:true});
        })
        .catch(e => {
            console.log("Error criarPedido: " + e);
        })
    }

    render() {
        
        return ( 
            <div className = "CriarPedido" >
                <form>
                        <label>
                            <p>Data Entrega</p>
                            <input type="date" value={this.state.data_entrega} placeholder="yyyy-mm-dd" onChange={evt => this.updateInputValue(evt,'data_entrega')} />
                        </label>
                        <label>
                            <p>Quantidade</p>
                            <input type="number" min='0' value={this.state.quantidade} onChange={evt => this.updateInputValue(evt,'quantidade')} />
                        </label>
                        <label>
                            <p>Preço por tonelada</p>
                            <input type="number" value={this.state.preco_tonelada} readonly/>
                        </label>
                        <label>
                            <p>Morada de Entrega</p>
                            <input type="text" value={this.state.morada_entrega} onChange={evt => this.updateInputValue(evt,'morada_entrega')} />
                        </label>
                        <label>
                            <p>Preço Total</p>
                            <input type="number" value={this.state.preco} readonly/>
                        </label>
                        <div>
                            <button type="submit" onClick={this.criarPedido.bind(this)}>Submit</button>
                        </div>
                </form>

                <div>
                    { this.state.redirect === true && <Redirect to='/'></Redirect>}
                </div>

            </div>

        );

    }
}