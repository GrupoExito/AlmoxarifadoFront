import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  AssinaturaDigitalizadaCotacaoDTO,
  AssinaturaDigitalizadaDFDDTO,
  AssinaturaDigitalizadaETPDTO,
  AssinaturaDigitalizadaPedidoCompraDTO,
} from '../_models/assinatura-digitalizada.model';

@Injectable({
  providedIn: 'root',
})
export class AssinaturaDigitalizadaService {
  baseURL = `${environment.apiLegacyUrl}/assinaturadigitalizada`;
  constructor(private http: HttpClient) {}

  assinarDigitalizadaETP(assinarETP: AssinaturaDigitalizadaETPDTO): Observable<AssinaturaDigitalizadaETPDTO> {
    return this.http.post<AssinaturaDigitalizadaETPDTO>(`${this.baseURL}/assinar/etp`, assinarETP);
  }

  assinarDigitalizadaDFD(assinarDFD: AssinaturaDigitalizadaDFDDTO): Observable<AssinaturaDigitalizadaDFDDTO> {
    return this.http.post<AssinaturaDigitalizadaDFDDTO>(`${this.baseURL}/assinar/dfd`, assinarDFD);
  }

  assinarDigitalizadaPedidoCompra(
    assinarPedidoCompra: AssinaturaDigitalizadaPedidoCompraDTO
  ): Observable<AssinaturaDigitalizadaPedidoCompraDTO> {
    return this.http.post<AssinaturaDigitalizadaPedidoCompraDTO>(
      `${this.baseURL}/assinar/pedidocompra`,
      assinarPedidoCompra
    );
  }

  assinarDigitalizadaCotacao(
    assinarCotacao: AssinaturaDigitalizadaCotacaoDTO
  ): Observable<AssinaturaDigitalizadaCotacaoDTO> {
    return this.http.post<AssinaturaDigitalizadaCotacaoDTO>(`${this.baseURL}/assinar/cotacao`, assinarCotacao);
  }
}
