import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Criterio } from './models/criterio';

@Injectable({
  providedIn: 'root'
})
export class BuscadorService {

  public launches: any[];
  private key = 'launches';
  private url = 'https://launchlibrary.net/1.4/launch/1950-01-01?limit=2000';
  private urlStatus = 'assets/data/launchstatus.json';
  private urlAgencias = 'assets/data/agencies.json';
  private urlTipos = 'assets/data/missiontypes.json';
  private urlLanzamientos = 'assets/data/launches.json';

  criterios: Criterio[] = [
    { 'id': 1, 'name': 'Estado' },
    { 'id': 2, 'name': 'Agencias' },
    { 'id': 3, 'name': 'Tipo' }
  ];

  constructor(private http: HttpClient) {
   }


 public getStatus$ = (): Observable<any[]> =>
 this.http
   .get(this.urlStatus)
   .pipe(map((res: any) => res.types))


 public getAgencias$ = (): Observable<any[]> =>
    this.http
      .get(this.urlAgencias)
      .pipe(map((res: any) => res.agencies))


public getTipos$ = (): Observable<any[]> =>
    this.http
      .get(this.urlTipos)
      .pipe(map((res: any) => res.types))


      public getLaunches$ = () => {
        const localLaunches = localStorage.getItem(this.key);
        if (localLaunches) {
          return of(JSON.parse(localLaunches));
        } else {
          return this.http.get(this.url).pipe(
            map((res: any) => res.launches),
            tap(launches =>
              localStorage.setItem(this.key, JSON.stringify(launches))
            )
          );
        }
      }

 getCriterios() {
    return this.criterios;
  }
}
