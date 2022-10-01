import { StartBoldIcon, StartOutlineIcon } from './icon';

const RatingComponent: React.FC<{ rating: number }> = ({ rating }) => {
	return (
		<div className="flex flex-row">
			{[1, 2, 3, 4, 5].map((i) => {
				let ShowIcon;
				if (i <= rating) {
					ShowIcon = StartBoldIcon;
				} else {
					ShowIcon = StartOutlineIcon;
				}
				return <ShowIcon key={`i-${i}`} />;
			})}
		</div>
	);
};
export default RatingComponent;
