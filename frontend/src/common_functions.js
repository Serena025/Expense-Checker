export const getBackendURL = () => {
  const backend_protocol = process.env.REACT_APP_BACKEND_PROTOCOL || "http";
  const backend_host = process.env.REACT_APP_BACKEND_HOST || "localhost";
  const backend_port = process.env.REACT_APP_BACKEND_PORT || 3001;
  let url = `${backend_protocol}://${backend_host}:${backend_port}`;

  return url;
};
