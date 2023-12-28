import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { HttpModule } from '@nestjs/axios';
import { PokemonController } from './pokemon.controller';

@Module({
  imports: [HttpModule],
  providers: [PokemonService],
  controllers: [PokemonController],
})
export class PokemonModule {}
