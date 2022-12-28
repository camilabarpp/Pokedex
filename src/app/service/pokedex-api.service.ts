import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokedexApiService {
  private url: string = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100';

  constructor(private _http: HttpClient) {}

  get listAllPokemons(): Observable<any> {
    return this._http.get<any>(this.url).pipe(
      tap((response) => {
        response.results.forEach((responsePokemons: any) => {
          this.getPokemons(responsePokemons.url).subscribe(
            (response) => ((responsePokemons.status = response))
          );
        });
      })
    );
  }

  public getPokemons(url: string): Observable<any> {
    return this._http.get<any>(url).pipe(map((response) => response));
  }
}
