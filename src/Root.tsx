import {Composition} from 'remotion';
import {UpperThird} from './UpperThird';

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="Overlay"
				component={UpperThird}
				durationInFrames={75}
				fps={30}
				width={1920}
				height={1080}
			/>
		</>
	);
};
