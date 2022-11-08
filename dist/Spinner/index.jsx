import css from './style.module.scss';
import { cx } from '../util';
export default function Spinner() {
    return (<div className={cx(css.spinner)}>
			<svg width="23" height="31" viewBox="0 0 23 31">
				<g fill="none" fillRule="evenodd" stroke="#A28366" strokeWidth="1.694" transform="translate(1 1.43)">
					<polyline strokeLinecap="square" points="4.725 0 16.752 27.92 4.725 27.92" className={css.line}/>
					<circle cx="10.524" cy="13.101" r="10.524" className={css.circle}/>
				</g>
			</svg>
		</div>);
}
