import React, { Component } from 'react'
import AddTodo from './AddTodo.js';
import request from 'superagent';

export default class TodoApp extends Component {
    state = { todos: [] }
    componentDidMount = async() => {
        const todos = await request.get('https://aqueous-anchorag-todo.herokuapp.com/api/todos')

        console.log(todos.body)
        this.setState({ todos: todos.body })
    }

    handleClick = async () => {
        const newTodo = {
            // math.random() is fine here because this is a fake todo
            id: Math.random(),
            task: this.state.todoInput,
            complete: false,
        };

        const newTodos = [...this.state.todos, newTodo];

        this.setState({ todos: newTodos });
        const data = await request.post('https://aqueous-anchorag-todo.herokuapp.com/api/todos', {
            task: this.state.todoInput
        });
    }
    handleDelete = async (id) => {
        await request.delete(`https://aqueous-anchorag-todo.herokuapp.com/api/todos/${id}`);
        const todos = await request.get('https://aqueous-anchorag-todo.herokuapp.com/api/todos')

        console.log(todos.body)
        this.setState({ todos: todos.body })

        // this.props.history.push('/');
    }

    // handleDelete = async () => {
    //     const deleteTodo = {
    //         // math.random() is fine here because this is a fake todo
    //         id: Math.random(),
    //         complete: true,
    //     };

    //     const deleteTodos = [...this.state.todos, deleteTodo];

    //     this.setState({ todos: deleteTodos });
    //     const data = await request.delete('https://aqueous-anchorag-todo.herokuapp.com/api/todos', {
    //         task: this.state.todoDelete
    //     });
    // }

    handleInput = (e) => { this.setState({ todoInput: e.target.value })};
    
    render() {
        return (
            <div>
                <AddTodo 
                todoInput={ this.state.todoInput } 
                handleClick={ this.handleClick } 
                handleInput={ this.handleInput } 
                />
                {
                    this.state.todos.map((todo) => <p 
                        style={{
                            textDecoration: todo.complete ? 'line-through' : 'none'
                        }}
                        onClick={async () => {
                            // lets mutate! make a copy of the array in state
                        const newTodos = this.state.todos.slice();
                            // go find whichever todo we're talking about here
                        const matchingTodo = newTodos.find((thisTodo) => todo.id === thisTodo.id);

                        matchingTodo.complete = !todo.complete
                                 
                        this.setState({ todos: newTodos });
                        const data = await request.put(`https://aqueous-anchorag-todo.herokuapp.com/api/todos/${todo.id}`, matchingTodo);
                    }} key={todo.id}>
                        {todo.task}
                        <button class='skull' onClick={ () => this.handleDelete(todo.id) } >✖</button>
                    </p>)
                }
            </div>
        )
    }
}
