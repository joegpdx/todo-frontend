import React, { Component } from 'react'
import AddTodo from './AddTodo.js';
import request from 'superagent';

export default class TodoApp extends Component {
    state = { todos: [] }
    componentDidMount = async() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const todos = await request.get('https://aqueous-anchorag-todo.herokuapp.com/api/todos')
            .set('Authorization', user.token);

        console.log(todos.body)
        this.setState({ todos: todos.body })
    }

    handleClick = async () => {
        // const newTodo = {
        //     // math.random() is fine here because this is a fake todo
        //     id: Math.random(),
        //     task: this.state.todoInput,
        //     complete: false,
        // };

        const user = JSON.parse(localStorage.getItem('user'));

        // const newTodos = [...this.state.todos, newTodo];

        // this.setState({ todos: newTodos });
        const data = await request.post('https://aqueous-anchorag-todo.herokuapp.com/api/todos', {  
            task: this.state.todoInput
        })
            .set('Authorization', user.token);
        const todos = await request.get('https://aqueous-anchorag-todo.herokuapp.com/api/todos')
            .set('Authorization', user.token);

        console.log(todos.body)
        this.setState({ todos: todos.body })
    }
    handleDelete = async (id) => {
        const user = JSON.parse(localStorage.getItem('user'));

        await request.delete(`https://aqueous-anchorag-todo.herokuapp.com/api/todos/${id}`)
            .set('Authorization', user.token);
        const todos = await request.get('https://aqueous-anchorag-todo.herokuapp.com/api/todos')
            .set('Authorization', user.token);
        console.log(todos.body)
        this.setState({ todos: todos.body })

        // .set('Authorization', user.token);

        // this.props.history.push('/');
    }

    handleLogout = () => {
        alert('you are now logged out');
        localStorage.clear();
        window.location = ('/');
    }

    handleInput = (e) => { this.setState({ todoInput: e.target.value })};
    
    render() {
        if (localStorage.getItem('user')) {
        return (
            <div>
                <h3>Hello {JSON.parse(localStorage.getItem('user')).email}</h3>
                <button className='signOut' onClick={this.handleLogout} >LOGOUT</button>
                <AddTodo 
                todoInput={ this.state.todoInput } 
                handleClick={ this.handleClick } 
                handleInput={ this.handleInput } 
                handleLogout={ this.handleLogout }
                />
                {
                    this.state.todos.map((todo) => <div className='inline'>
                        <p 
                        style={{
                            textDecoration: todo.complete ? 'line-through' : 'none'
                        }}
                        onClick={async () => {
                            // lets mutate! make a copy of the array in state
                        const newTodos = this.state.todos.slice();
                            // go find whichever todo we're talking about here
                        const matchingTodo = newTodos.find((thisTodo) => todo.id === thisTodo.id);

                        matchingTodo.complete = !todo.complete
                        const user = JSON.parse(localStorage.getItem('user'));
                                 
                        this.setState({ todos: newTodos });
                        const data = await request.put(`https://aqueous-anchorag-todo.herokuapp.com/api/todos/${todo.id}`, matchingTodo)
                        .set('Authorization', user.token);
                    }} key={todo.id}>
                        {todo.task}
                    </p>
                    <button className='skull' onClick={ () => this.handleDelete(todo.id) } >✖</button>
                        </div>)
                }
            </div>
            )
        }
    }
}