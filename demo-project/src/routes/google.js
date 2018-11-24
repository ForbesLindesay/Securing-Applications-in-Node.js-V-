import GoogleAuthentication from '@authentication/google';
import {Router} from 'express';

const app = Router();

const googleAuthentication = new GoogleAuthentication({
  callbackURL: '/auth/google',
});

app.post(googleAuthentication.callbackPath, async (req, res, next) => {
  googleAuthentication.redirectToProvider(req, res, next);
});

app.get(googleAuthentication.callbackPath, async (req, res, next) => {
  try {
    if (googleAuthentication.userCancelledLogin(req)) {
      return res.redirect('/');
    }
    const {
      accessToken, // use this to make requests to the Facebook API on behalf of the user
      refreshToken,
      profile,
      state, // => {message: 'Hello world'}
    } = await googleAuthentication.completeAuthentication(req, res);
    req.session.username = `${profile.provider}:${profile.id}`;
    res.redirect('/');
  } catch (ex) {
    next(ex);
  }
});

export default app;
