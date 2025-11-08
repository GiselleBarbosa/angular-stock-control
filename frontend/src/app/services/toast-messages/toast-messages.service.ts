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

  /**
 * Exibe uma mensagem toast personalizada na tela.
 *
 * @param severity - Severidade da mensagem (success, info, warn, error).
 * @param titleMessage - Título/resumo exibido no toast.
 * @param detailMessage - Texto detalhado da mensagem.
 * @param lifeMessage - (Opcional) Tempo de exibição do toast em milissegundos. Padrão: 2000ms.
 *
 * Exemplo de uso:
 *   this.toastMessage.show(Severity.SUCCESS, 'Sucesso!', 'Operação realizada com sucesso.', 3000);
 */
  show(severity: Severity, titleMessage: string, detailMessage: string, life?: number) {
    this.messageService.add({ severity: severity, summary: titleMessage, detail: detailMessage, life: life });
  }
}
