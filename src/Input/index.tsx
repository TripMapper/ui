import Generic, { GenericInputProps } from './Generic';
import Color, { ColorInputProps } from './Color';
import { forwardRef } from 'react';

const Input = forwardRef<HTMLInputElement, GenericInputProps>(({ type, ...props } : GenericInputProps, ref) => {
	if (type?.toLowerCase() === 'color')
		return <Color {...props} ref={ref} />

	return <Generic type={type} {...props} ref={ref} />;
});

export default Input;
