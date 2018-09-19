var distortion = 3;

var guitarSpecs = {
	fullGuitarLengthMM : 997,
	fullNeckPieceLengthMM : 658,
	fingerboardLengthMM : 468.3,
	fingerboardWidthMM : 43 * distortion,
	scaleLengthMM : 647.7,
	bridgeLengthMM : 19,
	bridgeWidthMM : 78 * distortion,

	fretSpacingRatio : 1.059463,
	nFrets : 22,
	inlayFrets : [3,5,7,9,12,15,17,19,21],
	doubleInlayFrets : [12],

	tunerRotation : 17 / 180 * Math.PI,
	tunerCenterFromNutMM : 102.70,
	tunerArrayLengthMM : 123,
	smallTunerOffsetFromCenterLineMM : 2.5,
};

var strings = ["E", "A", "D", "G", "B", "e"];
var stringToChromatic = [7, 0, 5, 10, 2, 7];

var chromatic = [
	["A"],
	["A#", "Bb"],
	["B"],
	["C"],
	["C#", "Db"],
	["D"],
	["D#", "Eb"],
	["E"],
	["F"],
	["F#", "Gb"],
	["G"],
	["G#", "Ab"],
];
