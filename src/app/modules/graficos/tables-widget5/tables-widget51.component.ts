import { Component, OnInit } from '@angular/core';

type Tabs = 'kt_table_widget_5_tab_1' | 'kt_table_widget_5_tab_2' | 'kt_table_widget_5_tab_3';

@Component({
  selector: 'app-tables-widget51',
  templateUrl: './tables-widget51.component.html',
})
export class TablesWidget51Component implements OnInit {
  constructor() {}

  activeTab: Tabs = 'kt_table_widget_5_tab_1';

  setTab(tab: Tabs) {
    this.activeTab = tab;
  }

  activeClass(tab: Tabs) {
    return tab === this.activeTab ? 'show active' : '';
  }

  ngOnInit(): void {}
}
