
class ScreenReaderService {
  private speechSynthesis: SpeechSynthesis;
  private utterance: SpeechSynthesisUtterance | null = null;
  
  constructor() {
    this.speechSynthesis = window.speechSynthesis;
  }

  speak(text: string, onEnd?: () => void) {
    if (this.utterance) {
      this.speechSynthesis.cancel();
    }

    this.utterance = new SpeechSynthesisUtterance(text);
    this.utterance.rate = 1;
    this.utterance.pitch = 1;
    
    if (onEnd) {
      this.utterance.onend = onEnd;
    }

    this.speechSynthesis.speak(this.utterance);
  }

  stop() {
    this.speechSynthesis.cancel();
  }

  getElementDescription(element: HTMLElement): string {
    // Enhanced element description logic
    const role = element.getAttribute('role') || element.tagName.toLowerCase();
    const label = element.getAttribute('aria-label');
    const text = element.textContent?.trim();
    const value = (element as HTMLInputElement).value?.trim();
    const placeholder = element.getAttribute('placeholder');
    
    const parts: string[] = [];
    
    if (role) parts.push(role);
    if (label) parts.push(label);
    if (value) parts.push(`value: ${value}`);
    if (placeholder && !value) parts.push(`placeholder: ${placeholder}`);
    if (text && text !== value && text !== label) parts.push(text);
    
    return parts.join(', ');
  }
}

export const screenReader = new ScreenReaderService();