import css from './style.module.scss';
import cx from '../util/cx';
import { gql } from 'urql';
import React from 'react';
export const IMAGE_FRAGMENT = gql `
    fragment Image on Srcset {
	    id
        width
        height
        src
        srcset
        srcsetWebp
        placeholder
    }
`;
export default function Image({ width, height, src, srcset, srcsetWebp, placeholder, alt = '', className = '', style = {}, circle = false, ...props }) {
    /* @ts-ignore */
    delete props.__typename;
    return (<picture key={src} className={cx(css.image, className, circle && css.circle)} style={{
            ...style,
            '--image-padding-top': `${height / width * 100}%`,
            backgroundImage: placeholder ? `url("${placeholder}")` : '',
        }} {...props}>
			<source srcSet={srcsetWebp} type="image/webp"/>
			<source srcSet={srcset}/>
			<img src={src} alt={alt} loading="lazy"/>
		</picture>);
}
