import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { PokedexApiService } from 'src/app/service/pokedex-api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  private urlPokemon: string = 'https://pokeapi.co/api/v2/pokemon';
  private urlName: string = 'https://pokeapi.co/api/v2/pokemon-species';

  public pokemon: any;
  public isLoading: boolean = false;
  public apiError: boolean = false;

  constructor(
    private _activedRoute: ActivatedRoute,
    private _apiPokedexService: PokedexApiService
  ) {}

  ngOnInit(): void {
    this.getPokemon();
  }

  public getPokemon() {
    const id = this._activedRoute.snapshot.params['id'];
    const pokemon = this._apiPokedexService.getPokemons(
      `${this.urlPokemon}/${id}`
    );
    const name = this._apiPokedexService.getPokemons(`${this.urlName}/${id}`);

    return forkJoin([pokemon, name]).subscribe(
      (response) => {
        this.pokemon = response;
        this.isLoading = true;
      },
      (error) => (this.apiError = true)
    );
  }

  
}
