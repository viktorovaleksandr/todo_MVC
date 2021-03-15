class TodoListView {
	constructor(config) {
		this.config = config;
		this.$list = this.generateList();
	}

	generateList() {
		return $(`
		<ul class="js-list-todo list-group list-unstyled list-group-flush">
		`).click((event) => {
			this.onClickTodoItem(event);
			this.onClickDeleteButton(event);
		});
	}

	generateTodo(todo) {
		const $listElement = $(`
     		<li data-id="${todo.id}" completed:"${todo.completed}" class="list-group-item 
     		list-group-item-action d-flex justify-content-between rounded-pill list-group-item-secondary">
      		${todo.title}
      		<i class="bi bi-trash"></i>
      	</li>
   	`)
   	if (todo.completed) {
			$listElement.removeClass('list-group-item-secondary')
			.addClass('list-group-item-info')
			.prepend(`<i class="bi bi-check2"></i>`);
		} 
		return $listElement;
	}

	renderTodos(todos) {
		const todoHtml = todos.map(this.generateTodo);
		this.$list.prepend(todoHtml);
	}

	renderTodo(todo) {
		const newTodo = this.generateTodo(todo);	
		$(this.$list).prepend(newTodo);
	}

	onClickTodoItem(event) {
		const id = $(event.target).data('id');
		this.config.toggleTodoCompleted(id);
	}

	onClickDeleteButton(event) {
		const listElement = (event.target).closest('li');
		const id = parseInt(listElement.dataset.id, 10);
		if(event.target.closest('i')) {
      	this.config.deleteTodo(id);
    	}
	}
}