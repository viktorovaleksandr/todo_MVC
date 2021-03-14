class TodosController {
	constructor() {
		this.todoListView = new TodoListView({
			toggleTodoCompleted: (id) => this.toggleTodoCompleted(id),
			deleteTodo: (id) => this.deleteTodo(id)
		});
		this.todoFormView = new TodoFormView({
			createNewTodo: (todo) => this.createNewTodo(todo)
		});
		this.todosModel = new TodosModel();

		const $app = $('#app');

		$app.append(this.todoFormView.$buttonModal);
      $app.append(this.todoListView.$list);

		this.init();
	}

	async init() {
		const todos = await this.todosModel.getTodos()
		this.todoListView.renderTodos(todos);
		this.todoFormView.initModals();
	}

	async createNewTodo(todo) {
		const newTodo = await this.todosModel.postNewTodo(todo);
		this.todoListView.renderTodo(newTodo);
	}

	async toggleTodoCompleted(id) {
		await this.todosModel.toggleTodoCompleted(id);
		this.todoListView.renderTodos(this.todosModel.todos);
	}

	async deleteTodo(id) {
		await this.todosModel.deleteTodo(id);
	}
}