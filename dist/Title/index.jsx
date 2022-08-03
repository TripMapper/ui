import Head from 'next/head';
import React from 'react';
export default function Title({ children, joiner = ' - ', suffix = 'TripMapper' }) {
    const str = children ? `${children}${joiner}${suffix}` : `${suffix}`;
    return (<Head>
			<title>{str}</title>
		</Head>);
}
