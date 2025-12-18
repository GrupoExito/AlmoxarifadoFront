import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ModeloDocumento } from '../_models/modelo-documento.model';
import { ModeloDocumentoService } from '../_services/modelo-documento.service';
import { Editor, Toolbar } from 'ngx-editor';
import { CKEditorComponent } from 'ng2-ckeditor';

@Component({
  selector: 'app-modelo-documento-editar',
  templateUrl: './modelo-documento-editar.component.html',
  styleUrls: ['./modelo-documento-editar.component.scss'],
})
export class ModeloDocumentoEditarComponent implements OnInit {
  modeloDocumento: ModeloDocumento;
  editarModeloDocumentoForm: FormGroup;
  id: number;
  htmlContent = '';
  mycontent: string;
  ckeConfig: CKEDITOR.config;
  @ViewChild('myckeditor') ckeditor: CKEditorComponent;
  items: string[] = ['Noah', 'Liam', 'Mason', 'Jacob'];
  editor: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  constructor(
    private fb: FormBuilder,
    private modeloDocumentoService: ModeloDocumentoService,
    private routeActive: ActivatedRoute,
    private route: Router
  ) {
    this.mycontent = '';
  }

  ngOnInit(): void {
    this.ckeConfig = {
      allowedContent: false,
      forcePasteAsPlainText: true,
      removePlugins: 'exportpdf',
    };
    this.editor = new Editor();
    this.id = Number(this.routeActive.snapshot.paramMap.get('id'));
    this.editarModeloDocumentoForm = this.fb.group({
      descricao: ['', [Validators.required, Validators.maxLength(50)]],
      tipo: ['', Validators.required],
    });
    this.modeloDocumentoService.consultarPorId(this.id).subscribe({
      next: (modeloDocumento) => {
        console.log(modeloDocumento);
        this.editarModeloDocumentoForm.patchValue(modeloDocumento);
        this.mycontent = modeloDocumento.modelo;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  editar() {
    Swal.showLoading();
    const modeloDocumento: ModeloDocumento = {
      id: this.id,
      descricao: this.editarModeloDocumentoForm.get('descricao')!.value,
      tipo: this.editarModeloDocumentoForm.get('tipo')!.value,
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

    this.modeloDocumentoService.editar(this.id, modeloDocumento).subscribe({
      next: () => {
        Swal.close();
        Swal.fire('Atualizado!', 'Modelo atualizado com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.route.navigate(['/modelodocumento/editar', this.id]);
          }
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  format(item: any) {
    return '@' + item.label + ' ';
  }
}
