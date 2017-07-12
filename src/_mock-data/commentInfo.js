import generateUuid from "uuid/v1";
import {users} from './userInfo'

export class Comment {
  constructor(msg, author, createTime, likes, viewReplies, replies) {
    this.id = generateUuid();
    this.msg = msg;
    this.author = author;
    this.createTime = createTime;

    this.likes = likes;
    this.viewReplies = viewReplies;
    this.replies = replies;
  }
}

export const comments = [
  new Comment(
    'I really like the way you have broken down the material. How does one model the transition state?',
    users[1],
    1499329647389,
    15,
    2,
    [
      new Comment(
        'Nobody knows...',
        users[2],
        1499419781035,
        null,
        null,
        null
      ),
      new Comment(
        'Need time to tell you an answer.',
        users[2],
        1499419938464,
        null,
        null,
        null
      )
    ]
  ),
  new Comment(
    'Have you ever tried to carry out an experiment to determine if the flowis turbulent or not?',
    users[2],
    1499329647389,
    3,
    1,
    [
      new Comment(
        'No, I hadn\'t',
        users[1],
        1499419781035,
        null,
        null,
        null
      )
    ]
  ),
  new Comment(
    'It\'s a good weather today',
    users[2],
    1499329647389,
    3,
    0,
    null
  ),
]
