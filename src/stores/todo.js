import { defineStore } from "pinia";
import axios from "@/helpers/axios";
import { toast } from "vue-sonner";

export const useTodoStore = defineStore("todos", {
  state: () => ({
    todos: [],
    isLoading: true,
  }),
  actions: {
    async fetchTodos() {
      try {
        const response = await axios.get("users/todos");
        this.todos = response.data;
        this.isLoading = false;
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    },
    async addTodo(newTodo) {
      if (!newTodo) {
        toast.error("Error", {
          description: "Todo Name Required",
        });
        return;
      }
      const storeThis = this;
      await axios
        .post("/users/todos/create", {
          Name: newTodo,
        })
        .then(function (response) {
          storeThis.todos.push(response.data.todo);
        })
        .catch(function (error) {
          console.log(error);
          toast.error("Error", {
            description: "Something Went Wrong",
          });
        });
    },
    async updateStatus(id, status) {
      var errored = false;
      await axios
        .post("users/todos/update-status", {
          Status: status,
          Id: id,
        })
        .then(
          (this.todos = this.todos.map((todo) =>
            todo.ID === id ? { ...todo, Status: status } : todo
          ))
        )
        .catch(function (err) {
          errored = true;
          toast.error("Something went wrong");
        });

      return errored;
    },
    async deleteTodo(id) {
      const storeThis = this;

      await axios
        .delete(`users/todos/${id}/delete`)
        .then(function () {
          storeThis.todos = storeThis.todos.filter((todo) => todo.ID !== id);
        })
        .catch(function (err) {
          toast.error("Something went wrong");
        });
    },
  },
});
