<script setup lang="ts">
import * as Tone from "tone";
const synth = new Tone.Synth().toDestination();
const keyPressTime = ref<number>(0);
const sequencerStore = useSequencerStore();
const getFullNoteInfo = (midi:number)=>{
	const note = Tone.Frequency(midi, "midi").toNote();
	const frequency = Tone.Frequency(midi, "midi").toFrequency();
	return {
		midi,
		note,
		frequency
	};
};
const midiNotes = computed(()=>{
	const notes = [];
	for(let i = 36; i < 101; i++){
		notes.push(getFullNoteInfo(i));
	}
	return notes;
});

const tempo = inject<number>('tempo');
const quarterNoteDuration = computed(() => 60 / tempo!);

const isBlack = (midi:number)=>{
	const note = Tone.Frequency(midi, "midi").toNote();
	return note.includes("#");
};

const currentNote = ref<number>(60);

const handleClick = (i:any)=>{
	synth.triggerAttackRelease(i.note, '8n');
	currentNote.value = i.midi;
}
const keyboardMapping = {
  q: 36,
  "2": 37,
  w: 38,
  "3": 39,
  e: 40,
  r: 41,
  "5": 42,
  t: 43,
  "6": 44,
  y: 45,
  "7": 46,
  u: 47,
  i: 48,
  "9": 49,
  o: 50,
  "0": 51,
  p: 52,
  "[": 53,
  "=": 54,
  "]": 55,
  z: 56,
  s: 57,
  x: 58,
  d: 59,
  c: 60,
  v: 61,
  g: 62,
  b: 63,
  h: 64,
  n: 65,
  j: 66,
  m: 67,
  ",": 68,
  l: 69,
  ".": 70,
  ";": 71,
  "/": 72,
  Z: 73,
  S: 74,
  X: 75,
  D: 76,
  C: 77,
  V: 78,
  G: 79,
  B: 80,
  H: 81,
  N: 82,
  J: 83,
  M: 84,
  "<": 85,
  L: 86,
  ">": 87,
  ":": 88,
  "?": 89,
  Q: 90,
  "@": 91,
  W: 92,
  "#": 93,
  E: 94,
  R: 95,
  "%": 96,
  T: 97,
  "^": 98,
  Y: 99,
  "&": 100,
};

const handleKeydown = (e: KeyboardEvent) => {
  if (keyboardMapping[e.key]) {
    keyPressTime.value = Date.now();
    const midi = keyboardMapping[e.key];
    const note = Tone.Frequency(midi, "midi").toNote();
    synth.triggerAttack(note);
    currentNote.value = midi;
  }
};

const handleKeyup = (e: KeyboardEvent) => {
  if (keyboardMapping[e.key]) {
    const keyReleaseTime = Date.now();
    const durationMs = keyReleaseTime - keyPressTime.value;
    const durationSec = durationMs / 1000;

    // Calculate the closest note length based on the current BPM
    const closestNoteLength = getClosestNoteLength(durationSec, quarterNoteDuration.value);

    synth.triggerRelease();

    // Push the note to the sequencer store
    sequencerStore.addNoteToSequence({
      midi: currentNote.value,
      frequency: Tone.Frequency(currentNote.value, "midi").toFrequency(),
      note: Tone.Frequency(currentNote.value, "midi").toNote(),
      length: closestNoteLength as any,  // Cast to match ISample type
    });
  }
};
const midiToKeyBoard = (midi: number) => {
  for (let i in keyboardMapping) {
    if (keyboardMapping[i] === midi) {
      return i;
    }
  }
  return null;
};

const getClosestNoteLength = (durationSec: number, quarterNoteSec: number) => {
  const noteLengths = {
    "4n": quarterNoteSec,
    "8n": quarterNoteSec / 2,
    "16n": quarterNoteSec / 4,
    "32n": quarterNoteSec / 8,
		"64n": quarterNoteSec / 16,
		"128n": quarterNoteSec / 32,
  };

  let closestNote = "4n";
  let smallestDifference = Math.abs(durationSec - quarterNoteSec);

  for (const [note, noteSec] of Object.entries(noteLengths)) {
    const difference = Math.abs(durationSec - noteSec);
    if (difference < smallestDifference) {
      closestNote = note;
      smallestDifference = difference;
    }
  }

  return closestNote;
};

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("keyup", handleKeyup);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
  window.removeEventListener("keyup", handleKeyup);
});
</script>
<template>
	<Sequencer/>
<section class="col center tr m-4 fixed">
	<Tempo />
</section>
<section  class="row center bottom-0 absolute text-xs">
<div v-for="i in midiNotes" :key="i.midi">
	<PianoKey :note="{midi: i.midi, frequency: i.frequency, note: i.note, length: '8n'}"
		@click="handleClick(i)"
	>
		<template #default="{note}">
			<div>{{ midiToKeyBoard(i.midi) }}</div>
			<div class="h-12 w-4 sh"
				:class="{
					'bg-black text-white': isBlack(note.midi),
					'bg-white': !isBlack(note.midi),
					
				}"
				:style="
				currentNote === note.midi ? 
				{
					'background': '#cf0 !important',
					'border-radius': '2px'
				} : {}
				"
			>		
		</div>
		</template>
	</PianoKey>
</div>
</section>
</template>