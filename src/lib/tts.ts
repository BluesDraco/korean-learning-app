export function speak(text: string, rate = 0.75) {
  if (typeof window === 'undefined') return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ko-KR';
  utterance.rate = rate;
  window.speechSynthesis.speak(utterance);
}
