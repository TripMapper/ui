import css from './style.module.scss';
import { gql } from 'urql';
import Image, { IMAGE_FRAGMENT, ImageProps } from '../Image';
import cx from '../util/cx';
import AvatarPlaceholder from './avatar.svg';
import React, { forwardRef } from 'react';

export const AVATAR_FRAGMENT = gql`
    fragment Avatar on User {
        id
        friendlyName
        avatar {
	        id
            srcset (
                width: 96
                height: 96
            ) {
                ...Image
            }
        }
    }
    ${IMAGE_FRAGMENT}
`;

export interface AvatarUser {
	id: string;
	friendlyName: string;
	avatar?: { srcset?: ImageProps, url?: string };
}

export interface AvatarProps {
	El?: React.ElementType | string;
	flat?: boolean;
	user?: AvatarUser;
	className?: string;
	size?: 'tiny' | 'small' | 'large';
	squricle?: boolean;
	initials?: string;
}

const Avatar = forwardRef(({
	El = 'div',
	size,
	flat = false,
	user,
	className,
	squricle = false,
	initials,
} : AvatarProps, ref) => (
	<El
		ref={ref}
		className={cx(
			css.avatar,
			className,
			size === 'large' && css.large,
			size === 'small' && css.small,
			size === 'tiny' && css.tiny,
			flat && css.flat,
			squricle && css.squricle,
			(!user?.avatar?.srcset && !user?.avatar?.url && !!initials) && css.initials,
		)}
		title={user?.friendlyName}
	>
		{user?.avatar?.url ? (
			<img
				src={user.avatar.url}
				alt={user.friendlyName}
				key={user?.id}
			/>
		) : user?.avatar?.srcset ? (
			<Image
				{...user.avatar.srcset}
				alt={user.friendlyName}
				key={user?.id}
			/>
		) : initials ? (
			<span>{initials}</span>
		) : (
			<AvatarPlaceholder />
		)}
	</El>
));

export default Avatar;
