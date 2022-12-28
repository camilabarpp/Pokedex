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

  public pokemon: any | undefined = {};
  public isLoading: boolean = false;
  public apiError: boolean = false;

  colorMap: Map<string, string> = new Map([
    ['overgrow', 'bg-gradient-to-r from-green-500 to-green-800'],
    ['blaze', 'bg-gradient-to-r from-red-500 to-red-800'],
    ['torrent', 'bg-gradient-to-r from-blue-500 to-blue-800'],
    ['shield-dust', 'bg-gradient-to-r from-green-500 to-green-800'],
    ['run-away', 'bg-gradient-to-r from-gray-500 to-gray-800'],
    ['shed-skin', 'bg-gradient-to-r from-purple-500 to-purple-800'],
    ['static', 'bg-gradient-to-r from-yellow-400 to-yellow-600'],
    ['sand-veil', 'bg-gradient-to-l hover:bg-gradient-to-r'],
    ['compound-eyes', 'bg-gradient-to-r from-yellow-500 to-yellow-800'],
    ['swarm', 'bg-gradient-to-r from-green-500 to-green-800'],
    ['keen-eye', 'bg-gradient-to-r from-yellow-500 to-yellow-800'],
    ['tangled-feet', 'bg-gradient-to-r from-purple-500 to-purple-800'],
    ['big-pecks', 'bg-gradient-to-r from-yellow-500 to-yellow-800'],
  ]);

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
