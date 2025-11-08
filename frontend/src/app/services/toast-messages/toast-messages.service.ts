import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Severity } from 'src/app/enum/severity.enum';

@Injectable({
  providedIn: 'root'
})
export class ToastMessagesService {

  constructor(
    private messageService: MessageService
  ) { }

  show(statusMessage: Severity, titleMessage: string, detailMessage: string, lifeMessage?: number) {
    this.messageService.add({ severity: statusMessage, summary: titleMessage, detail: detailMessage, life: 2000 });
  }
}
