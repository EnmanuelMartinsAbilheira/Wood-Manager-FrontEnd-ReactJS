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

export default class CriarPedido extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillReceiveProps(props){
        this.setState({login: props.login});
    }

    render() {

        return ( 
            <div className = "CriarPedido" >
                <form>
                        <label>
                        <p>Username</p>
                        <input type="text" value={this.state.username} onChange={evt => this.username_updateInputValue(evt)} />
                        </label>
                        <label>
                        <p>Password</p>
                        <input type="password" value={this.state.password} onChange={evt => this.password_updateInputValue(evt)} />
                        </label>
                        <div>
                        <button type="submit" onClick={this.login.bind(this)}>Submit</button>
                        </div>
                </form>
            </div>

        );

    }
}