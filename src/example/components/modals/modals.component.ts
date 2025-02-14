import {Component, Inject, OnInit} from '@angular/core';
import {ModalDismissReasons, NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import {DOCUMENT} from '@angular/common';

@Component({
    selector: 'app-modals',
    templateUrl: './modals.component.html',
    styles: [`
        #modalExample .modal {
            opacity: 1;
            display: block;
            position: initial;
        }
        .modal.active {
            display: block;
        }
    `]
})
export class ModalsComponent implements OnInit {

    modal = false;
    slideModal = false;
    takeOverModal = false;
    closeResult: string;

    constructor(@Inject(DOCUMENT) private document: Document,
                private modalService: NgbModal) {}

    open(content, options? : NgbModalOptions) {

      const modalRef = this.modalService.open(content, {...options, ariaLabelledBy: 'modal-basic-title'});

      // workaround for iOS scroll that allows scroll in modal body
      const contentBody = document.getElementsByTagName('ngb-modal-window')[0];
      modalRef.result.then((result) => {
          clearAllBodyScrollLocks();
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
          clearAllBodyScrollLocks();
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });

      disableBodyScroll(contentBody);
    }

    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return  `with: ${reason}`;
      }
    }

    ngOnInit() {
    }

}
