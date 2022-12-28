import { SpecificPokemon } from './../../pokemon.store.ts/pokemon.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { PokemonStore } from 'src/app/pokemon.store.ts/pokemon.store';
import { PokedexApiService } from 'src/app/service/pokedex-api.service';

@Component({
  selector: 'app-pokedex-list',
  templateUrl: './pokedex-list.component.html',
  styleUrls: ['./pokedex-list.component.scss'],
})
export class PokedexListComponent implements OnInit, OnDestroy{
  pokemons$?: Observable<any | undefined>;
  private setAllPokemons: any;
  public getAllPokemons: Array<any> = [];
  public apiError: boolean = false;
  public isSearching: boolean = false;
  queryField = new FormControl();
  subscription: Subscription = new Subscription();
  teste : any;

  colorPowers: Map<string, string> = new Map([
    ['grass', 'bg-gradient-to-r from-green-300 to-green-500'],
    ['fire', 'bg-gradient-to-r from-red-300 to-red-500'],
    ['flying', 'bg-gradient-to-r from-blue-300 to-blue-500'],
    ['water', 'bg-gradient-to-r from-blue-300 to-blue-500'],
    ['bug', 'bg-gradient-to-r from-green-300 to-green-500'],
    ['normal', 'bg-gradient-to-r from-gray-300 to-gray-500'],
    ['poison', 'bg-gradient-to-r from-purple-300 to-purple-500'],
    ['electric', 'bg-gradient-to-r from-yellow-300 to-yellow-500'],
    ['ground', 'bg-gradient-to-l hover:bg-gradient-to-r'],
    ['fairy', 'bg-gradient-to-r from-pink-300 to-pink-500'],
    ['fighting', 'bg-gradient-to-r from-red-300 to-red-500'],
    ['psychic', 'bg-gradient-to-r from-pink-300 to-pink-500'],
    ['rock', 'bg-gradient-to-r from-yellow-300 to-yellow-500'],
    ['steel', 'bg-gradient-to-r from-gray-300 to-gray-500'],
    ['ice', 'bg-gradient-to-r from-blue-300 to-blue-500'],
  ]);

  colorAbilities: Map<string, string> = new Map([
    ['overgrow', 'bg-gradient-to-r from-green-300 to-green-500'],
    ['blaze', 'bg-gradient-to-r from-red-300 to-red-500'],
    ['torrent', 'bg-gradient-to-r from-blue-300 to-blue-500'],
    ['shield-dust', 'bg-gradient-to-r from-green-300 to-green-500'],
    ['run-away', 'bg-gradient-to-r from-gray-300 to-gray-500'],
    ['shed-skin', 'bg-gradient-to-r from-purple-300 to-purple-500'],
    ['static', 'bg-gradient-to-r from-yellow-300 to-yellow-500'],
    ['sand-veil', 'bg-gradient-to-l hover:bg-gradient-to-r'],
    ['compound-eyes', 'bg-gradient-to-r from-yellow-300 to-yellow-500'],
    ['swarm', 'bg-gradient-to-r from-green-300 to-green-500'],
    ['keen-eye', 'bg-gradient-to-r from-yellow-300 to-yellow-500'],
    ['tangled-feet', 'bg-gradient-to-r from-purple-300 to-purple-500'],
    ['big-pecks', 'bg-gradient-to-r from-yellow-300 to-yellow-500'],
  ]);

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
    const filter = this.setAllPokemons.filter((res: SpecificPokemon) => {
      this.isSearching = true;
      return !res.name.indexOf(value.toLowerCase());
    });
    this.getAllPokemons = filter;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
