import { useState } from 'react';
import Todo from './Todo';
import NewTodoForm from './NewTodoForm';
import { v4 as uuidv4 } from 'uuid';
import './TodoList.css';

const TodoList = () => {
	const [ todos, setTodos ] = useState([]);
	const [ editForm, setEditForm ] = useState({ value: '', id: '' });

	const remove = (id) => {
		const filteredTodos = todos.filter((todo) => todo.id != id);
		setTodos(filteredTodos);
	};
	const addTodo = (formData) => {
		const newTodo = { ...formData, id: uuidv4() };
		setTodos((todos) => [ ...todos, newTodo ]);
	};
	const edit = (formData, id) => {
		const filteredTodos = todos.filter((todo) => todo.id != id);
		const updatedTodo = { ...formData, id: id };
		setTodos(() => [ ...filteredTodos, updatedTodo ]);
		setEditForm(() => ({ value: '', id: '' }));
	};
	const showForm = (id, todo) => {
		setEditForm({ value: todo, id: id });
	};

	return (
		<div className="TodoList">
			<h1>Todo List</h1>
			<NewTodoForm submitFunc={addTodo} placeholder="Add a todo" label="New todo:" value="" btn="Add!" />
			{editForm.value.length > 0 && (
				<NewTodoForm
					submitFunc={edit}
					label="Edit todo:"
					value={editForm.value}
					id={editForm.id}
					btn="Submit"
				/>
			)}
			{todos.map(({ id, todo }) => <Todo id={id} todo={todo} remove={remove} showForm={showForm} key={id} />)}
		</div>
	);
};

export default TodoList;
