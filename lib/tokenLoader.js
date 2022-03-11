

let session;
let updatedAt;

export const sessionRefreshDuration = 60 * 10; // Every 10 minutes

export const getToken = () => {
  return session.token;
};

export const getSession = ()=> {
  return session;
};

let fetchSessionPromise;

const generateSessionPromise = () => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise<SessionType>(async (resolve) => {
    if (!session) {
      const host =
        typeof window !== "undefined"
          ? window.location.origin
          : process.env.NEXTAUTH_URL;
      session = (await fetch(`${host}/api/defaultUserSession`).then((r) =>
        r.json()
      )) ;
    }

    resolve(session);
  });
};

export const fetchSession = () => {
  const now = Math.floor(Date.now() / 1000);
  if (!updatedAt || updatedAt < now - sessionRefreshDuration) {
    updatedAt = Math.floor(Date.now() / 1000);
    session = null;
    fetchSessionPromise = generateSessionPromise();
  }
  return fetchSessionPromise;
};
