import { Injectable } from '@nestjs/common';

@Injectable()
export class TweetsService {
  tweets: string[] = [];

  /**
   * tweet을 받아 배열에 생성한다
   * @param tweet 생성 할 tweet
   * @returns 생성 된 tweet
   */
  createTweet(tweet: string) {
    if (tweet.length > 100) {
      throw new Error('Tweet too long');
    }

    this.tweets.push(tweet);
    return tweet;
  }

  /**
   *
   * @param tweet 업데이트 할 tweet 내용
   * @param id 업데이트 할 tweet의 id
   * @returns 업데이트 된 tweet 내용
   */
  updateTweet(tweet: string, id: number) {
    const tweetToUpdate = this.tweets[id];
    if (!tweetToUpdate) {
      throw new Error('this tweet does not exist');
    }

    if (tweet.length > 100) {
      throw new Error('tweet too long');
    }

    this.tweets[id] = tweet;
    return tweet;
  }

  /**
   *
   * @returns 모든 tweets을 가져온다
   */
  getTweets() {
    return this.tweets;
  }

  /**
   *
   * @param id 삭제 할 tweet의 id
   * @returns 삭제 된 tweet의 내용
   */
  deleteTweet(id: number) {
    const tweetToDelete = this.tweets[id];
    if (!tweetToDelete) {
      throw new Error('this tweet does not exist');
    }

    const deletedTweet = this.tweets.splice(id, 1);
    return deletedTweet;
  }
}
