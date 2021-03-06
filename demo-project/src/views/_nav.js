import React from 'react';

export default function Nav({username, csrfToken}) {
  return (
    <React.Fragment>
      <link rel="stylesheet" href="/style.css" />
      <nav>
        <a href="/">Example App</a>
        {username ? (
          <form action="/logout" method="post">
            <input type="hidden" name="_csrf" value={csrfToken} />
            <a href="/2-factor-auth/register">Enable 2-factor auth</a>
            <button type="submit">Logout</button>
          </form>
        ) : (
          <div>
            <a href="/login">Login / Register</a>
          </div>
        )}
      </nav>
    </React.Fragment>
  );
}
