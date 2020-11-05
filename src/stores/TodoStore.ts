import { observable, action, computed, reaction, flow } from "mobx";
import { createContext } from "react";
import { v4 as uuidv4 } from "uuid";

export interface Todo {
  id?: string;
  title: string;
  completed: boolean;
}

class TodoStore {
  constructor() {
    this.fetchApi = this.fetchApi.bind(this);
    reaction(
      () => this.todos,
      (_) => console.log(this.todos.length)
    );
  }

  @observable todos: Todo[] = [
    { id: uuidv4(), title: "Item #1", completed: false },
    { id: uuidv4(), title: "Item #2", completed: false },
    { id: uuidv4(), title: "Item #3", completed: false },
    { id: uuidv4(), title: "Item #4", completed: false },
    { id: uuidv4(), title: "Item #5", completed: true },
    { id: uuidv4(), title: "Item #6", completed: false },
  ];

  @observable test1: string = "eee";
  @observable test2: string = "ccc";

  @action addTodo = (todo: Todo) => {
    this.todos.push({ ...todo, id: uuidv4() });
  };

  @action toggleTodo = (id: string) => {
    this.todos = this.todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    });
  };

  /**
   * 1. console.log 1 찍힘
   * 2. console.log res 찍힘
   * 3. res가 ok라면 toggleTodo 함수 실행됨
   */

  fetchApi = flow(function* (id: string) {
    console.log(1);
    const newapis = function (params: boolean) {
      return new Promise((res) => {
        window.setTimeout(function () {
          if (params) {
            res("ok");
          } else {
            res("error");
          }
        }, 3000);
      });
    };
    try {
      const res = yield newapis(true);
      if (res === "ok") {
        this.toggleTodo(id);
      }
    } catch (e) {
      console.log(e.message);
    }
  });

  // fetchApi = (params: boolean) => {
  //   return new Promise((res) => {
  //     window.setTimeout(function () {
  //       console.log(222);
  //       if (params) {
  //         res("ok");
  //       } else {
  //         res("error");
  //       }
  //     }, 1000);
  //   });
  // };

  // @action toggleTodo = async (id: string) => {
  //   const res = await this.fetchApi(true);
  //   runInAction(() => {
  //     console.log(res);
  //     this.todos = this.todos.map((todo) => {
  //       if (todo.id === id) {
  //         return {
  //           ...todo,
  //           completed: !todo.completed,
  //         };
  //       }
  //       return todo;
  //     });
  //   });
  // };

  @action removeTodo = (id: string) => {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  };

  @computed get info() {
    return {
      total: this.todos.length,
      completed: this.todos.filter((todo) => todo.completed).length,
      notCompleted: this.todos.filter((todo) => !todo.completed).length,
    };
  }
}

export default createContext(new TodoStore());
