/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useRef } from 'react';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

interface Props {
	children: React.ReactNode;
	onLoadMore: () => void;
	hasNextPage: boolean;
	scrollableTop?: boolean;
	loading: boolean;
}

const InfiniteScroller = (props: Props) => {
	const { children, onLoadMore, hasNextPage, loading } = props;
	const elementRef = useRef<HTMLDivElement | null>(null);
	const [isVisible, entry] = useIntersectionObserver({
		elementRef,
	});
	const targetElement = entry?.target;
	React.useEffect(() => {
		if (isVisible) {
			if (targetElement instanceof HTMLElement && hasNextPage) {
				if (!loading) {
					targetElement?.click();
				}
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hasNextPage, isVisible, targetElement]);
	const loadMoreData = () => {
		onLoadMore();
	};

	return (
		<>
			{props.scrollableTop === true ? (
				<>
					<div className='top-content'>{children}</div>
					<div className='top-loading' ref={elementRef} onClick={loadMoreData} />
				</>
			) : (
				<>
					<div className='bottom-loading' ref={elementRef} onClick={loadMoreData}>
						{loading && <p>loading...</p>}
					</div>

					<div className='content'>{children}</div>
				</>
			)}
		</>
	);
};

export default InfiniteScroller;
