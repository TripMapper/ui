import css from './style.module.scss';
export default function InfoBlockGroup({ heading, children, }) {
    return (<div className={css.infoBlockGroup}>
			<header className={css.heading}>{heading}</header>
			<div className={css.blocks}>
				{children}
			</div>
		</div>);
}
