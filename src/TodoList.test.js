import { render, fireEvent } from '@testing-library/react';
import TodoList from './TodoList';

it('renders without crashing', function() {
	render(<TodoList />);
});

it('matches snapshot', function() {
	const { asFragment } = render(<TodoList />);
	expect(asFragment()).toMatchSnapshot();
});

it('can add a todo', function() {
	const { getByLabelText, queryByText } = render(<TodoList />);

	// no todos yet
	expect(queryByText('new todo')).not.toBeInTheDocument();

	const todoInput = getByLabelText('New todo:');
	const submitBtn = queryByText('Add!');

	// fill out the form
	fireEvent.change(todoInput, { target: { value: 'new todo' } });
	fireEvent.click(submitBtn);

	// todo exists
	expect(queryByText('new todo')).toBeInTheDocument();
});

it('can remove a todo', function() {
	const { getByLabelText, queryByText } = render(<TodoList />);

	const todoInput = getByLabelText('New todo:');
	const submitBtn = queryByText('Add!');

	// fill out the form
	fireEvent.change(todoInput, { target: { value: 'new todo' } });
	fireEvent.click(submitBtn);

	// todo exists
	expect(queryByText('new todo')).toBeInTheDocument();

	// click delete button
	fireEvent.click(queryByText('X'));

	// no todo in doc
	expect(queryByText('new todo')).not.toBeInTheDocument();
});

it('can edit a todo', function() {
	const { getByLabelText, queryByText, queryByDisplayValue } = render(<TodoList />);

	const todoInput = getByLabelText('New todo:');
	const submitBtn = queryByText('Add!');

	// add a todo
	fireEvent.change(todoInput, { target: { value: 'new todo' } });
	fireEvent.click(submitBtn);
	expect(queryByText('new todo')).toBeInTheDocument();

	// click edit button
	fireEvent.click(queryByText('Edit'));

	// edit todo
	const editInput = queryByDisplayValue('new todo');
	fireEvent.change(editInput, { target: { value: 'edited todo' } });
	fireEvent.click(queryByText('Submit'));

	expect(queryByText('edited todo')).toBeInTheDocument();
	expect(queryByText('new todo')).not.toBeInTheDocument();
});

it('clears form fields on submit', function() {
	const { getByLabelText, queryByText, queryByDisplayValue } = render(<TodoList />);

	const todoInput = getByLabelText('New todo:');
	const submitBtn = queryByText('Add!');

	// fill out the form
	fireEvent.change(todoInput, { target: { value: 'new todo' } });
	expect(queryByDisplayValue('new todo')).toBeInTheDocument();

	// submit form
	fireEvent.click(submitBtn);

	// form field is empty
	expect(queryByDisplayValue('new todo')).not.toBeInTheDocument();
});
