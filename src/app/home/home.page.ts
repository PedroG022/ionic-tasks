import { PopoverComponent } from './../popover/popover.component';
import { TaskService } from './../services/task.service';
import { Component } from '@angular/core';
import { AlertController, PopoverController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  type : string = "pending"

  constructor(
    private alertController: AlertController, 
    public taskService: TaskService, 
    public toastController: ToastController,
    private popoverController: PopoverController,) {}

  async inputPrompt() {
    const alert = await this.alertController.create({
      header: 'Adicionar tarefa',
      inputs: [
        {
          name: 'task',
          type: 'text',
          placeholder: 'Tarefa',
        },
        {
          name: 'date',
          type: 'date',
          placeholder: 'Data',
        },
      ],
      buttons: [{
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Salvar',
          handler: (alertData) => {
            if (alertData.task != '') {
              this.taskService.addTask(alertData.task, alertData.date);
            } else {
              this.presentToast("Preencha os campos!")
              this.inputPrompt();
            }
          }
        }
      ],
    });

    await alert.present();
  }

  async deletePrompt(index: number) {
    const alert = await this.alertController.create({
      header: 'Aviso!',
      message: 'Deseja realmente apagar esta tarefa?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Apagar',
          role: 'confirm',
          handler: () => {
            this.taskService.deleteTask(index)
          },
        },
      ],
    });

    await alert.present();
  }

  async updatePrompt(index: number, task) {
    const month = task.date.getMonth() + 1
    const day = task.date.getDate()

    const alert = await this.alertController.create({
      header: 'Editar tarefa',
      inputs: [
        {
          name: 'task',
          type: 'text',
          placeholder: 'Tarefa',
          value: task.name,
        },
        {
          name: 'date',
          type: 'date',
          placeholder: 'Data',
          value: task.date.getFullYear() + "-" + (month < 10 ? "0" + month : month) + "-" + (day < 10 ? "0" + day : day),
        },
      ],
      buttons: [{
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Salvar',
          handler: (alertData) => {
            if (alertData.task != '') {
              this.taskService.updateTask(index, alertData.task, alertData.date)
            } else {
              this.presentToast("Preencha os campos!")
              this.updatePrompt(index, task);
            }
          }
        }
      ],
    });

    await alert.present();
  }

  async presentToast(text: string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000,
    });

    toast.present()
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      translucent: true
    });
    return await popover.present()
  }
}