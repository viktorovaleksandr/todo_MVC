class TodosModel {
	constructor() {
		this.todos = [];
	}

	async getTodos() {
     	return fetch('https://jsonplaceholder.typicode.com/todos')
      		.then((response) => response.json())
      		.then((todos) => this.todos = todos);
   }

   async postNewTodo(newTodo) {
   	return fetch('https://jsonplaceholder.typicode.com/todos', {
  		method: 'POST',
  		body: JSON.stringify(newTodo),
  		headers: {
    			'Content-type': 'application/json; charset=UTF-8',
  		},
		})
  		.then((response) => response.json())
  		.then(newTodo => {
			this.todos = [newTodo,...this.todos];
			return newTodo;
		});
	}

   async toggleTodoCompleted(id) {
   	const todo = this.todos.find(todo => todo.id === id );
		if (todo.id === id) todo.completed = !todo.completed;

   	return fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
  		method: 'PUT',
  		body: JSON.stringify(todo),
  		headers: {
    			'Content-type': 'application/json; charset=UTF-8',
  		},
		})
  		.then((response) => response.json())
  		.then((toggleTodo) => {
  			this.todos = this.todos.map(todo => {
  				if(todo.id !== id) {
  					return todo;
  				}
  				return toggleTodo;
  			})
  		});
   }

   async deleteTodo(id,todoItem) {
   	return fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      	method: 'DELETE',
   	})
	.then(() => {
		todoItem.remove();
		this.todos = this.todos.filter(todo => todo.id !== id);
	});
   }
}
