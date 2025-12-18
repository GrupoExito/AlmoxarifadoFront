import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TermoReferenciaService } from '../_services/termo-referencia.service';
import { Router } from '@angular/router';
import { ModeloDocumentoService } from '@pages/modelo-documento/_services/modelo-documento.service';
import {
  DecoupledEditor,
  AccessibilityHelp,
  Alignment,
  Autoformat,
  AutoImage,
  AutoLink,
  Autosave,
  BalloonToolbar,
  Bold,
  CloudServices,
  Code,
  Essentials,
  FindAndReplace,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  GeneralHtmlSupport,
  Heading,
  HorizontalLine,
  HtmlComment,
  HtmlEmbed,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  Paragraph,
  RemoveFormat,
  SelectAll,
  ShowBlocks,
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText,
  Strikethrough,
  Subscript,
  Superscript,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextPartLanguage,
  TextTransformation,
  Underline,
  Undo,
  type EditorConfig,
} from 'ckeditor5';
import { ModeloDocumento } from '@pages/modelo-documento/_models/modelo-documento.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-termo-referencial-modelo-documento',
  templateUrl: './termo-referencial-modelo-documento.component.html',
  styleUrls: ['../termo-referencia.component.scss'],
})
export class TermoReferenciaModeloDocumentoComponent implements OnInit, AfterViewInit {
  constructor(
    private termoReferenciaService: TermoReferenciaService,
    private modeloDocumentoService: ModeloDocumentoService,
    private route: Router
  ) {
    // this.mycontent = '';
  }

  @ViewChild('editorToolbarElement') private editorToolbar!: ElementRef<HTMLDivElement>;
  @ViewChild('editorMenuBarElement') private editorMenuBar!: ElementRef<HTMLDivElement>;

  conteudoModelo = '';
  public Editor = DecoupledEditor;
  public config: EditorConfig = {};
  public isLayoutReady = false;
  id: number | null;
  modeloDocumento: ModeloDocumento;
  conteudo = '';
  tinymceInit: any = {
    language: 'pt_BR',
    // base_url: '../../../src/assets/tinymce',
    // language_url: `../../../src/assets/tinymce/langs/pt_BR.js`,
    // suffix: '.min',
    selector: 'textarea#open-source-plugins',
    plugins:
      'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons accordion',
    menubar: 'file edit view insert format tools table help',
    toolbar:
      'undo redo | accordion accordionremove | blocks fontfamily fontsize | bold italic underline strikethrough | align numlist bullist | link | table | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | code preview | save print | pagebreak anchor codesample | ltr rtl',
    image_advtab: true,
    importcss_append: true,
    height: 1200,
    image_caption: true,
    quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
    noneditable_class: 'mceNonEditable',
    toolbar_mode: 'wrap',
    contextmenu: 'link image table',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
  };

  ngOnInit(): void {
    console.log('TR modelo documento');
    this.id = this.termoReferenciaService.getRouteId();
    this.modeloDocumentoService.consultarPorTermoReferencia(this.id!).subscribe({
      next: (modeloDocumento) => {
        this.modeloDocumento = modeloDocumento;
        this.conteudoModelo = modeloDocumento.modelo;
        // this.conteudo = modeloDocumento.modelo;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  ngAfterViewInit() {
    this.config = {
      toolbar: {
        items: [
          'undo',
          'redo',
          '|',
          'showBlocks',
          '|',
          'heading',
          '|',
          'fontSize',
          'fontFamily',
          'fontColor',
          'fontBackgroundColor',
          '|',
          'bold',
          'italic',
          'underline',
          '|',
          'link',
          'insertTable',
          '|',
          'alignment',
          '|',
          'outdent',
          'indent',
        ],
        shouldNotGroupWhenFull: false,
      },
      plugins: [
        AccessibilityHelp,
        Alignment,
        Autoformat,
        AutoImage,
        AutoLink,
        Autosave,
        BalloonToolbar,
        Bold,
        CloudServices,
        Code,
        Essentials,
        FindAndReplace,
        FontBackgroundColor,
        FontColor,
        FontFamily,
        FontSize,
        GeneralHtmlSupport,
        Heading,
        HorizontalLine,
        HtmlComment,
        HtmlEmbed,
        ImageBlock,
        ImageCaption,
        ImageInline,
        ImageInsertViaUrl,
        ImageResize,
        ImageStyle,
        ImageTextAlternative,
        ImageToolbar,
        ImageUpload,
        Indent,
        IndentBlock,
        Italic,
        Link,
        LinkImage,
        Paragraph,
        RemoveFormat,
        SelectAll,
        ShowBlocks,
        SpecialCharacters,
        SpecialCharactersArrows,
        SpecialCharactersCurrency,
        SpecialCharactersEssentials,
        SpecialCharactersLatin,
        SpecialCharactersMathematical,
        SpecialCharactersText,
        Strikethrough,
        Subscript,
        Superscript,
        Table,
        TableCaption,
        TableCellProperties,
        TableColumnResize,
        TableProperties,
        TableToolbar,
        TextPartLanguage,
        TextTransformation,
        // Title,
        Underline,
        Undo,
      ],
      balloonToolbar: ['bold', 'italic', '|', 'link'],
      fontFamily: {
        supportAllValues: true,
      },
      fontSize: {
        options: [10, 12, 14, 'default', 18, 20, 22],
        supportAllValues: true,
      },
      heading: {
        options: [
          {
            model: 'paragraph',
            title: 'Paragraph',
            class: 'ck-heading_paragraph',
          },
          {
            model: 'heading1',
            view: 'h1',
            title: 'Heading 1',
            class: 'ck-heading_heading1',
          },
          {
            model: 'heading2',
            view: 'h2',
            title: 'Heading 2',
            class: 'ck-heading_heading2',
          },
          {
            model: 'heading3',
            view: 'h3',
            title: 'Heading 3',
            class: 'ck-heading_heading3',
          },
          {
            model: 'heading4',
            view: 'h4',
            title: 'Heading 4',
            class: 'ck-heading_heading4',
          },
          {
            model: 'heading5',
            view: 'h5',
            title: 'Heading 5',
            class: 'ck-heading_heading5',
          },
          {
            model: 'heading6',
            view: 'h6',
            title: 'Heading 6',
            class: 'ck-heading_heading6',
          },
        ],
      },
      htmlSupport: {
        allow: [
          {
            name: /^.*$/,
            styles: true,
            attributes: true,
            classes: true,
          },
        ],
      },
      image: {
        toolbar: [
          'toggleImageCaption',
          'imageTextAlternative',
          '|',
          'imageStyle:inline',
          'imageStyle:wrapText',
          'imageStyle:breakText',
          '|',
          'resizeImage',
        ],
      },
      language: 'pt-br',
      link: {
        addTargetToExternalLinks: true,
        defaultProtocol: 'https://',
        decorators: {
          toggleDownloadable: {
            mode: 'manual',
            label: 'Downloadable',
            attributes: {
              download: 'file',
            },
          },
        },
      },
      menuBar: {
        isVisible: true,
      },
      placeholder: 'Conteúdo do Termo de Referência',
      table: {
        contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties'],
      },
    };

    this.isLayoutReady = true;
  }

  atualizarTermoReferencia() {
    Swal.showLoading();
    const modeloDocumento: ModeloDocumento = {
      id: this.modeloDocumento.id,
      descricao: this.modeloDocumento.descricao,
      tipo: this.modeloDocumento.tipo,
      modelo: this.conteudoModelo,
    };

    // var regex = /(&lt;&lt;)(.*?)(&gt;&gt;)/gs;
    // var found = this.mycontent.match(regex);
    // var campos = '';

    // found?.forEach((campo) => {
    //   campo = campo.replace('&lt;&lt;', '');
    //   campo = campo.replace('&gt;&gt;', '');
    //   campos = campos + campo + ',';
    // });
    // campos = campos.slice(0, -1);

    // if (campos) {
    //   modeloDocumento.campos = campos;
    // }

    this.modeloDocumentoService.editar(this.modeloDocumento.id!, modeloDocumento).subscribe({
      next: () => {
        Swal.fire('Atualizado!', 'Modelo atualizado com sucesso!', 'success');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  public onReady(editor: DecoupledEditor): void {
    Array.from(this.editorToolbar.nativeElement.children).forEach((child) => child.remove());
    Array.from(this.editorMenuBar.nativeElement.children).forEach((child) => child.remove());

    this.editorToolbar.nativeElement.appendChild(editor.ui.view.toolbar.element!);
    this.editorMenuBar.nativeElement.appendChild(editor.ui.view.menuBarView.element!);
  }

  log() {
    // console.log(this.conteudo);
  }
}
