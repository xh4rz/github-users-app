import { Button, SvgIconTypeMap } from '@mui/material';
import { primaryColor } from '../themeRegistry/theme';
import { OverridableComponent } from '@mui/material/OverridableComponent';

interface Props {
	title: string;
	icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
		muiName: string;
	};
	type?: 'reset' | 'submit' | 'button';
	variant?: 'contained' | 'outlined' | 'text';
	color?: 'primary' | 'secondary';
	onHandleClick?: () => void;
}

export const CustomButton = ({
	title,
	icon: Icon,
	type = 'button',
	variant = 'contained',
	color = 'primary',
	onHandleClick = () => {}
}: Props) => {
	return (
		<Button
			fullWidth
			variant={variant}
			type={type}
			color={color}
			sx={{
				textTransform: 'capitalize',
				bgcolor:
					type === 'reset'
						? '#F44336'
						: variant === 'contained'
						? primaryColor
						: ''
			}}
			startIcon={<Icon />}
			onClick={onHandleClick}
		>
			{title}
		</Button>
	);
};
