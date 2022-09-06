export default class Scrambler {
	private characters: string[];
	private maxCounter: number;
	private targetText: string;
	private scrambledText: string;
	private encodingCounters: any[];
	private decodingCounters: any[];
	private onScramble: any;
	private frameId: null | number;
	private frameIndex: number;

	static get CHARACTERS() {
		return {
			DEFAULT: ['@', '#', '$', '%', '£', '&', '*', '§', '+', '_'],
			ALPHABET: [
				'a',
				'b',
				'c',
				'd',
				'e',
				'f',
				'g',
				'h',
				'i',
				'j',
				'k',
				'l',
				'm',
				'n',
				'o',
				'p',
				'q',
				'r',
				's',
				't',
				'u',
				'v',
				'w',
				'x',
				'y',
				'z'
			]
		};
	}

	constructor() {
		this.characters = [...Scrambler.CHARACTERS.DEFAULT];
		this.maxCounter = 45;

		this.targetText = '';
		this.scrambledText = '';
		this.encodingCounters = [];
		this.decodingCounters = [];
		this.onScramble = null;

		this.frameId = null;
		this.frameIndex = 0;
	}

	scramble(text: string, onScramble: any, option: { characters?: string[] } | null = null) {
		if (option?.characters) {
			this.characters = [...option.characters];
		} else {
			this.characters = [...Scrambler.CHARACTERS.DEFAULT];
		}
		this.targetText = text;
		this.encodingCounters = this._generateCounters(this.scrambledText);
		this.decodingCounters = this._generateCounters(this.targetText);
		this.onScramble = onScramble;

		this.frameId = null;
		this.frameIndex = 0;

		this.frameId = requestAnimationFrame(() => this._encode());
	}

	_randomText(length: number) {
		let text = '';
		for (let i = 0; i < length; i += 1) {
			text += this.characters[Math.floor(Math.random() * this.characters.length)];
		}
		return text;
	}

	_generateCounters(text: string) {
		return new Array(text.length)
			.fill(0)
			.map(() => Math.floor(Math.random() * this.maxCounter) + 1);
	}

	_encode() {
		if (this.frameIndex === 0) {
			const finished = this.encodingCounters.reduce((acc, crr) => acc + crr, 0) === 0;
			if (finished) {
				this.frameId = requestAnimationFrame(() => this._fill());
				return;
			}

			for (let i = 0; i < this.encodingCounters.length; i += 1) {
				if (this.encodingCounters[i] === 0) {
					const temp = this.scrambledText.split('');
					temp[i] = this._randomText(1);
					this.scrambledText = temp.join('');
					continue;
				}
				this.encodingCounters[i] -= 1;
				this.onScramble(this.scrambledText);
			}
		}

		this.frameIndex = (this.frameIndex + 1) % 3;
		this.frameId = requestAnimationFrame(() => this._encode());
	}

	_fill() {
		if (this.frameIndex === 0) {
			const finished = this.scrambledText.length === this.targetText.length;
			if (finished) {
				this.frameId = requestAnimationFrame(() => this._decode());
				return;
			}

			const increase = this.scrambledText.length < this.targetText.length ? 1 : -1;
			this.scrambledText = this._randomText(this.scrambledText.length + increase);
			this.onScramble(this.scrambledText);
		}

		this.frameIndex = (this.frameIndex + 1) % 2;
		this.frameId = requestAnimationFrame(() => this._fill());
	}

	_decode() {
		const finished = this.scrambledText === this.targetText;
		if (finished) {
			cancelAnimationFrame(this.frameId);
			return;
		}

		if (this.frameIndex === 0) {
			let decodingText = '';
			for (let i = 0; i < this.decodingCounters.length; i += 1) {
				if (this.decodingCounters[i] === 0) {
					decodingText += this.targetText[i];
					continue;
				}
				decodingText += this.characters[Math.floor(Math.random() * this.characters.length)];
				this.decodingCounters[i] -= 1;
			}
			this.scrambledText = decodingText;
			this.onScramble(this.scrambledText);
		}

		this.frameIndex = (this.frameIndex + 1) % 4;
		this.frameId = requestAnimationFrame(() => this._decode());
	}
}
