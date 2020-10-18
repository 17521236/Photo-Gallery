import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Photo } from '../models/photo.model';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  constructor(public _photo: PhotoService, public actionSheetController: ActionSheetController) { }

  async ngOnInit() {
    await this._photo.loadSaved();
  }

  takePhoto() {
    this._photo.addNewToGallery();
  }

  async showActionSheet(photo: Photo, i: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Actions',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this._photo.deletePicture(photo, i);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel',
        icon: 'close',
        handler: () => {
          //  auto close
        }
      }]
    })

    await actionSheet.present();
  }
}
