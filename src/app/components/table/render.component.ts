import {
  Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, EventEmitter, Input, OnDestroy, OnInit, Output,
  ViewChild, ViewContainerRef
} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-render',
  template: `
    <ng-template #containerRef></ng-template>
  `
})
export class RenderComponent implements OnInit, OnDestroy {
  @ViewChild('containerRef', { read: ViewContainerRef })
  containerRef: ViewContainerRef;
  componentRef: ComponentRef<any>;
  @Input()
  renderComponent;
  @Input()
  renderValue: any;
  @Output()
  view = new EventEmitter<any>();
  @Output()
  edit = new EventEmitter<any>();

  viewSubject: Subject<any> = new Subject();
  viewObservable: Observable<any> = this.viewSubject.asObservable();
  viewSubscription: Subscription;

  editSubject: Subject<any> = new Subject();
  editObservable: Observable<any> = this.editSubject.asObservable();
  editSubscription: Subscription;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    this.viewSubscription = this.viewObservable.subscribe((value) => this.view.emit(value));
    this.editSubscription = this.editObservable.subscribe((value) => this.edit.emit(value));
  }

  ngOnInit() {
    if (isNullOrUndefined(this.componentRef)) {
      this.createComponent();
    }
  }

  ngOnDestroy() {
    if (!isNullOrUndefined(this.componentRef)) {
      this.componentRef.destroy();
    }
    if (!isNullOrUndefined(this.viewSubscription)) {
      this.viewSubscription.unsubscribe();
    }
    if (!isNullOrUndefined(this.editSubscription)) {
      this.editSubscription.unsubscribe();
    }
  }

  // dynamicTarget
  protected createComponent() {
    const componentFactory: ComponentFactory<any> = this.componentFactoryResolver.resolveComponentFactory(this.renderComponent);
    this.componentRef = this.containerRef.createComponent(componentFactory);

    this.componentRef.instance.renderValue = this.renderValue;
    this.componentRef.instance.renderViewSubject = this.viewSubject;
    this.componentRef.instance.renderEditSubject = this.editSubject;
  }
}
