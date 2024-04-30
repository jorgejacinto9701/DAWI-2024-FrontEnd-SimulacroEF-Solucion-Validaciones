import { Component, OnInit } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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


@Component({
  standalone: true,
  selector: 'app-crud-revista-add',
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './crud-revista-add.component.html',
  styleUrls: ['./crud-revista-add.component.css'],
})
export class CrudRevistaAddComponent {


  formsRegistra = this.formBuilder.group({ 
    validaNombre: ['', [Validators.required, Validators.pattern('[a-zA-Zá-úÁ-ÚñÑ ]{3,30}')]] , 
    validaFrecuencia: ['', [Validators.required, Validators.pattern('[a-zA-Zá-úÁ-ÚñÑ ]{3,30}')] ] , 
    validaFechaCreacion: ['', [Validators.required]] , 
    validaTelefono: ['', [Validators.required, Validators.pattern('[9][0-9]{8}')]] , 
    validaPais: ['', Validators.min(1)] , 
    validaTipoRevista: ['', Validators.min(1)] ,  
});
  
  lstPais: Pais[] = [];
  lstTipo: DataCatalogo[] = [];

  objRevista: Revista ={
        nombre: "",
        frecuencia: "",
        fechaCreacion : undefined,
        telefono: "",
        pais:{
          idPais:-1
        },
        tipoRevista:{
            idDataCatalogo:-1
        }
    }
    objUsuario: Usuario = {} ;

  constructor(private utilService: UtilService, 
              private tokenService: TokenService,
              private revistaService: RevistaService,
              private formBuilder : FormBuilder ){
          this.utilService.listaTipoLibroRevista().subscribe(
                x =>  this.lstTipo = x
          );
          this.utilService.listaPais().subscribe(
            x =>  this.lstPais = x
          );
          this.objUsuario.idUsuario = tokenService.getUserId();
  }
  registra(){
    if (this.formsRegistra.valid){
        this.objRevista.usuarioActualiza = this.objUsuario;
        this.objRevista.usuarioRegistro = this.objUsuario;
        this.revistaService.registrarCrud(this.objRevista).subscribe(
          x=>{
            Swal.fire({
              icon: 'info',
              title: 'Resultado del Registro',
              text: x.mensaje,
            })
          },
        );
      }
  }
}
