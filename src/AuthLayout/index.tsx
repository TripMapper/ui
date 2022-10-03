import css from './style.module.scss';
import Copy from '../Copy';
import { ReactNode } from 'react';
import Image from 'next/future/image';
import Logomark from '../svg/logomark.svg';
import Form, { FormSubmit } from '../Form';

export interface AuthImageProps {
	src: string;
	name?: string;
	credit?: string;
	url?: string;
}

export interface AuthLayoutProps {
	form: ReactNode;
	callout?: ReactNode;
	image?: AuthImageProps;
	onSubmit?: FormSubmit;
}

export default function AuthLayout ({
	form,
	callout,
	image,
	onSubmit,
} : AuthLayoutProps) {
	return (
		<div className={css.authLayout}>
			<div className={css.content}>
				<Form className={css.form} onSubmit={onSubmit}>
					<div>
						<Logomark className={css.logo} />
						{form}
					</div>
				</Form>
				{callout && (
					<Copy className={css.callOut}>
						{callout}
					</Copy>
				)}
			</div>
			<figure className={css.image}>
				{image && (
					<>
						<Image
							src={image.src}
							width={1000}
							height={1000}
							alt=""
						/>
						{image.url && (
							<figcaption>
								<a href={image.url} target="_blank" rel="noreferrer">
									{image.name} by {image.credit}
								</a>
							</figcaption>
						)}
					</>
				)}
			</figure>
		</div>
	);
}
