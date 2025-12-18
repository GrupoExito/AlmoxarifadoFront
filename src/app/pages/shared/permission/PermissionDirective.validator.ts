import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { PermissionService } from 'src/app/modules/auth/services/permission.model';

@Directive({
  selector: '[appPermission]',
})
export class PermissionDirective implements OnInit {
  @Input() appPermission: string[] = [];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private permissionService: PermissionService
  ) {}

  ngOnInit() {
    const tela = this.appPermission[0];
    const acao = this.appPermission[1];
    if (this.permissionService.validarPermissao(tela, acao)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
