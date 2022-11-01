import { useState, useEffect, useRef, RefObject } from 'react';

interface Props<T> extends IntersectionObserverInit {
  elementRef: RefObject<T>;
  root?: any;
}

type ReturnType = [boolean, IntersectionObserverEntry | undefined];

export default function useIO<T extends HTMLElement = HTMLDivElement>({
  elementRef,
  threshold = 0.5,
  root,
  rootMargin = '0px',
}: Props<T>): ReturnType {
  const observer = useRef<IntersectionObserver | null>(null);
  const [ioEntry, setIOEntry] = useState<IntersectionObserverEntry>();
  const options = { threshold, root: root ?? null, rootMargin };

  const observerFn = ([entry]: IntersectionObserverEntry[]): void => {
    setIOEntry(entry);
  };

  useEffect(() => {
    const node = elementRef?.current;
    if (!node) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(observerFn, options);
    const { current: currentObserver } = observer;
    currentObserver.observe(node);
    // eslint-disable-next-line consistent-return
    return () => {
      currentObserver.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementRef]);

  return [!!ioEntry?.isIntersecting, ioEntry];
}
