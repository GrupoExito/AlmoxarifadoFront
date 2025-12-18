import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ModeloDocumento, TipoModelo } from '../_models/modelo-documento.model';
import { ModeloDocumentoService } from '../_services/modelo-documento.service';
import { Editor, Toolbar } from 'ngx-editor';
import { CKEditorComponent } from 'ng2-ckeditor';

@Component({
  selector: 'app-modelo-documento-criar',
  templateUrl: './modelo-documento-criar.component.html',
  styleUrls: ['modelo-documento-criar.component.scss'],
})
export class ModeloDocumentoCriarComponent implements OnInit {
  modeloDocumento: ModeloDocumento;
  criarModeloDocumentoForm: FormGroup;
  tiposModelo = TipoModelo;
  htmlContent = '';
  mycontent: string;
  ckeConfig: CKEDITOR.config;
  @ViewChild('myckeditor') ckeditor: CKEditorComponent;
  editor: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  constructor(private fb: FormBuilder, private modeloDocumentoService: ModeloDocumentoService, private route: Router) {
    this.mycontent = '';
  }

  ngOnInit(): void {
    this.ckeConfig = {
      allowedContent: false,
      forcePasteAsPlainText: true,
      removePlugins: 'exportpdf',
    };
    this.editor = new Editor();
    this.criarModeloDocumentoForm = this.fb.group({
      descricao: ['', [Validators.required, Validators.maxLength(50)]],
      tipo: ['', Validators.required],
    });
  }

  criar() {
    Swal.showLoading();
    const modeloDocumento: ModeloDocumento = {
      descricao: this.criarModeloDocumentoForm.get('descricao')!.value,
      tipo: this.criarModeloDocumentoForm.get('tipo')!.value,
      modelo: this.mycontent,
    };

    var regex = /(&lt;&lt;)(.*?)(&gt;&gt;)/gs;
    var found = this.mycontent.match(regex);
    var campos = '';

    found?.forEach((campo) => {
      campo = campo.replace('&lt;&lt;', '');
      campo = campo.replace('&gt;&gt;', '');
      campos = campos + campo + ',';
    });
    campos = campos.slice(0, -1);

    if (campos) {
      modeloDocumento.campos = campos;
    }

    this.modeloDocumentoService.criar(modeloDocumento).subscribe({
      next: () => {
        Swal.close();
        Swal.fire('Criado!', 'Modelo criado com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.route.navigate(['/modelodocumento']);
          }
        });
      },
      error: (error) => {
        Swal.fire('Erro!', error.error.message, 'error');
      },
    });
  }
}
