class TodoFormView {
	constructor(config) {
		this.config = config;
		this.$buttonModal = this.generateButtonModal();
		this.$addModal = this.generateAddModal();
	}

	generateButtonModal() {
		return $(`
		<button type="button" class="js-show-add-modal btn btn-success btn-lg">Open Add Modal</button>
		`).click(() => {
			this.onClickButtonOpen();
		});
	}

	generateAddModal() {
		return $(`
		<div class="js-add-modal " title="Add Todo Modal">
      		<form name="add-todo" class="input-group">
        	<label class="form-label">Todo Name</label>
        		<input name="name" class="js-input-todo" placeholder="Insert your task here..." value="">
        	<label for="js-checkbox-add"><strong>Is Done</strong>
          		<input type="checkbox" id="js-checkbox-add">
        	</label>
        	<div class="mt-3">
          		<button type="button" class="js-add-todo btn btn-outline-success btn-lg"><i class="bi bi-plus-circle"> Add</i></button>
        	</div>
      		</form>
    		</div>
		`).click(() => {
			this.onClickButtonAdd();
		});
	}

	getTodoFormData() {
		const $form = $('form[name="add-todo"]');
		const formData = new FormData($form[0]);
		const $checkbox = $form[0]['js-checkbox-add'];
		const isChecked = $($checkbox).is(':checked');
		return {
   		title: formData.get('name'),
   		completed: isChecked
   	}
	}

	onClickButtonOpen() {
		this.$addModal.dialog("open");
	}

	onClickButtonAdd() {
		if(event.target.closest('button')) {
			const newTodo = this.getTodoFormData();
      			this.config.createNewTodo(newTodo);
      			this.cleanForm();
      			this.$addModal.dialog("close");
    		}
	}

	cleanForm() {
		const $form = $('form[name="add-todo"]');
	   	$form[0].reset();
	}

	initModals() {
      	const baseModalOptions = {
      	autoOpen: false,
		modal: true,
		hide: {
        	effect: "explode",
        	duration: 800
      	}
      };
      this.$addModal.dialog(baseModalOptions);
   }
}
