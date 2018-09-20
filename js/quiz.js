var quiz = {
	searchingForToneText : "",
	disabledStrings :[],
	searchingForTone : -1,
	streak : 0,

	newQuery : function() {
		var topCanvas = document.getElementById("topCanvas");
		var topCtx = topCanvas.getContext("2d");

		var output =  document.getElementById("output");

		topCtx.clearRect(0, 0, topCanvas.width, topCanvas.height);

		this.searchingForTone = Math.floor(Math.random() * chromatic.length);
		var tone = chromatic[this.searchingForTone];
		this.searchingForToneText = tone[Math.floor(Math.random() * tone.length)];
		output.innerHTML = "Find the note " + this.searchingForToneText + " without using the grayed out strings.";
		var nDisabled = Math.floor(Math.random() * 5);

		this.disabledStrings = strings.slice();
		for(var i = 0; i < 6 - nDisabled; i++) {
			this.disabledStrings.splice(Math.floor(Math.random() * this.disabledStrings.length), 1);
		}

		guitar.drawStrings(this.disabledStrings);
	},

	checkAnswer : function(x,y,guitar) {
			if(this.searchingForTone < 0) {
				return;
			}

			if(x < guitar.fingerboardStartX
				// || x > guitar.fingerboardEndX
				|| y < guitar.fingerboardStartY
				|| y > guitar.fingerboardEndY) {
					return;
				}

				var nearestString = 0;
				var nearestStringDistance = 1000000;
				for(var i = 0; i < guitar.stringYs.length; i++) {
					var stringY = guitar.stringYs[i];
					var dist = Math.abs(stringY - y);
					if(dist < nearestStringDistance) {
						nearestStringDistance = dist;
						nearestString = i;
					}
				}

				if(this.disabledStrings.indexOf(strings[nearestString]) >= 0) {
					return;
				}

				var nearestFret = 0;
				var nearestFretDistance = 1000000;
				for(var i = 0; i < guitar.fretXs.length; i++) {
					var fretX = guitar.fretXs[i];
					var dist = fretX - x;
					if(dist < 0) break;

					if(dist < nearestFretDistance) {
						nearestFretDistance = dist;
						nearestFret = i + 1;
					}
				}

				if(!document.getElementById("muted").checked) {
					tones.playNote(nearestString, nearestFret);
				}

				var topCanvas = document.getElementById("topCanvas");
				var topCtx = topCanvas.getContext("2d");

				topCtx.clearRect(0, 0, topCanvas.width, topCanvas.height);

				topCtx.fillStyle = "#FF69B4";
				topCtx.strokeStyle = "#FF69B4";

				topCtx.beginPath();
				topCtx.arc(guitar.fretXs[nearestFret], guitar.stringYs[nearestString], guitar.inlaySize, 0, 2 * Math.PI, false);
				topCtx.fill();

				var chromaticRoot = stringToChromatic[nearestString];
				var toneIndex = (chromaticRoot + nearestFret) % chromatic.length;

				if(this.searchingForTone == toneIndex) {
					output.innerHTML = "Great Job!";
					this.streak++;
					document.getElementById("streak").innerHTML = this.streak;
					return true;
				} else {
					output.innerHTML = "Oops, you selected the note " + chromatic[toneIndex] + ". Give it another try! Find the note " + this.searchingForToneText;
					this.streak = 0;
					document.getElementById("streak").innerHTML = this.streak;
					return false;
				}
	}

};
