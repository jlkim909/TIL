import create from 'zustand';
import { ITodo } from '../interface/todoList';

interface ITodoStore{
    todoList:ITodo[],
    addTodoList:(todo:ITodo) => void,
    editTodo:(idx:number, todo:ITodo) => void,
    deleteTodo:(idx:number) => void,
    deleteAllTodo:() => void,
    selectedIndex:number | null,
    setSelectedIndex:(idx:number | null) => void,
    changeList:(newTodoList:ITodo[]) => void
}

const useTodo = create<ITodoStore>((set) => ({
    selectedIndex:null,
    setSelectedIndex:(idx:number | null) => {
        set({
            selectedIndex:idx
        })
    },
    todoList:JSON.parse(localStorage.getItem("todoList") ?? "[]"),
    changeList:(newTodoList:ITodo[]) => {
        set(({todoList}) => {
            todoList=newTodoList;
            localStorage.setItem("todoList", JSON.stringify(todoList));
            return{
                todoList
            }
        })
    },
    addTodoList:(todo:ITodo) => {
        set(prev => {
            const todoList = [...prev.todoList, todo];
            localStorage.setItem("todoList", JSON.stringify(todoList));
            return {
                todoList
            }
        })
    },
    editTodo:(idx:number, todo:ITodo) => {
        set(({todoList}) => {
            todoList[idx]=todo;
            localStorage.setItem("todoList", JSON.stringify(todoList));
            return {
                todoList
            }
        })
    },
    deleteTodo:(idx:number) => {
        set(({todoList}) => {
            todoList=todoList.filter(todo => todo !== todoList[idx]);
            localStorage.setItem("todoList", JSON.stringify(todoList));
            return{
                todoList
            }
        })
    },
    deleteAllTodo:() => {
        set(({todoList}) => {
            todoList=[];
            localStorage.setItem("todoList", JSON.stringify(todoList));
            return{
                todoList
            }
        })
    }
}))

export default useTodo;