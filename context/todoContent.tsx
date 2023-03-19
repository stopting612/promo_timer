import { Actor } from '@next/font/google';
import { stat } from 'fs';
import React, { createContext } from 'react';

export interface Todo {
        
        id: number,
        todoTitle: string,
        cycle: number
        complete: boolean
        default: boolean
        count: number
}

export interface TodoAction {
        
        id?: number,
        todoTitle: string,
        cycle: number
        complete?: boolean
        default?: boolean
        count?: number
}



export interface StateType {
        todoLists: Todo[]
        
}

export const initState: any = {
        todoLists: []
};
export type Action = 
| { type: 'ADD', payload: TodoAction  }
| { type: 'DELETE', payload: TodoAction }
| { type: 'UPDATE', payload: TodoAction }
| { type: 'TOGGLE', payload: TodoAction }
| { type: 'TOGGLE_DEFAULT', payload: TodoAction }
| { type: 'ADD_COUNT', payload: TodoAction }

function addTask (todo: TodoAction){
        return {
          id: Math.floor(Math.random() * 1000),
          todoTitle: todo.todoTitle,
          cycle: todo.cycle,
          complete: false,
          default: false,
          count: 0
        }
}


export function todoReducer(state: StateType, action: Action){
       const {id, todoTitle, cycle, count} = action.payload
       let todoLists = state.todoLists
        switch(action.type){
                case 'ADD':
                        const newTodo = addTask(action.payload);
             
                        return {
                          todoLists: [
                                ...todoLists,
                                newTodo
                          ]
                        }
                
                case 'UPDATE':
                        return {
                                todoLists: todoLists.map((todo) => {
                                        if(todo.id === id){
                                                return {
                                                        default: todo.default,
                                                        todoTitle: todoTitle,
                                                        cycle: cycle,
                                                        count: count,
                                                        complete: todo.complete
                                                }
                                        }
                                        return todo
                                })
                        }
                case 'TOGGLE':
                return {
                        todoLists: todoLists.map((todo) => {
                                if(todo.id === id){
                                        return {
                                                ...todo,
                                                complete: !todo.complete
                                        }
                                }
                                return todo
                                
                        })
                }
                case 'TOGGLE_DEFAULT':
                return {
                        todoLists: todoLists.map((todo) => {
                                if(todo.id === id){
                                        return {
                                                ...todo,
                                                default: true
                                        }
                                }else {
                                        return {
                                                ...todo,
                                                default: false
                                        }
                                }
                                return todo
                                
                        })
                }
                case 'DELETE':
                        console.log('delete')
                        return {
                                todoLists: todoLists.filter((todo) => {
                                        return todo.id !== id 
                                })
                        }
                case 'ADD_COUNT':
                return {
                        todoLists: todoLists.map((todo) => {
                                if(todo.id === id){
                                        return {
                                                ...todo,
                                                count: todo.count + 1
                                        }
                                }
                                return todo
                                
                        })
                }
                default:
                        return state
        }
}

const TodoContext = React.createContext<{
        state: StateType;
        dispatch: React.Dispatch<Action>;
        }>({
            state: initState,
            dispatch: () => undefined,
        });
    
    export default TodoContext;
