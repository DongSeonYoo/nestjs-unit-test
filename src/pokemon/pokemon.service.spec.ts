import { Test, TestingModule } from '@nestjs/testing';
import { PokemonService } from './pokemon.service';
import { HttpModule } from '@nestjs/axios';
import { BadRequestException } from '@nestjs/common';

describe('PokemonService', () => {
  let pokemonService: PokemonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [PokemonService],
    }).compile();

    pokemonService = module.get<PokemonService>(PokemonService);
  });

  it('should be defined', () => {
    expect(pokemonService).toBeDefined();
  });

  it('pokemonId가 1 미만이면 에러를 던진다', async () => {
    const getPokemon = pokemonService.getPokemon(0);

    await expect(getPokemon).rejects.toBeInstanceOf(BadRequestException);
  });

  it('pokemonId가 152 이상이면 에러를 던진다', async () => {
    const getPokemon = pokemonService.getPokemon(152);

    await expect(getPokemon).rejects.toBeInstanceOf(BadRequestException);
  });

  it('유효한 포케몬 아이디를 입력하면 포케몬 이름을 리턴한다', async () => {
    const getPokemon = pokemonService.getPokemon(1);

    await expect(getPokemon).resolves.toBe('bulbasaur');
  });
});

// 여기서 문제
// 1. 테스트 내에서 네트워크를 요청하면 테스트 케이스가 느려짐.
// 2. 사용 중인 api의 비용이 들기 때문에 테스트 중에는 실 api가 호출되지 않고 런타임에만 호출되는게 베스트일듯
// 3. 테스트는 의존성에 관계없이 메서드의 동작에 초점을 맞춰야 함
