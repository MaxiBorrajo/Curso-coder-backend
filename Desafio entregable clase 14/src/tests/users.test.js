import supertest from "supertest";
import app from "../app.js";

const api = supertest(app);

test("registrar usuario", async () => {
  const response = await api.post("/api/sessions/register").send({
    email: "maximilianoborrajo0@gmail.com",
    first_name: "Maximiliano",
    last_name: "Borrajo",
    age: 21,
    password: "Maxi2002$",
  });

  expect(response.statusCode).toBe(200);
});
