
export default function withAuthenticatedPage(handler) {
  return async (context) => {
      const { req, resolvedUrl } = context;
      const cookies = req.cookies;
      const hasAuthCookies = cookies['access_token'];

      if (!hasAuthCookies && resolvedUrl !== "/login") {

          return {
              redirect: {
                  destination: "/login",
                  permanent: true,
              },
          };
      }

      if (hasAuthCookies && resolvedUrl === "/login") {
          return {
              redirect: {
                  destination: "/",
                  permanent: true,
              },
          };
      }

      const newContext = {
          ...context,
      };

      if (typeof handler === "function") {
          return await handler(newContext);
      }

      return {
          props: {
              resolvedUrl,
          },
      };
  };
}
