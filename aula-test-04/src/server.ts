import app from "./app";

export default app;

const port = 6000;
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
})