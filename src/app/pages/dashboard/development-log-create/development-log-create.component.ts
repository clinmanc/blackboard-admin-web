import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-development-log-create',
  templateUrl: './development-log-create.component.html',
  styleUrls: ['./development-log-create.component.scss']
})
export class DevelopmentLogCreateComponent implements OnInit {
  createForm: FormGroup;
  _value: any;

  @Input()
  set value(value){
    this._value = value || {} as any;
    if (this.createForm) {

      this.createForm.setValue({
        id: this._value.id,
        title: this._value.title,
        content: this._value.content
      });
    }
  }

  get value() {
    this._value = this._value || {} as any;
    return this._value;
  }

  @Output()
  save = new EventEmitter<any>();

  @Output()
  cancel = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.createForm = this.formBuilder.group({
      id: [this.value.id],
      title: [this.value.title, [Validators.required]],
      content: [this.value.content, [Validators.required]]
    });
  }
}
