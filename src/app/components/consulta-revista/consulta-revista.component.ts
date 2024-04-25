import { Component, ViewChild} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component'
import { AppMaterialModule } from '../../app.material.module';
import { RevistaService } from '../../services/revista.service';
import { TokenService } from '../../security/token.service';
import { Pais } from '../../models/pais.model';
import { DataCatalogo } from '../../models/dataCatalogo.model';
import { UtilService } from '../../services/util.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Revista } from '../../models/revista.model';

@Component({
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent],
  selector: 'app-consulta-revista',
  templateUrl: './consulta-revista.component.html',
  styleUrls: ['./consulta-revista.component.css']
})
export class ConsultaRevistaComponent {

  //combobox
  lstPais: Pais[] = [];
  lstTipo: DataCatalogo[] = [];

  //Filtro
  nombre : string = "";
  frecuencia : string = "";
  fecDesde : Date = new Date();
  fecHasta : Date =new Date() ;
  estado : boolean = true;
  tipo : string = "-1"
  pais: string = "-1"

  //Grila
  dataSource:any;
  //Clase para la paginacion
  @ViewChild (MatPaginator, { static: true }) paginator!: MatPaginator;
  //Cabecera
  displayedColumns = ["idRevista","nombre","frecuencia","fechaCreacion","telefono","pais","tipo", "estado"];

      
  constructor(private utilService: UtilService, 
              private tokenService: TokenService,
              private revistaService: RevistaService ){
          
          this.utilService.listaTipoLibroRevista().subscribe(
                x =>  this.lstTipo = x
          );
          this.utilService.listaPais().subscribe(
            x =>  this.lstPais = x
          );
     
  }

  consulta(){
    console.log(">>> refreshTable [ini]");
    console.log(">>> nombre >> " + this.nombre);
    console.log(">>> frecuencia >> " + this.frecuencia);
    console.log(">>> fecDesde >> " + this.fecDesde.toISOString());
    console.log(">>> fecHasta >> " + this.fecHasta.toISOString());
    console.log(">>> estado >> " + this.estado);
    console.log(">>> tipo >> " + this.tipo);
    console.log(">>> pais >> " + this.pais);

    this.revistaService.consultarRevistaComplejo(
                this.nombre,
                this.frecuencia,
                this.fecDesde.toISOString(),
                this.fecHasta.toISOString(),
                this.estado ? 1 : 0,
                parseInt(this.pais),
                parseInt(this.tipo)
              ).subscribe(
          x => {
            this.dataSource = new MatTableDataSource<Revista>(x);
            this.dataSource.paginator = this.paginator
          }
    );

    console.log(">>> refreshTable [fin]");
  }

}
