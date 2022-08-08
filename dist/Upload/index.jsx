import css from './style.module.scss';
import Button from '../Button';
import { useRef, useState } from 'react';
import { cx } from '../util';
export default function Upload({ name, placeholder, defaultValue, }) {
    const input = useRef();
    const [file, _setFile] = useState(defaultValue), [isDragging, setIsDragging] = useState(false), [preview, setPreview] = useState(defaultValue?.src ?? ''), [deletedId, setDeletedId] = useState(null);
    const setFile = file => {
        if (file) {
            const fr = new FileReader();
            fr.onload = () => setPreview(fr.result);
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
        input.current.files = e.dataTransfer.files;
        setFile(e.dataTransfer.files[0]);
        setIsDragging(false);
    };
    const onChange = e => setFile(e.target.files[0]);
    const onRemoveClick = () => {
        setFile(null);
        setPreview('');
        if (defaultValue)
            setDeletedId(defaultValue.id);
    };
    const El = preview ? 'div' : 'label';
    return (<El className={css.wrap}>
			<input ref={input} type="file" name={`${name}.create.file`} onChange={onChange} accept="image/*"/>
			{deletedId && (<input type="hidden" name={`${name}.deleteById.id`} value={deletedId}/>)}
			{file ? (<div className={css.preview}>
					<img src={preview} alt=""/>

					<button type="button" onClick={onRemoveClick}>Remove</button>
				</div>) : (<div className={cx(css.upload, isDragging && css.dragging)} onDragEnter={onDragEnter} onDragOver={prevDefault} onDragLeave={onDragLeave} onDrop={onDrop}>
					<Button dashed className={css.btn} El="div">{placeholder ?? 'Select Image'}</Button>
				</div>)}
		</El>);
}
