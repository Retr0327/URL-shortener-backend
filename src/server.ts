import app from "./api/app";

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () =>
  console.log(`⚡️[server] Listening on port ${PORT}`)
);

export default server;
