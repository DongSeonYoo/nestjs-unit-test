import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class PokemonService {
  constructor(private httpService: HttpService) {}

  /**
   *
   * @param id 조회 할 Pokemon 아이디
   */
  async getPokemon(id: number) {
    if (id < 1 || id > 151) {
      throw new BadRequestException('invalid pokemon id');
    }

    const result = await this.httpService.axiosRef({
      url: `https://pokeapi.co/api/v2/pokemon/${id}`,
      method: 'GET',
    });

    // console.log(result);

    const data = result.data;

    if (!data || !data.species || !data.species.name) {
      throw new InternalServerErrorException();
    }

    return data.species.name;
  }
}
