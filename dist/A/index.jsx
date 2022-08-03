import Link from 'next/link';
export default function A({ href, ...props }) {
    return (<Link href={href} passHref>
			<a {...props}/>
		</Link>);
}
