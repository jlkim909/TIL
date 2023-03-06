import create from 'zustand';
import { ITodo } from '../interface/todoList';

interface ITodoStore{
    laterList:ITodo[],
    addLaterTodoList:(todo:ITodo) => void,
    addAllLaterTodoList:(todoList:ITodo[]) => void,
    editLaterTodo:(idx:number, todo:ITodo) => void,
    deleteLaterTodo:(idx:number) => void,
    selectedIndex:number | null,
    setSelectedIndex:(idx:number | null) => void,
    // changeDay:(idx:number) => void_
}

const useTodoLater = create<ITodoStore>((set) => ({
    selectedIndex:null,
    setSelectedIndex:(idx:number | null) => {
        set({
            selectedIndex:idx
        })
    },
    laterList:JSON.parse(localStorage.getItem("laterList") ?? "[]"),

    addLaterTodoList:(todo:ITodo) => {
        set(prev => {
            const laterList = [...prev.laterList, todo];
            localStorage.setItem("laterList", JSON.stringify(laterList));
            return {
                laterList
            }
        })
    },

    addAllLaterTodoList:(todoList:ITodo[]) => {
        set(prev => {
            const laterList = [...prev.laterList, ...todoList];
            localStorage.setItem("laterList", JSON.stringify(laterList));
            return {
                laterList
            }
        })
    },
    editLaterTodo:(idx:number, todo:ITodo) => {
        set(({laterList}) => {
            laterList[idx]=todo;
            localStorage.setItem("laterList", JSON.stringify(laterList));
            return {
                laterList
            }
        })
    },
    deleteLaterTodo:(idx:number) => {
        set(({laterList}) => {
            laterList=laterList.filter(todo => todo !== laterList[idx]);
            localStorage.setItem("laterList", JSON.stringify(laterList));
            return{
                laterList
            }
        })
    }
}))

export default useTodoLater;