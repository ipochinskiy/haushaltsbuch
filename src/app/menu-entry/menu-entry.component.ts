import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';

@Component({
  selector: 'hb-menu-entry',
  templateUrl: './menu-entry.component.html',
  styleUrls: ['./menu-entry.component.scss']
})
export class MenuEntryComponent extends OnChanges {
  @Input() active = false;
  @Input() icon: string;
  @Input() label: string;
  @Output() click: EventEmitter<any> = new EventEmitter<any>();

  classes: any;

  ngOnChanges() {
    this.classes = {
      'entry--active': this.active,
      ['icon--' + this.icon]: !!this.icon,
    };
  }
}
