export const getKeycloakToken = () => {
  if (
    window &&
    window.entando &&
    window.entando.keycloak &&
    window.entando.keycloak.authenticated
  ) {
    return window.entando.keycloak.token;
  }
  return '';
};

export const hasKeycloakClientRole = clientRole => {
  if (getKeycloakToken()) {
    const { resourceAccess } = window.entando.keycloak;
    if (resourceAccess) {
      for (let client in resourceAccess) {
        if (resourceAccess.hasOwnProperty(client)) {
          const item = resourceAccess[client];
          if (item.roles && item.roles.includes(clientRole)) {
            // console.debug("Found role {} with client {} ", clientRole, client);
            return true;
          }
        }
      }
    }
  }
  return false;
};

export const getDefaultOptions = () => ({
  headers: new Headers({
    Authorization: `Bearer ${getKeycloakToken()}`,
    'Content-Type': 'application/json',
  }),
});

export const getUrl = (url, filters = '', pagination = '') => {
  const hasQuery = !!(filters || pagination);
  const parameters = `${filters}${filters ? '&' : ''}${pagination}`;
  return `${url}${hasQuery ? `?${parameters}` : ''}`;
};

export const request = async (url, options) => {
  const response = await fetch(url, options);

  const headers = {
    ...(response.headers.has('X-Total-Count')
      ? { 'X-Total-Count': parseInt(response.headers.get('X-Total-Count'), 10) }
      : {}),
  };

  if (response.status === 204) {
    return { projects: '' };
  }

  return response.status >= 200 && response.status < 300
    ? { projects: await response.json(), headers }
    : Promise.reject(new Error(response.statusText || response.status));
};
