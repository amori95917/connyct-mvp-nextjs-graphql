import React from 'react';

export type ImageProps = {
	children: React.ReactNode;
};

export type AvatarProps = {
	children: React.ReactNode;
};

export type CardProps = {
	children: React.ReactNode;
};

export type ActionProps = {
	children: React.ReactNode;
};

export type TextProps = {
	type: 'title' | 'faded' | 'description';
	children: React.ReactNode;
};
