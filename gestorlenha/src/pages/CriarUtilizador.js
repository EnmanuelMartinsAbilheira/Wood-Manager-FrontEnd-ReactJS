import React from 'react';
import {ax} from '../App';
import {Redirect} from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default class CriarUtilizador extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '', 
            password: '',
            password2: '',
            redirect: false
        };
    }

    fast_error(msg){
        confirmAlert({
            title:  'Erro',
            message: msg,
            buttons: [
              {
                label: 'Ok',
                onClick: () => {
                }
              }
            ]
          });
    }

    CriarUtilizador(event){
        event.preventDefault();

        if(this.state.password !== this.state.password2){
            this.fast_error("Passwords diferentes");
            return;
        }
        
        if(this.state.password.length < 5){
            this.fast_error("Password tem que ter um minimo de 5 caracteres");
            return;
        }

        ax.post('/api/users/', {
            username: this.state.username,
            password : this.state.password
        })
        .then(r => {
            this.setState({redirect: true});
        })
        .catch(err => {
            this.fast_error(JSON.stringify(err.response.data));
        })
    }

    username_updateInputValue(evt) {
        this.setState({
          username: evt.target.value
        });
      }
    
    password_updateInputValue(evt) {
        this.setState({
          password: evt.target.value
        });
      }

    password2_updateInputValue(evt) {
        this.setState({
          password2: evt.target.value
        });
      }

    render() {

        return ( 
            <div className = "CriarUtilizador" >
                <h1>Create User</h1>
                <form>
                    <label>
                    <p>Username</p>
                    <input type="text" value={this.state.username} onChange={evt => this.username_updateInputValue(evt)} />
                    </label>
                    <label>
                    <p>Password</p>
                    <input type="password" value={this.state.password} onChange={evt => this.password_updateInputValue(evt)} />
                    </label>
                    <label>
                    <p>Confirm Password</p>
                    <input type="password" value={this.state.password2} onChange={evt => this.password2_updateInputValue(evt)} />
                    </label>
                    <div>
                    <button type="submit" onClick={this.CriarUtilizador.bind(this)}>Submit</button>
                    </div>
                </form>
                <div>
                    { this.state.redirect === true && <Redirect to='/login'></Redirect>}
                </div>
            </div>
        );

    }
}