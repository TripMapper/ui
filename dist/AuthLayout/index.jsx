import css from './style.module.scss';
import Copy from '../Copy';
import Image from 'next/future/image';
import Logomark from '../svg/logomark.svg';
import Form from '../Form';
export default function AuthLayout({ form, callout, image, onSubmit, }) {
    return (<div className={css.authLayout}>
			<div className={css.content}>
				<Form className={css.form} onSubmit={onSubmit}>
					<div>
						<Logomark className={css.logo}/>
						{form}
					</div>
				</Form>
				{callout && (<Copy className={css.callOut}>
						{callout}
					</Copy>)}
			</div>
			<figure className={css.image}>
				{image && (<>
						<Image src={image.src} width={1000} height={1000}/>
						{image.url && (<figcaption>
								<a href={image.url} target="_blank" rel="noreferrer">
									{image.name} by {image.credit}
								</a>
							</figcaption>)}
					</>)}
			</figure>
		</div>);
}
