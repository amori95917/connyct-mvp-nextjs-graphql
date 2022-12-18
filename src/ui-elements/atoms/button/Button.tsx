import React from 'react';

interface ButtonProps {
	children: React.ReactNode;
	variant?: 'contained' | 'outlined';
	color?: 'primary' | 'secondary' | string;
	startIcon?: React.ReactNode;
	endIcon?: React.ReactNode;
	loading?: boolean;
	loadingComponent?: React.ReactNode | string;
	disabled?: boolean;
	className?: string;
	size?: 'small' | 'medium' | 'large';
}

// NOTE: Please change in here should be a last resort if you want to customize the styling.
// First priority should be give to shared-component Button where project wide customization is done
// TODO: use theme and make our own css-in-js.

export function Button(props: ButtonProps) {
	const { children, loading, loadingComponent = 'loading...', ...otherProps } = props;

	const getColor = (color: string) => {
		if (color === 'primary') return '#5A6399';
		if (color === 'secondary') return '#ffa000';
		return color;
	};

	const getSize = (size: string) => {
		if (size === 'small') return { fontSize: '0.875rem', padding: '0.25rem 0.5rem' };
		if (size === 'large') return { fontSize: '1.5rem', padding: '0.75rem 1.5rem' };
		return { fontSize: '1rem', padding: '0.5rem 1rem' };
	};

	const styles = {
		base: {
			display: 'inline-flex',
			alignItems: 'center',
			justifyContent: 'center',
			border: 'none',
			borderRadius: '4px',
			fontWeight: 500,
			cursor: 'pointer',
			outline: 'none',
			...getSize(props.size),
		},
		contained: {
			backgroundColor: props => getColor(props.color),
			color: 'white',
			'&:hover': {
				backgroundColor: props => {
					if (props.color === 'secondary') return '#ff8f00';
					if (props.color === 'primary') return '#5A6399';
					return 'rgba(0, 0, 0, 0.1)';
				},
			},
		},
		outlined: {
			border: '1px solid',
			color: props => getColor(props.color),
			borderColor: props => getColor(props.color),
		},
		disabled: {
			pointerEvents: 'none',
			opacity: 0.5,
		},
	};

	let className = 'button';
	if (props.variant === 'outlined') {
		className += ' outlined';
	}
	if (props.color === 'secondary') {
		className += ' secondary';
	}
	if (props.disabled) {
		className += ' disabled';
	}
	if (props.className) {
		className += ` ${props.className}`;
	}

	return (
		<button
			style={Object.assign(
				{},
				styles.base,
				props.variant === 'contained' && styles.contained,
				props.variant === 'outlined' && styles.outlined,
				props.disabled && styles.disabled
			)}
			disabled={loading || props.disabled}
			className={className}
			{...otherProps}>
			{props.startIcon}
			{loading ? loadingComponent : children}
			{props.endIcon}
		</button>
	);
}

export default Button;
