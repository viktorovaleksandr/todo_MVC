class TodosModel {
	constructor() {
		this.todos = [];
	}

	async getTodos() {
     	return fetch('https://jsonplaceholder.typicode.com/todos')
      .then((response) => response.json())
      .then((todos) => this.todos = todos);
   }

   async sendPostTodoRequest(newTodo) {
   	return fetch('https://jsonplaceholder.typicode.com/todos', {
  			method: 'POST',
  			body: JSON.stringify(newTodo),
  			headers: {
    			'Content-type': 'application/json; charset=UTF-8',
  			},
		})
  		.then((response) => response.json())
  		.then(newTodo => {
			this.todos = [...this.todos,newTodo];
			return newTodo;
		});
	}


   async toggleCompleted(id) {
   	const todo = this.todos.find(todo => todo.id === id );
   	const toggleTodo = {
   		...todo,
   		completed: !todo.completed
   	};

   	return fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
  			method: 'PUT',
  			body: JSON.stringify(toggleTodo),
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
  		})
   }

   async sendDeleteTodoRequest(id) {
   	return fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'DELETE',
   	})
		.then(() => {
			const $todoElements = $('.js-list-todo');
			const $currentTodoElement = $($todoElements).find(`li[data-id="${id}"]`);
			$currentTodoElement.remove();
			this.todos = this.todos.filter(todo => todo.id !== id);
		});
   }
}