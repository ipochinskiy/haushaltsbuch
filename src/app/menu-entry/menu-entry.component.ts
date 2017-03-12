import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'hb-menu-entry',
  templateUrl: './menu-entry.component.html',
  styleUrls: ['./menu-entry.component.scss']
})
export class MenuEntryComponent {
  @Input() icon = '';
  @Input() label: string;
  @Output() click: EventEmitter<any> = new EventEmitter<any>();
}
