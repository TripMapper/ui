import css from './style.module.scss';
import Button from '../Button';
import { useEffect, useRef, useState } from 'react';
import { cx } from '../util';
import { gql } from 'urql';

export interface DefaultUploadValueProp {
	id: string;
	src: string;
	[key: string]: any;
}

export interface UploadProps {
	name: string;
	placeholder?: string;
	defaultValue?: DefaultUploadValueProp;
	previewType?: 'cover' | 'contain';
}

export const UPLOAD_COVER_FRAGMENT = gql`
	fragment UploadCover on Asset {
		id
		src (
			width: 80
			height: 80
		)
	}
`;

export const UPLOAD_CONTAIN_FRAGMENT = gql`
	fragment UploadContain on Asset {
		id
		src (width: 80)
	}
`;

export default function Upload ({
	name,
	placeholder,
	defaultValue,
	previewType = 'cover',
} : UploadProps) {
	const input = useRef();
	const [file, _setFile] = useState(defaultValue)
		, [isDragging, setIsDragging] = useState(false)
		, [preview, setPreview] = useState(defaultValue?.src ?? '')
		, [deletedId, setDeletedId] = useState(null);

	useEffect(() => {
		if (!input.current || file?.hasOwnProperty('id')) return;
		const dt = new DataTransfer();
		dt.items.add(file as unknown as File);
		(input.current as HTMLInputElement).files = dt.files;
	}, [input, file]);

	const setFile = file => {
		if (file) {
			const fr = new FileReader();
			fr.onload = () => setPreview(fr.result as string);
			fr.readAsDataURL(file);
		}
		_setFile(file);
	};

	const prevDefault = e => {
		e.preventDefault();
		e.stopPropagation();
	};

	const onDragEnter = e => {
		prevDefault(e);
		setIsDragging(true);
	};

	const onDragLeave = e => {
		prevDefault(e);
		setIsDragging(false);
	};

	const onDrop = e => {
		prevDefault(e);
		setFile(e.dataTransfer.files[0]);
		setIsDragging(false);
	};

	const onChange = e => setFile(e.target.files[0]);

	const onRemoveClick = () => {
		setFile(null);
		setPreview('');
		if (defaultValue) setDeletedId(defaultValue.id);
	};

	return (
		<>
			{file && !file.hasOwnProperty('id') && (
				<input
					className={css.file}
					ref={input}
					type="file"
					name={`${name}.upload`}
				/>
			)}
			{deletedId && (
				<input
					type="hidden"
					name={`${name}.delete`}
					value={deletedId}
				/>
			)}
			{file ? (
				<div className={css.preview}>
					<img
						src={preview}
						alt=""
						style={{objectFit:previewType}}
					/>

					<button type="button" onClick={onRemoveClick}>Remove</button>
				</div>
			) : (
				<label
					className={cx(css.upload, isDragging && css.dragging)}
					onDragEnter={onDragEnter}
					onDragOver={prevDefault}
					onDragLeave={onDragLeave}
					onDrop={onDrop}
				>
					<input
						type="file"
						onChange={onChange}
						accept="image/*"
					/>
					<Button dashed className={css.btn} El="div">{placeholder ?? 'Select Image'}</Button>
				</label>
			)}
		</>
	);
}
