import css from './style.module.scss';
import Image from '../Image';
export default function DetailedHeader({ image, customImage, prefix, heading, }) {
    return (<header className={css.detailedHeader}>
			<figure className={css.img}>
				{customImage ? customImage : image && <Image {...image}/>}
			</figure>
			<div>
				{prefix && <div className={css.prefix}>{prefix}</div>}
				<h1>{heading}</h1>
			</div>
		</header>);
}
