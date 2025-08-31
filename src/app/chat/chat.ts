import { Component, ElementRef, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgZone } from '@angular/core';
import { Router } from '@angular/router';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './chat.html',
  styleUrls: ['./chat.css']
})
export class Chat implements AfterViewInit {
  messages: Message[] = [];
  userInput: string = '';
  chatCount: number = 0;
  isLoading: boolean = false;
  defaultScreen: boolean = true;

  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private zone: NgZone, 
    private router: Router,
    private ngZone: NgZone
  ) {}

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  sendMessage() {
    let input = this.userInput.trim();
    if (!input) return;
    let chatStatus = 'SaveChat';

    this.chatCount++;
    if (this.chatCount === 1) {
      chatStatus = 'Started';
    }
    this.messages.push({ sender: 'user', text: input });
    this.userInput = '';
    this.isLoading = true;
    this.defaultScreen = false;
    this.scrollToBottom();
    this.cdr.detectChanges();

      this.http.post<{ answer: string }>('https://olliebot-ai.onrender.com/prompt', { input, chatStatus })
        .subscribe({
          next: (res) => {
            this.defaultScreen = false;
            this.messages = [...this.messages, { sender: 'bot', text: res.answer }];
            this.isLoading = false;
            this.cdr.markForCheck();  // forces UI refresh if OnPush
            setTimeout(() => this.scrollToBottom(), 50); // let DOM update first
          },
          error: () => {
            this.defaultScreen = false;
            this.messages = [...this.messages, { sender: 'bot', text: "Oops! Something went wrong." }];
            this.isLoading = false;
            this.cdr.markForCheck();
            setTimeout(() => this.scrollToBottom(), 50);
          }
        });


  }

  private scrollToBottom(): void {
    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        if (this.chatContainer?.nativeElement) {
          this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
        }
      }, 100); // small delay ensures DOM is updated
    });
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}
