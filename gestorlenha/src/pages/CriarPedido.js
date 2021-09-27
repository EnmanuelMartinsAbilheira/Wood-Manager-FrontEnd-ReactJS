import React from 'react';
import {ax} from '../App';

export default class CriarPedido extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'data_entrega' : '',
            'quantidade' : '0',
            'morada' : '',
            'preco_tonelada': '',
            'preco' : '0'
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

        if(field == 'quantidade'){
            this.setState( {preco : (parseFloat(evt.target.value) * parseFloat(this.state.preco_tonelada)) } )
        }
    }

    criarPedido(event){
        event.preventDefault();
        console.log(this.state.data_entrega);
        console.log(this.state.quantidade);
        console.log(this.state.morada_entrega);
    }

    render() {
        console.log(this.state.preco_tonelada);
        return ( 
            <div className = "CriarPedido" >
                <form>
                        <label>
                            <p>Data Entrega</p>
                            <input type="date" value={this.state.data_entrega} onChange={evt => this.updateInputValue(evt,'data_entrega')} />
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
            </div>

        );

    }
}