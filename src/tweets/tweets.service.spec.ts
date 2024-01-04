import { Test, TestingModule } from '@nestjs/testing';
import { TweetsService } from './tweets.service';

describe('TweetsService', () => {
  let service: TweetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TweetsService],
    }).compile();

    service = module.get<TweetsService>(TweetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createTweet', () => {
    it('tweet을 생성한다', () => {
      service.tweets = [];
      // given
      const payload = 'this is my twwet';

      // when
      const tweet = service.createTweet(payload);

      // then
      expect(tweet).toBe(payload);
      expect(service.tweets).toHaveLength(1);
    });

    it('tweet의 길이는 100자가 넘어가면 Error를 반환한다', () => {
      // given
      const payload =
        'this is long long long tweets this is long long long tweets this is long long long tweetsng this is long long long tweetsng';

      // when
      const tweet = () => {
        service.createTweet(payload);
      };

      // then
      expect(tweet).toThrow(Error);
    });
  });
});
