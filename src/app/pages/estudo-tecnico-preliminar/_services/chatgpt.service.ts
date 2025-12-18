import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChatGpt, ChatGptAr, ResponseChatGpt } from '../_models/chatgpt.model';
import { ChatGptDfd } from '@pages/solicitacao-despesa/_models/dfd.model';

@Injectable({
  providedIn: 'root',
})
export class ChatGptService {
  baseURL = `${environment.apiLegacyUrl}/ChatGpt`;
  constructor(private http: HttpClient) {}

  pedirSugestao(chatGpt: ChatGpt): Observable<ResponseChatGpt[]> {
    return this.http.post<ResponseChatGpt[]>(`${this.baseURL}`, chatGpt);
  }

  pedirSugestaoChatGpt(chatGpt: ChatGpt, id: string): Observable<ResponseChatGpt[]> {
    return this.http.post<ResponseChatGpt[]>(`${this.baseURL}/etp/${id}`, chatGpt);
  }

  pedirSugestaoArChatGpt(chatGpt: ChatGptAr, id: string): Observable<ResponseChatGpt[]> {
    return this.http.post<ResponseChatGpt[]>(`${this.baseURL}/ar/${id}`, chatGpt);
  }

  pedirSugestaoDfdChatGpt(chatGpt: ChatGptDfd, id: string): Observable<ResponseChatGpt[]> {
    return this.http.post<ResponseChatGpt[]>(`${this.baseURL}/dfd/${id}`, chatGpt);
  }
}
