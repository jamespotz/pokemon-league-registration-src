import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = ({ url, method, data }) => {
	const [loading, setLoading] = useState(true);
	const [results, setResults] = useState(null);
	const [errors, setErrors] = useState(null);

	useEffect(() => {
		let mounted = true;
		const source = axios.CancelToken.source();
		const fetch = async () => {
			try {
				const res = await axios({
					url,
					method,
					data,
					cancelToken: source.token
				});
				if (!mounted) return;
				setResults(res.data);
				setLoading(false);
			} catch (e) {
				if (!mounted) return;
				setErrors(e);
				setLoading(false);
			}
		};

		fetch();
		return () => {
			mounted = false;
			source.cancel('Cancel api call');
		};
	}, [url, method, data]);

	return [results, loading, errors];
};

export default useFetch;
