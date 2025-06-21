import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

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
export class Chat {
  messages: Message[] = [];
  userInput: string = '';
  isLoading: boolean = false;
  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  sendMessage() {
    const input = this.userInput.trim();
    if (!input) return;

    this.messages.push({ sender: 'user', text: input });
    this.isLoading = true;
    this.userInput = '';

    this.http.post<{ answer: string }>('http://localhost:8080/prompt', { input })
      .subscribe({
        next: (res) => {
          this.messages.push({ sender: 'bot', text: res.answer });
          this.isLoading = false;
          this.cdr.detectChanges(); // 👈 Force UI update
        },
        error: () => {
          this.messages.push({ sender: 'bot', text: "Oops! Something went wrong." });
          this.isLoading = false;
          this.cdr.detectChanges(); // 👈 Force UI update
        }
      });
  }

}
