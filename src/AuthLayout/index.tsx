import css from './style.module.scss';
import Copy from '../Copy';
import { CSSProperties, ReactNode } from 'react';
import Image from 'next/future/image';
import Logo from '../svg/logo.svg';
import Form, { FormSubmit } from '../Form';
import { motion, useScroll, useTransform } from 'framer-motion';
import A from '../A';
import Head from 'next/head';

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
	content?: ReactNode;
	mobileHeightOffset?: number;
	style?: CSSProperties;
}

export default function AuthLayout ({
	form,
	callout,
	image,
	onSubmit,
	content,
	mobileHeightOffset,
	style,
} : AuthLayoutProps) {
	const { scrollYProgress } = useScroll();
	const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
	// @ts-ignore
	const isMobile = (process?.browser ?? true) ? window.matchMedia('(max-width: 60em)').matches : false;

	return (
		// @ts-ignore
		<div className={css.authLayout} style={{ '--mobileHeightOffset': mobileHeightOffset + 'px', ...(style ?? {}) }}>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
			</Head>

			<div className={css.content}>
				<Form className={css.form} onSubmit={onSubmit}>
					<div>
						{!isMobile && <A className={css.logo} href="/"><Logo /></A>}
						{form}
					</div>
				</Form>
				{callout && (
					<Copy className={css.callOut}>
						{callout}
					</Copy>
				)}
			</div>
			{content ? (
				<motion.div
					className={css.body}
					style={isMobile ? { y } : void 0}
				>
					{content}
				</motion.div>
			) : image ? (
				<figure className={css.image}>
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
				</figure>
			) : null}
		</div>
	);
}
