import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { Playlist } from 'src/app/models/playlist';
import { PlaylistService } from 'src/app/services/playlist.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})

export class PlaylistComponent implements OnInit {
  //Arreglo donde va a caer toda la informacion de mongoDB que yo voy a  consumir del API
  listOfPlaylist:Playlist[]=[];

  visible = false;
  form!: FormGroup;
  accion: boolean = true;
  idModificar: string = '';

  constructor(
    private playlistService: PlaylistService,
    private nzMessageService: NzMessageService,
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      descripcion: [null],
      categoria: [''],
      calificacion: [null],
      seguidores: [null],
      reproducciones: [null],
      cantidadCanciones: [null]
    });
  }

  ngOnInit(): void {
    this.playlistService.getAllPlaylist().toPromise().then(
      ( data: Playlist[])=> this.listOfPlaylist = data
    )
  }

  delete(id: string) {
    this.playlistService.deletePlaylist(id).toPromise().then(() => {
      this.nzMessageService.warning('El registro fue eliminado con exito!');
      this.listOfPlaylist = this.listOfPlaylist.filter(x => x.id !== id);
    }, (error) => {
      this.nzMessageService.error('El registro no pudo ser eliminado, por favor intente de nuevo');
      console.error(error);
    })
  }

  cancel(): void {
    this.nzMessageService.info('Su registro sigue activo! =D')
  }

  open(): void {
    this.visible = true;
    this.accion = true;
  }

  close(): void {
    this.visible = false;
    this.buildForm();
  }

  guardar(): void {
    if (this.accion) {
      this.playlistService.postPlaylist(this.form.value).toPromise().then((data: any) => {
        //this.listOfPlaylist.push(data);
        this.nzMessageService.success('El registro fue ingresado con exito!');
        this.listOfPlaylist = [...this.listOfPlaylist, data]
        //Limpia el formulario y lo cierra
        this.buildForm();
        this.visible = false;
      }, (error) => {
        this.nzMessageService.error('El registro no pudo ser ingresado, por favor intente de nuevo');
        console.error(error);
      })
    } else {
      this.playlistService.pathPlaylist(this.idModificar, this.form.value).toPromise().then(() => {
        for (let elemento of this.listOfPlaylist.filter(x => x.id === this.idModificar)) {
          elemento.descripcion = this.form.value.descripcion;
          elemento.categoria = this.form.value.categoria;
          elemento.calificacion = this.form.value.calificacion;
          elemento.seguidores = this.form.value.seguidores;
          elemento.reproducciones = this.form.value.reproducciones;
          elemento.cantidadCanciones = this.form.value.cantidadCanciones;
        }
        this.visible = false;
        this.nzMessageService.success('El registro fue actualizado con exito!');
      }, (error) => {
        this.nzMessageService.error('El registro no pudo ser actualizado, por favor intente de nuevo');
        console.error(error);
      })
    }
  }

  modificar(item: Playlist): void {
    this.accion = false;
    this.idModificar = item.id;
    this.visible = true;
    this.form = this.formBuilder.group({
      descripcion: [item.descripcion],
      categoria: [item.categoria],
      calificacion: [item.calificacion],
      seguidores: [item.seguidores],
      reproducciones: [item.reproducciones],
      cantidadCanciones: [item.cantidadCanciones]
    })
  }

  submitForm(): void {
    for (const i in this.form?.controls) {
      this.form?.controls[i].markAsDirty();
      this.form?.controls[i].updateValueAndValidity();
    }
  }

}