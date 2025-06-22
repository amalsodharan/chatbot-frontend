import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  constructor(private router: Router) {}

  activeTab: string = 'home';
  features = [
    {
      title: 'AI-Powered Responses',
      description: 'Leverages advanced natural language processing to provide fast, accurate, and human-like replies.',
      image: 'assets/features/ai-responses.jpg'
    },
    {
      title: 'Multilingual Support',
      description: 'Communicate effortlessly in multiple languages, expanding your reach globally.',
      image: 'assets/features/multilingual.jpg'
    },
    {
      title: '24/7 Availability',
      description: 'ollieBot.ai works round-the-clock to support users and handle queries anytime, anywhere.',
      image: 'assets/features/availability.jpg'
    },
    {
      title: 'Seamless Integrations',
      description: 'Connect with tools like Slack, WhatsApp, CRM systems, and websites for smoother workflows.',
      image: 'assets/features/integrations.jpg'
    },
    {
      title: 'Conversation History',
      description: 'Keeps a smart log of interactions to help users revisit and continue their previous chats.',
      image: 'assets/features/history.jpg'
    },
    {
      title: 'Custom PersonalityCustom Personality',
      description: 'Tune your bot’s tone and style to match your brand — professional, friendly, or quirky.',
      image: 'assets/features/personality.jpg'
    }
  ];

  switchTab(tab: string) {
    this.activeTab = tab;
  }

  startChat() {
    this.router.navigate(['/chat']);
  }
}
