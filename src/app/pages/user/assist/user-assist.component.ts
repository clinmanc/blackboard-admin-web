import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { BasePage } from '../../base-page';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-assist',
  templateUrl: './user-assist.component.html',
  styleUrls: ['./user-assist.component.scss'],
  providers: [UserService]
})
export class UserAssistComponent extends BasePage implements OnInit {
  searchForm: FormGroup;
  log: any;

  constructor(
    snackBar: MdSnackBar,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    super(snackBar);
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.searchForm = this.formBuilder.group({
      mobile: ['', [Validators.required, Validators.pattern(/^1\d{10}$/)]]
    });
  }

  search() {
    this.load();
  }

  load() {
    const formModel = this.searchForm.value;

    this.withHandler(this.userService.generateSpy(formModel).$observable)
      .map(log => log as any).subscribe(log => this.log = log);
  }
}
