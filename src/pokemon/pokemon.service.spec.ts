import { Test, TestingModule } from '@nestjs/testing';
import { PokemonService } from './pokemon.service';
import { HttpService } from '@nestjs/axios';
import { DeepMocked, createMock } from '@golevelup/ts-jest';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

// describe('PokemonService', () => {
//   let pokemonService: PokemonService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       imports: [HttpModule],
//       providers: [PokemonService],
//     }).compile();

//     pokemonService = module.get<PokemonService>(PokemonService);
//   });

//   it('should be defined', () => {
//     expect(pokemonService).toBeDefined();
//   });

//   it('pokemonId가 1 미만이면 에러를 던진다', async () => {
//     const getPokemon = pokemonService.getPokemon(0);

//     await expect(getPokemon).rejects.toBeInstanceOf(BadRequestException);
//   });

//   it('pokemonId가 152 이상이면 에러를 던진다', async () => {
//     const getPokemon = pokemonService.getPokemon(152);

//     await expect(getPokemon).rejects.toBeInstanceOf(BadRequestException);
//   });

//   it('유효한 포케몬 아이디를 입력하면 포케몬 이름을 리턴한다', async () => {
//     const getPokemon = pokemonService.getPokemon(1);

//     await expect(getPokemon).resolves.toBe('bulbasaur');
//   });
// });

// 여기서 문제
// 1. 테스트 내에서 네트워크를 요청하면 테스트 케이스가 느려짐.
// 2. 사용 중인 api의 비용이 들기 때문에 테스트 중에는 실 api가 호출되지 않고 런타임에만 호출되는게 베스트일듯
// 3. 테스트는 의존성에 관계없이 메서드의 동작에 초점을 맞춰야 함

// mocking을 사용하여 실제 외부 api 요청을 중단하고 모의 버전을 구현
// 테스트 모듈에서 import하는 대신 jest의 유틸리티 함수를 이용해 http module을 대체한다

describe('PokemonService with mocking', () => {
  let pokemonService: PokemonService;
  let httpService: DeepMocked<HttpService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PokemonService,
        {
          provide: HttpService,
          useValue: createMock<HttpService>(),
        },
      ],
    }).compile();

    pokemonService = module.get<PokemonService>(PokemonService);
    httpService = module.get(HttpService);
  });

  it('유효한 포케몬 아이디를 입력했을 때 포케몬 이름이 반환되어야 함', async () => {
    httpService.axiosRef.mockResolvedValueOnce({
      data: {
        species: { name: 'bulbasaur' },
      },
      headers: {},
      config: { url: '' },
      status: 200,
      statusText: '',
    });
    const getPokemon = pokemonService.getPokemon(1);

    await expect(getPokemon).resolves.toBe('bulbasaur');
  });

  it('1보다 작은 포케몬 아이디를 입력했을 때 에러를 던진다', async () => {
    const getPokemon = pokemonService.getPokemon(0);

    await expect(getPokemon).rejects.toThrow(BadRequestException);
  });

  it('151보다 큰 포케몬 아이디를 입력했을 때 에러를 던진다', async () => {
    const getPokemon = pokemonService.getPokemon(152);

    await expect(getPokemon).rejects.toThrow(BadRequestException);
  });

  it('포케몬 아이디가 유효하지만 데이터가 오지 않았을 경우 500에러를 던진다', async () => {
    httpService.axiosRef.mockResolvedValueOnce({
      data: {},
      headers: {},
      config: { url: '' },
      status: 200,
      statusText: '',
    });
    const getPokemon = pokemonService.getPokemon(2);

    await expect(getPokemon).rejects.toThrow(InternalServerErrorException);
  });
});
