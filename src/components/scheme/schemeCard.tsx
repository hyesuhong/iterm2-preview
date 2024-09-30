import {
	colorChart,
	schemeCard,
	schemeCursor,
	schemeDisplay,
	schemeName,
	schemeText,
} from '@/styles/scheme.css';

const SchemeCard = () => {
	return (
		<dl className={schemeCard}>
			<dd className={schemeDisplay}>
				<ul className={colorChart}>
					<li style={{ background: '#061A2B' }} />
					<li style={{ background: '#EA9091' }} />
					<li style={{ background: '#7DBD8D' }} />
					<li style={{ background: '#EAC71D' }} />
					<li style={{ background: '#77A8ED' }} />
					<li style={{ background: '#CCA6EC' }} />
					<li style={{ background: '#28B99E' }} />
					<li style={{ background: '#E9EAEC' }} />
					<li style={{ background: '#535455' }} />
					<li style={{ background: '#EA8F91' }} />
					<li style={{ background: '#7CBD8D' }} />
					<li style={{ background: '#EAC71D' }} />
					<li style={{ background: '#77A8ED' }} />
					<li style={{ background: '#CBA7EC' }} />
					<li style={{ background: '#7CBD8D' }} />
					<li style={{ background: '#E9EAEC' }} />
				</ul>
				<p className={schemeText}>
					$ echo "Scheme name"
					<span className={schemeCursor} />
				</p>
			</dd>
			<dt className={schemeName}>Scheme name</dt>
		</dl>
	);
};

export default SchemeCard;
