import css from './style.module.scss';
import { useLayoutEffect, useRef, useState } from 'react';
import TextArea from '../TextArea';
function parseTags(tags, validTags, hasInvalid) {
    validTags = validTags.map(t => t.toLowerCase());
    return tags.replace(/(["'])(?:(?=(\\?))\2.)*?\1/, a => {
        return a.replace(/\s/g, '§');
    }).split(' ').map(tag => {
        tag = tag.replace(/§/g, ' ');
        if (tag.toLowerCase() === 'or')
            return '<span data-join>or</span>';
        if (/"([^"\\]|\\.)*"/gus.test(tag))
            return `<span data-string>${tag}</span>`;
        if (validTags.indexOf(tag.toLowerCase()) === -1) {
            hasInvalid.current = true;
            return `<del>${tag}</del>`;
        }
        return tag;
    }).join(' ');
}
export default function TokenTextarea({ name, defaultValue, validTags, }) {
    const hasInvalid = useRef(false), self = useRef();
    const [value, setValue] = useState(defaultValue);
    const onInput = e => setValue(e.target.value);
    useLayoutEffect(() => {
        self.current?.setCustomValidity(hasInvalid.current ? 'Please fix any invalid tokens.' : '');
    }, [hasInvalid.current]);
    return (<label className={css.wrap}>
			<TextArea ref={self} name={name} defaultValue={defaultValue} onInput={onInput} className={css.input}/>
			<div className={css.preview} dangerouslySetInnerHTML={{
            __html: (() => {
                hasInvalid.current = false;
                return (value ?? '').replace(/\[(.*?)]/ig, (_, m) => `<span>${parseTags(m, validTags, hasInvalid)}</span>`);
            })(),
        }}/>
		</label>);
}
