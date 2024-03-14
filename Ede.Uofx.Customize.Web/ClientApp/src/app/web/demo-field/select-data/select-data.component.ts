import { UofxDialog, UofxDialogController } from "@uofx/web-components/dialog";

import { Component } from "@angular/core";
import { FormDirtyConfirm } from "@uofx/core";

@Component({
  selector: 'app-select-data',
  templateUrl: './select-data.component.html',
  styleUrls: ['./select-data.component.css']
})
export class SelectDataComponent extends UofxDialog {

  visible:boolean = true;

   constructor(private dialogCtrl: UofxDialogController) {
     super();
   }

   Add()
   {
      this.close("1234");

   }
}



