import React from 'react';
import {ax} from '../App';
import {Redirect} from "react-router-dom";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '', 
            password: '',
            redirect: false
        };
    }

    login(event){
        event.preventDefault();

        ax.post('/login/', {
            username: this.state.username,
            password : this.state.password
        })
        .then(r => {
            
            ax.get('/api/current_user/',{headers:{'Authorization': 'JWT ' + r.data.token}})
            .then(u => {

                this.props.update_login({
                    username: u.data.username,
                    email: u.data.email,
                    groups: u.data.groups,
                    headers: {'Authorization': 'JWT ' + r.data.token}
                })
                this.setState({redirect: true});
            })
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

    render() {

        return ( 
            <div className = "Login" >
                <h1>Please Log In</h1>
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
                <div>
                    { this.state.redirect === true && <Redirect to='/'></Redirect>}
                </div>
            </div>
        );

    }
}