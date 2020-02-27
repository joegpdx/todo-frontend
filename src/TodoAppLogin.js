import React, { Component } from 'react'
import request from 'superagent';

export default class TodoAppLogin extends Component {
    state = {
        usernameSignIn: '',
        usernameSignUp: '',
        passwordSignIn: '',
        passwordSignUp: '',
    }

    handleSignIn = async () => {
        const signIn = await request.post(`https://aqueous-anchorag-todo.herokuapp.com/api/auth/signin`, {
            email: this.state.usernameSignIn,
            password: this.state.passwordSignIn,
        })

        localStorage.setItem('user', JSON.stringify(signIn.body));

        this.props.history.push('/')

    }

    handleSignUp = async () => {
        const signUp = await request.post(`https://aqueous-anchorag-todo.herokuapp.com/api/auth/signup`, {
            email: this.state.usernameSignUp,
            password: this.state.passwordSignUp,
        })

        localStorage.setItem('user', JSON.stringify(signUp.body));

        this.props.history.push('/')
    }

    render() {
        return (
            <div className='login'>
                User Name:<input value={ this.state.usernameSignUp} onChange={(e) => this.setState({ usernameSignUp: e.target.value})} />Password:
                <input type="password" value={ this.state.passwordSignUp} onChange={(e) => this.setState({ passwordSignUp: e.target.value})} />

                <button id='add-todo' onClick={ this.handleSignUp }>Sign Up</button>  
                <br/>
                User Name:<input value={ this.state.usernameSignIn} onChange={(e) => this.setState({ usernameSignIn: e.target.value})} />Password:
                <input type="password" value={ this.state.passwordSignIn} onChange={(e) => this.setState({ passwordSignIn: e.target.value})} />

                <button id='add-todo' onClick={this.handleSignIn}>Sign In</button>     
            </div>
        )
    }
}
