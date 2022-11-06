import { Avatar } from './Avatar';
import { CardProps } from './types';
import { Text } from './Text';
import { Action } from './Action';
import { Image } from './Image';

export const Card = ({ children }: CardProps) => {
	return <>{children}</>;
};

Card.Avatar = Avatar;
Card.Text = Text;
Card.Action = Action;
Card.Image = Image;
