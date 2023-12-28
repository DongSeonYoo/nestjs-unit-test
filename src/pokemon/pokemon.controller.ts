import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get(':id')
  getPokemon(@Param('id', ParseIntPipe) id: number) {
    return this.pokemonService.getPokemon(id);
  }
}
