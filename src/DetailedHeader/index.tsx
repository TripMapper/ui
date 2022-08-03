import css from './style.module.scss';
import Image, { ImageProps } from '../Image';
import { ReactNode } from 'react';

export interface DetailedHeaderProps {
	image?: ImageProps;
	customImage?: ReactNode;
	prefix?: ReactNode;
	heading: string;
}

export default function DetailedHeader ({
	image,
	customImage,
	prefix,
	heading,
} : DetailedHeaderProps) {
	return (
		<header className={css.detailedHeader}>
			<figure className={css.img}>
				{customImage ? customImage : image && <Image {...image} />}
			</figure>
			<div>
				{prefix && <div className={css.prefix}>{prefix}</div>}
				<h1>{heading}</h1>
			</div>
		</header>
	);
}
