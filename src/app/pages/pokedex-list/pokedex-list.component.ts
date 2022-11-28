import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Pokemon } from 'src/app/pokemon.store.ts/pokemon.model';
import { PokemonStore } from 'src/app/pokemon.store.ts/pokemon.store';
import { PokedexApiService } from 'src/app/service/pokedex-api.service';

@Component({
  selector: 'app-pokedex-list',
  templateUrl: './pokedex-list.component.html',
  styleUrls: ['./pokedex-list.component.scss'],
})
export class PokedexListComponent implements OnInit, OnDestroy {
  pokemons$?: Observable<Pokemon | undefined>;
  private setAllPokemons: any;
  public getAllPokemons: any;

  public apiError: boolean = false;
  subscription: Subscription = new Subscription();

  constructor(
    private pokemonStore: PokemonStore,
    private pokeApiService: PokedexApiService
  ) {}

  ngOnInit(): void {
    this.pokeApiService.listAllPokemons.subscribe(
      (res) => {
        this.setAllPokemons = res.results;
        this.getAllPokemons = this.setAllPokemons;
      },
      (error) => {
        this.apiError = true;
      }
    );
    this.pokemonStore.fetchHomePage();
  }

  public getSearch(value: string) {
    const filter = this.setAllPokemons.filter((res: any) => {
      return !res.name.indexOf(value.toLowerCase());
    });

    this.getAllPokemons = filter;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
