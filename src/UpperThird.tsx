import {useCallback} from 'react';
import React, {useMemo} from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {loadFont} from '@remotion/google-fonts/OpenSans';

const {fontFamily} = loadFont();

const title: React.CSSProperties = {
	fontFamily,
	fontSize: '5em',
	color: '#000',
	fontWeight: 'bold',
};

const text: React.CSSProperties = {
	fontWeight: 'bold',
	fontFamily,
	fontSize: '2.5em',
	color: '#4290F5',
};

export const UpperThird: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const entry = useCallback(
		(delay: number) =>
			spring({
				fps,
				frame: frame - delay,
				config: {
					mass: 0.5,
				},
			}),
		[fps, frame]
	);

	const out = spring({
		fps,
		frame: frame - durationInFrames + 20,
		config: {
			damping: 200,
		},
	});

	const rotate = interpolate(out, [0, 1], [0, -Math.PI / 20]);
	const outY = interpolate(out, [0, 1], [0, -500]);

	const container: React.CSSProperties = useMemo(() => {
		return {
			position: 'absolute',
			backgroundColor: 'white',
			borderRadius: 25,
			right: 90,
			top: 90,
			transform: `scale(${entry(
				0
			)})  translateY(${outY}px) rotate(${rotate}rad)`,
			padding: 40,
		};
	}, [entry, outY, rotate]);
	return (
		<AbsoluteFill>
			<div style={container}>
				<div style={title}>Look</div>
				<div style={text}>I'm an overlay!</div>
			</div>
		</AbsoluteFill>
	);
};
