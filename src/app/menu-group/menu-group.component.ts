import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'hb-menu-group',
  templateUrl: './menu-group.component.html',
  styleUrls: ['./menu-group.component.scss']
})
export class MenuGroupComponent {
  @Input() createItemLabel: string;
  @Input() compact = false;
  @Input() icon: string;
  @Input() itemList: any[] = [];
  @Input() title: string;

  @Output() createItem: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectItem: EventEmitter<any> = new EventEmitter<any>();

  toggleGroup() {
    this.compact = !this.compact;
  }
}
