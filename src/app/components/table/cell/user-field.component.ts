import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { UserFieldService } from './user-field.service';
import { BasePage } from '../../../pages/base-page';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { PromptDialogComponent } from 'app/components/dialog/prompt/prompt-dialog.component';
import { UserHelper } from '../../../helper/user-helper';
import { AvatarHelper } from '../../../helper/avatar-helper';

@Component({
  selector: 'app-user-field',
  template: `
    <app-preview #ele [text]="getDisplayName(user)"
                 [thumbnail]="getAvatar(user)?.small"
                 [original]="getAvatar(user)?.big" (click)="showPrivacy()">
    </app-preview>`,
  styles: [``],
  providers: [UserFieldService]
})
export class UserFieldComponent extends BasePage implements OnInit {
  @Input()
  user: any;
  plain = false;

  constructor(
    snackBar: MdSnackBar,
    private userFieldService: UserFieldService,
    private dialog: MdDialog,
    private eleRef: ElementRef
  ) {
    super(snackBar);
  }

  ngOnInit() { }

  showPrivacy() {
    if (this.plain) {
      return;
    }
    const userId = this.user &&　this.user.id;
    if (!userId) {
      this.snackBar.open('数据有误', '知道了', { duration: 5000 });
      return;
    }
    const dialogRef: MdDialogRef<PromptDialogComponent> = this.dialog.open(PromptDialogComponent);
    dialogRef.componentInstance.content = '请输入口令：';
    dialogRef.afterClosed()
      .filter(result => result && result !== 'cancel')
      .switchMap((result) => this.withHandler(this.userFieldService.get({
        userId: userId,
        showPrivacy: true,
        goldenCode: result
      }).$observable))
      .subscribe(user => {
        this.user = user;
        this.plain = true;
      });
  }

  getDisplayName(user) {
    return UserHelper.getDisplayName(user);
  }

  getAvatar(user) {
    return AvatarHelper.parseFromUser(user);
  }
}
