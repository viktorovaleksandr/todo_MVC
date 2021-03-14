$(() => {
	const controller = new TodosController();
})


// 1) в render попадает все todo под id 201 
// 2) при обновлении todo новосозданіе падают вниз
// 2) event.stopPropagation() не срабатывает.
