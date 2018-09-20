var tones =  {
	context : new AudioContext(),

	playMajorTriad : function() {
		this.playTone(3);
		this.playTone(7);
		this.playTone(10);
	},

	getFrequency : function(string, fret) {
		return 440 * Math.pow(guitarSpecs.fretSpacingRatio, stringsToConcertA[string] + fret);
	},

	playNote : function(string, fret) {
		var tone = this.getFrequency(string, fret);
		var oscillator = this.context.createOscillator();
		var gain = this.context.createGain();

		oscillator.type = 'triangle';
		oscillator.frequency.setTargetAtTime(tone, this.context.currentTime, 0);

		oscillator.connect(gain);
  	gain.gain.value = 0.1;
  	gain.connect(this.context.destination);

		oscillator.start(0);

		window.setTimeout(function() {
			oscillator.stop();
		}, 1000);
	},
};
