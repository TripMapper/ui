import css from './style.module.scss';
import Form from '../Form';
import { cx } from '../util';
export default function CreateLayout({ title, content, onSubmit, children, currentStep = 0, totalSteps = 5 }) {
    return (<div className={css.container}>
			<div className={css.wrap}>
				<header className={css.header}>
					<h1>{title}</h1>
					{content}
				</header>
				<Form onSubmit={onSubmit} className={css.form}>
					<div className={css.formContent}>
						{children}
					</div>
					{totalSteps > 0 && (<div className={css.pips}>
							{Array.from({ length: totalSteps }, (_, i) => (<span key={i} className={cx(i === currentStep && css.current)}/>))}
						</div>)}
				</Form>
			</div>
		</div>);
}
