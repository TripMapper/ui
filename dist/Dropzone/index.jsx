import { cx } from '../util';
import { useEffect, useRef, useState } from 'react';
export default function Dropzone({ children, onChange, className, accept = '*', El = 'div', hoverClassName = null, ...props }) {
    const self = useRef(), [isOver, setIsOver] = useState(false);
    delete props.className;
    useEffect(() => {
        if (!self.current)
            return;
        const el = self.current;
        const acceptRX = accept.indexOf('*') > -1
            ? accept.replace('*', '[^\\/,]+')
            : accept.replace(/,/g, '|')
                .replace(/\s+/g, '')
                .replace(/[-\/\\^$*+?.()[\]{}]/g, '\\$&')
                .replace(/jpeg|jpg/g, 'jpe?g');
        const handleHoverDrop = e => {
            e.preventDefault();
            e.stopPropagation();
            const items = e.dataTransfer.files.length ? e.dataTransfer.files : e.dataTransfer.items;
            if (items.length === 0)
                return;
            const files = Array
                .from(items)
                .filter((file) => file.type.match(acceptRX));
            if (files.length === 0)
                return;
            return files;
        };
        const onEnter = e => {
            const files = handleHoverDrop(e);
            files && setIsOver(true);
        };
        const onLeave = e => {
            e.preventDefault();
            e.stopPropagation();
            setIsOver(false);
        };
        const onDrop = e => {
            const files = handleHoverDrop(e);
            files && onChange && onChange(files);
        };
        el.addEventListener('dragenter', onEnter, false);
        el.addEventListener('dragover', onEnter, false);
        el.addEventListener('dragleave', onLeave, false);
        el.addEventListener('drop', onLeave, false);
        el.addEventListener('drop', onDrop, false);
        return () => {
            el.removeEventListener('dragenter', onEnter, false);
            el.removeEventListener('dragover', onEnter, false);
            el.removeEventListener('dragleave', onLeave, false);
            el.removeEventListener('drop', onLeave, false);
            el.removeEventListener('drop', onDrop, false);
        };
    }, [self, setIsOver]);
    return (<El ref={self} className={cx(className, isOver && hoverClassName)} {...props}>
			{children}
		</El>);
}
