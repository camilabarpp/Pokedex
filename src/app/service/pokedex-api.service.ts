import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Pokemon } from '../pokemon.store.ts/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokedexApiService {
  private url: string = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=16';

  constructor(private _http: HttpClient) {}

  get listAllPokemons(): Observable<Pokemon> {
    return this._http.get<Pokemon>(this.url).pipe(
      tap((response) => response),
      tap((response) => {
        response.results.map((responsePokemons: any) => {
          this.getPokemons(responsePokemons.url).subscribe(
            (response) => responsePokemons.status = response
          );
        });
      })
    );
  }

  public getPokemons(url: string): Observable<any> {
    return this._http.get<any>(url).pipe(map((response) => response));
  }
}
