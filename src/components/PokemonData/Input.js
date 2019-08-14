import React, { useState, useEffect } from 'react';

const Input = ({ value, name, type, helperText, label, onChange, ...rest }) => {
	const [data, set] = useState('');

	useEffect(() => {
		if (value) set(value);
	}, [value]);

	const handleChange = e => {
		const { name, value } = e.target;
		let newValue = value;
		if (type === 'number' && rest.max) {
			const val = Number(newValue);
			newValue = val > rest.max ? rest.max : val;
		}
		set(newValue);
		if (typeof onChange === 'function')
			onChange.call(null, {
				target: {
					value: newValue,
					name
				}
			});
	};

	return (
		<div className="flex flex-col">
			<label
				className="text-gray-600 font-bold uppercase text-base"
				htmlFor={`input-${name}`}
			>
				{label}
			</label>
			{helperText && (
				<small className="text-gray-400 text-sm leading-normal">
					{helperText}
				</small>
			)}
			<input
				type={type || 'text'}
				value={data}
				onChange={handleChange}
				id={`input-${name}`}
				name={name}
				{...rest}
				className="transition focus:outline-none focus:bg-white focus:border-gray-200 bg-gray-200 border border-transparent rounded w-full p-2 leading-normal appearance-none"
			/>
		</div>
	);
};

export default Input;
