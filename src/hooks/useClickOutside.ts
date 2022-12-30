import { useEffect, useRef, useState } from 'react';

function useClickOutside() {
	const [isClose, setIsClose] = useState(true);
	const ref = useRef<HTMLDivElement>(null);

	const handelClickOutside = (event: TouchEvent | MouseEvent) => {
		if (ref.current && !ref.current.contains(event.target as Node)) {
			setIsClose(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handelClickOutside);
		return () => {
			document.removeEventListener('mousedown', handelClickOutside);
		};
	}, [isClose]);

	return { ref, isClose, setIsClose };
}

export { useClickOutside };
