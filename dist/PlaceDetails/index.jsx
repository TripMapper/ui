import css from './style.module.scss';
import { gql } from 'urql';
import Icon from '../Icon';
import { formatCurrency } from '../util';
import enumToName from '../util/enumToName';
export const PLACE_DETAILS_FRAGMENT = gql `
    fragment PlaceDetails on Place {
        id
        phoneNumber
        location { address }
        url
        rating
        totalReviews
        type
        price
    }
`;
const fmt = (new Intl.NumberFormat().format);
export default function PlaceDetails({ phoneNumber, location, url, type, price, totalReviews, rating, tripCurrency = 'USD', }) {
    if (type.toLowerCase() === 'route')
        return null;
    return (<div className={css.placeDetails}>
			<ul>
				{phoneNumber && (<li>
						<a href={`tel:${phoneNumber}`}>
							<Icon of="phone"/>{phoneNumber}
						</a>
					</li>)}
				{location?.address && (<li>
						<a href={`https://www.google.com/maps?saddr=${encodeURI(location.address)}`} target="_blank" rel="noopener noreferrer">
							<Icon of="location"/>Get Directions
						</a>
					</li>)}
				{url && (<li>
						<a href={url} target="_blank" rel="noopener noreferrer">
							<Icon of="earth"/>Website
						</a>
					</li>)}
			</ul>
			{(type || price !== null || rating !== null) && (<div>
					{rating !== null && (<div>
							<div title={`${rating} stars`}>
								<span>Rating</span>
								<i className={css.rating}>
									{Array.from({ length: 5 }, (_, i) => {
                    if (i === ~~rating) {
                        const mod = rating % i;
                        if (mod >= 1 || mod >= 0.75)
                            return <Icon key={i} of="star-full"/>;
                        if (mod <= 0.25)
                            return <Icon key={i} of="star-empty"/>;
                        return <Icon key={i} of="star-half"/>;
                    }
                    if (i < rating)
                        return <Icon key={i} of="star-full"/>;
                    return <Icon key={i} of="star-empty"/>;
                })}
								</i>
							</div>
							{totalReviews && (<small>
									Based on {fmt(totalReviews)} reviews
								</small>)}
						</div>)}
					<div>
						<div>
							<span>Type</span>
							{enumToName(type)}
						</div>
						{price !== null && (<div>
								<span>Cost</span>
								{price
                    ? Array.from({ length: price }, () => formatCurrency(0, tripCurrency)[0]).join('')
                    : 'Free'}
							</div>)}
					</div>
				</div>)}
		</div>);
}
