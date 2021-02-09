import './Todo.css';

const Todo = ({ todo, remove, id, showForm }) => {
	const handleRemove = () => {
		remove(id);
	};
	const showEditForm = () => {
		showForm(id, todo);
	};
	return (
		<div className="Todo">
			<div className="Todo-btns">
				<button onClick={showEditForm} className="Todo-edit">
					Edit
				</button>
				<button onClick={handleRemove} className="Todo-remove">
					X
				</button>
			</div>
			<p>{todo}</p>
		</div>
	);
};

export default Todo;
