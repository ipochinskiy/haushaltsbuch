import {
  Component,
} from '@angular/core';

@Component({
  selector: 'hb-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  accountList: any[] = [
    { id: 1, name: 'Account 1', active: true },
    { id: 2, name: 'Account 2' },
  ];
  budgetList: any[] = [
    { id: 1, name: 'Budget 1' },
    { id: 2, name: 'Budget 2' },
  ];

  createAccount() {}
  createBudget() {}
  selectAccount() {}
  selectBudget() {}
  selectPlanned() {}
  selectReports() {}
}
