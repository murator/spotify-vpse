import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';

declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})
export class VoiceRecognitionService {
  recognition = new webkitSpeechRecognition();
  isStoppedSpeechRecog = false;
  text = '';
  tempWords;

  currentSearchTermSubject = new Subject<any>();

  constructor() { }

  init() {
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';

    this.recognition.addEventListener('result', (event: any) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join('');
      this.tempWords = transcript;
    });
  }

  start() {
    this.text = '';
    this.isStoppedSpeechRecog = false;
    this.recognition.start();
    this.recognition.addEventListener('end', (condition: any) => {
      if (this.isStoppedSpeechRecog) {
        this.recognition.stop();
      } else {
        this.wordConcat()
        this.currentSearchTermSubject.next({ searchQuery: this.text, searchType: 'track' });
        this.recognition.stop();
      }
    });
  }

  stop() {
    this.isStoppedSpeechRecog = true;
    this.recognition.stop();
  }

  wordConcat() {
    this.text = this.text + ' ' + this.tempWords + ' ';
    this.tempWords = '';
  }
}
