import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BasePage } from '../base-page';
import { Page } from '../../shared/page';
import { Pageable } from '../../shared/pageable';
import { TableColumn } from '../../components/table/table-column';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { ItemListDialogComponent } from '../../components/dialog/item-list/item-list-dialog.component';
import { ServerDetectionService } from './server-detection.service';

@Component({
  selector: 'app-server-detection',
  templateUrl: './server-detection.component.html',
  styleUrls: ['./server-detection.component.scss'],
  providers: [ServerDetectionService]
})
export class ServerDetectionComponent extends BasePage implements OnInit {

  columns: TableColumn[] = [];
  data = [];

  constructor(protected snackBar: MdSnackBar,
    private dialog: MdDialog,
    private serverDetectionService: ServerDetectionService) {
    super(snackBar);
  }

  ngOnInit() {
    this.columns = [
      { key: 'name', name: '服务器' },
      { key: 'url', name: '访问链接' },
      { key: 'status', name: '状态', sortable: true }
    ];

    this.search();
  }

  search() {
    this.startQuery();
    return this.serverDetectionService.query().$observable
      .subscribe((data) => {
        this.data = data;
        this.completeQuery();
      }, this.handleError.bind(this));
  }
}
