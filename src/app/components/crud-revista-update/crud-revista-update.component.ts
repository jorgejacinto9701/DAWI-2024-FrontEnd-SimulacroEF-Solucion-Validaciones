import { Component, Inject, OnInit } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { Pais } from '../../models/pais.model';
import { DataCatalogo } from '../../models/dataCatalogo.model';
import { UtilService } from '../../services/util.service';
import { Revista } from '../../models/revista.model';
import { TokenService } from '../../security/token.service';
import { Usuario } from '../../models/usuario.model';
import { RevistaService } from '../../services/revista.service';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { provideNativeDateAdapter } from '@angular/material/core';


@Component({
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  selector: 'app-crud-revista-update',
  templateUrl: './crud-revista-update.component.html',
  styleUrls: ['./crud-revista-update.component.css'],
  providers: [provideNativeDateAdapter()],
})
export class CrudRevistaUpdateComponent {
  lstPais: Pais[] = [];
  lstTipo: DataCatalogo[] = [];
  fecha = new FormControl(new Date());

  formsActualiza = this.formBuilder.group({ 
    validaNombre: ['', [Validators.required, Validators.pattern('[a-zA-Zá-úÁ-ÚñÑ ]{3,30}')]] , 
    validaFrecuencia: ['', [Validators.required, Validators.pattern('[a-zA-Zá-úÁ-ÚñÑ ]{3,30}')] ] , 
    validaFechaCreacion: ['', [Validators.required]] , 
    validaTelefono: ['', [Validators.required, Validators.pattern('[9][0-9]{8}')]] , 
    validaPais: ['', Validators.min(1)] , 
    validaTipoRevista: ['', Validators.min(1)] ,  
});

  objRevista: Revista = {
    nombre: '',
    frecuencia: '',
    fechaCreacion: new Date(),
    telefono: '',
    pais: {
      idPais: -1,
    },
    tipoRevista: {
      idDataCatalogo: -1,
    },
  };
  objUsuario: Usuario = {};

  constructor(private utilService: UtilService, 
              private tokenService: TokenService,
              private revistaService: RevistaService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder : FormBuilder){
            

            data.fechaCreacion = new Date( new Date(data.fechaCreacion).getTime() + (1000 * 60 * 60 * 24));
            this.objRevista = data; 

            console.log(">>>> [ini] >>> objRevista");
            console.log(this.objRevista);
            this.utilService.listaTipoLibroRevista().subscribe(
                  x =>  this.lstTipo = x
            );
            this.utilService.listaPais().subscribe(
              x =>  this.lstPais = x
            );
        this.objUsuario.idUsuario = tokenService.getUserId();
        
  }
  

  actualizar() {
    if (this.formsActualiza.valid){
    this.objRevista.usuarioActualiza = this.objUsuario;
    this.objRevista.usuarioRegistro = this.objUsuario;
    this.revistaService.actualizarCrud(this.objRevista).subscribe((x) => {
      Swal.fire({
        icon: 'info',
        title: 'Resultado del Registro',
        text: x.mensaje,
      });
    });
  }
  }
  
}
