import css from './style.module.scss';
import { Fragment, useRef, useState } from 'react';
import UrlToLink from '../UrlToLink';
import { cx } from '../util';
import Prose from '../Prose';
const URL_RX = /((?:http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+(?:[\-.][a-z0-9]+)*\.[a-z]{2,63}(?::[0-9]{1,5})?(?:\/[^\s]*)?)/g;
const substituteUrls = text => text.split(URL_RX).filter(Boolean).map((s, i) => {
    const key = `${s}_${i}`;
    // This is a bit trash, but it's the only full-proof way of checking
    // if it's a valid URL :(
    try {
        if (URL_RX.test(s) && s.indexOf(/https?:\/\//) === -1)
            s = 'https://' + s;
        new URL(s);
        return <UrlToLink key={key} url={s}/>;
    }
    catch (e) { }
    return <Fragment key={key}>{s}</Fragment>;
});
export default function Text({ defaultValue, onChange = () => { }, className, onWhite = false, placeholder = 'Jot something down', }) {
    const textArea = useRef(null);
    const [isEditing, setIsEditing] = useState(false), [value, setValue] = useState(defaultValue || ''), [preview, setPreview] = useState(substituteUrls(defaultValue || ''));
    const isValueEmpty = value.trim() === '';
    const onClick = e => {
        if (e.target.nodeName.toLowerCase() === 'a')
            return;
        setIsEditing(true);
        requestAnimationFrame(() => {
            textArea.current?.focus();
        });
    };
    const onBlur = () => {
        setIsEditing(false);
        setPreview(substituteUrls(value));
    };
    const onInput = e => {
        const v = e.target.value;
        setValue(v);
        onChange(v);
    };
    return (<div className={cx(css.notes, className, isEditing && css.editing, onWhite && css.onWhite)} tabIndex={isEditing ? void 0 : -1} onClick={onClick}>
			{isEditing || isValueEmpty ? (<>
					<div className={css.livePreview} dangerouslySetInnerHTML={{ __html: value.replace(URL_RX, '<u>$1</u>') + ' ' }}/>
					<textarea className={css.textarea} ref={textArea} defaultValue={value} onBlur={onBlur} onInput={onInput} placeholder={placeholder}/>
				</>) : (<Prose>
					{preview}
				</Prose>)}
		</div>);
}
