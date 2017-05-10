import {
  Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, Input, OnDestroy, OnInit, ViewChild,
  ViewContainerRef
} from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-render',
  template: `
    <ng-template #containerRef></ng-template>
  `
})
export class RenderComponent implements OnInit, OnDestroy {
  @Input()
  renderComponent;
  @Input()
  renderValue: any;
  @Input()
  renderSubject: Subject<any> | Subject<any>[];
  @ViewChild('containerRef', { read: ViewContainerRef })
  containerRef: ViewContainerRef;
  componentRef: ComponentRef<any>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    if (!this.componentRef) {
      this.createComponent();
    }
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  // dynamicTarget
  protected createComponent() {
    const componentFactory: ComponentFactory<any> = this.componentFactoryResolver.resolveComponentFactory(this.renderComponent);
    this.componentRef = this.containerRef.createComponent(componentFactory);

    this.componentRef.instance.renderValue = this.renderValue;
    this.componentRef.instance.renderSubject = this.renderSubject;
  }
}
