const request = require('request');
const { promisify } = require('util');
const Twitter = require('twitter');
const { consumer_key, consumer_secret } = require('../config');
const { transformTextToJson } = require('../helpers');

module.exports = {
  async reverse(ctx, next) {
    try {
      const { body } = await promisify(request.post)({
        url: 'https://api.twitter.com/oauth/request_token',
        oauth: {
          oauth_callback: 'http://localhost:8080/validate',
          consumer_key,
          consumer_secret,
        },
      });
      const { oauth_token: token_reverse } = transformTextToJson(body);
      ctx.body = { token_reverse };
    } catch ([{ message }]) {
      ctx.status = 400;
      ctx.body = { message };
    }
    return next();
  },
  async token(ctx, next) {
    try {
      const { body } = await promisify(request.post)({
        url: 'https://api.twitter.com/oauth/access_token?oauth_verifier',
        oauth: {
          consumer_key,
          consumer_secret,
          token: ctx.request.body.oauth_token,
        },
        form: { oauth_verifier: ctx.request.body.oauth_verifier },
      });
      ctx.body = transformTextToJson(body);
    } catch ([{ message }]) {
      ctx.status = 400;
      ctx.body = { message };
    }
    return next();
  },
  async tweets(ctx, next) {
    try {
      const { user_id, access_token_key, access_token_secret } = ctx.request.query;
      const twitter = new Twitter({
        consumer_key,
        consumer_secret,
        access_token_key,
        access_token_secret,
      });
      const response = await twitter.get('statuses/user_timeline', { user_id });
      ctx.body = response;
    } catch ([{ message }]) {
      ctx.status = 400;
      ctx.body = { message };
    }
    return next();
  },
  async add(ctx, next) {
    try {
      const { access_token_key, access_token_secret, tweet } = ctx.request.body;
      const twitter = new Twitter({
        consumer_key,
        consumer_secret,
        access_token_key,
        access_token_secret,
      });
      const response = await twitter.post('statuses/update', { status: tweet });
      ctx.body = response;
    } catch ([{ message }]) {
      ctx.status = 400;
      ctx.body = { message };
    }
    next();
  },
};
