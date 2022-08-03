import css from './style.module.scss';
import cx from '../util/cx';
import { gql } from 'urql';
import React from 'react';

export const IMAGE_FRAGMENT = gql`
    fragment Image on Srcset {
        width
        height
        src
        srcset
        srcsetWebp
        placeholder
    }
`;

export interface ImageProps extends Omit<JSX.IntrinsicElements['picture'], 'style'> {
	width: number;
	height: number;
	src: string;
	srcset: string;
	srcsetWebp: string;
	placeholder?: string;
	alt?: string;
	readonly style: React.CSSProperties;
}

export default function Image ({
	width,
	height,
	src,
	srcset,
	srcsetWebp,
	placeholder,
	alt = '',
	className = '',
	style = {},
	...props
} : ImageProps) {
	return (
		<picture
			key={src}
			className={cx(css.image, className)}
			style={{
				...style,
				'--image-padding-top': `${height / width * 100}%`,
				backgroundImage: placeholder ? `url("${placeholder}")` : '',
			} as React.CSSProperties}
			{...props}
		>
			<source srcSet={srcsetWebp} type="image/webp" />
			<source srcSet={srcset} />
			<img src={src} alt={alt} loading="lazy" />
		</picture>
	);
}
