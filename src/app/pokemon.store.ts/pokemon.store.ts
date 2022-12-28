import { Injectable, OnDestroy } from '@angular/core';
import { Pokemon } from './pokemon.model';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { PokedexApiService } from '../service/pokedex-api.service';
import { Observable, pipe, Subscription, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

export interface PokemonState {
  pokemonState?: Pokemon;
}

const initialState: PokemonState = {};

@Injectable()
export class PokemonStore
  extends ComponentStore<PokemonState>
  implements OnDestroy
{
  private _subs = new Subscription();
  constructor(
    private _activedRoute: ActivatedRoute,
    private _pokemonService: PokedexApiService
  ) {
    super(initialState);
  }

  pokemon: Array<any> = [];
  private urlPokemon: string = 'https://pokeapi.co/api/v2/pokemon';
  private urlName: string = 'https://pokeapi.co/api/v2/pokemon-species';

  readonly pokemonState$ = this.select(({ pokemonState }) => pokemonState);

  readonly loadPokemon = this.updater((state, pokemon: Pokemon[] | null) => ({
    ...state,
    pokemon: pokemon || [],
  }));

  override ngOnDestroy(): void {
    this._subs.unsubscribe();
  }

  fetchHomePage = this.effect((fetch$: Observable<void>) => {
    return fetch$.pipe(
      switchMap(() =>
        this._pokemonService.listAllPokemons.pipe(
          tapResponse(
            (homePage: Pokemon) => this.updateState(homePage),
            (error: HttpErrorResponse) => console.error(error)
          )
        )
      )
    );
  });

  updateState = this.updater((state, homePage: Pokemon) => ({
    ...state,
    homePage,
  }));
}
