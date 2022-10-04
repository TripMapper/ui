import css from './style.module.scss';
import { gql } from 'urql';

export const AUTH_AFFILIATE_BANNER_QUERY = gql`
	fragment AuthAffiliateBanner on Query {
		slugToPartnerPage (slug: $slug) {
            id
            bannerBackgroundColour
            bannerTextColour
            bannerText
		}
		slugToPartnerPageLogo (slug: $slug) {
			id
			src
		}
	}
`;

export default function AuthAffiliateBanner ({ logo, bannerText, bannerBackgroundColour, bannerTextColour }) {
	return (
		<div
			className={css.authAffBanner}
			style={{
				backgroundColor: bannerBackgroundColour,
				color: bannerTextColour,
			}}
		>
			<figure>
				<img src={logo?.src} alt="" />
			</figure>
			<p>{bannerText}</p>
		</div>
	);
}
