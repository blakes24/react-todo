import { useState } from 'react';

const NewTodoForm = ({ submitFunc, placeholder, label, value, id, btn }) => {
	const [ formData, setFormData ] = useState({ todo: value });

	const handleChange = (evt) => {
		const { name, value } = evt.target;
		setFormData((formData) => ({
			...formData,
			[name] : value
		}));
	};

	const handleSubmit = (evt) => {
		evt.preventDefault();
		submitFunc(formData, evt.target.id);
		setFormData({ todo: '' });
	};

	return (
		<form onSubmit={handleSubmit} id={id}>
			<label htmlFor="todo">{label} </label>
			<input
				onChange={handleChange}
				name="todo"
				id="todo"
				type="text"
				value={formData.todo}
				placeholder={placeholder}
			/>
			<button>{btn}</button>
		</form>
	);
};

export default NewTodoForm;
