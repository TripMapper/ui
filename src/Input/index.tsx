import Generic, { GenericInputProps } from './Generic';
import Color from './Color';

export default function Input ({ type, ...props } : GenericInputProps) {
	if (type?.toLowerCase() === 'color')
		return <Color {...props} />

	return <Generic type={type} {...props} />;
}
