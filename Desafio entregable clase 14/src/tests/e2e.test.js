import supertest from "supertest";
import app from "../app.js";
import CartService from "../services/Cart.service.js";

const api = supertest(app);

let user1Token;
let user2Token;
let user1Id;
let user2Id;

describe("Prueba end to end", () => {
  describe("Autentication", () => {
    test("registrar usuario1", async () => {
      const response = await api.post("/api/sessions/register").send({
        email: "user1@gmail.com",
        first_name: "user1",
        last_name: "user1",
        age: 18,
        password: "User1234$",
      });

      const responseJson = JSON.parse(response.text);

      expect(response.statusCode).toBe(201);
      expect(responseJson.message).toBeTruthy();
      expect(responseJson.message.token).toBeTruthy();
      user1Token = responseJson.message.token;
      expect(responseJson.message.user).toBeTruthy();
      user1Id = responseJson.message.user._id;
      expect(responseJson.message.user.email).toBe("user1@gmail.com");
      expect(responseJson.message.user.publicId).toBe("x1vdmydenrkd3luzvjv6");
    }, 10000);

    test("comprobar existencia de cart de usuario1", async () => {
      const response = await CartService.getByFilter({ idUser: user1Id });
      expect(response).toBeTruthy();
      expect(response.idUser.toString()).toBe(user1Id);
    }, 10000);

    test("registrar usuario2", async () => {
      const response = await api.post("/api/sessions/register").send({
        email: "user2@gmail.com",
        first_name: "user2",
        last_name: "user2",
        age: 18,
        password: "User1234$",
      });

      const responseJson = JSON.parse(response.text);

      expect(response.statusCode).toBe(201);
      expect(responseJson.message).toBeTruthy();
      expect(responseJson.message.token).toBeTruthy();
      user2Token = responseJson.message.token;
      expect(responseJson.message.user).toBeTruthy();
      user2Id = responseJson.message.user._id;
      expect(responseJson.message.user.email).toBe("user2@gmail.com");
      expect(responseJson.message.user.publicId).toBe("x1vdmydenrkd3luzvjv6");
    }, 10000);

    test("error de usuario existente", async () => {
      const response = await api.post("/api/sessions/register").send({
        email: "user2@gmail.com",
        first_name: "user2",
        last_name: "user2",
        age: 18,
        password: "User1234$",
      });

      expect(response.statusCode).toBe(400);
    }, 10000);

    test("loguear", async () => {
      const response = await api.post("/api/sessions/login").send({
        email: "user1@gmail.com",
        password: "User1234$",
      });

      const responseJson = JSON.parse(response.text);

      expect(response.statusCode).toBe(200);
      expect(responseJson.message).toBeTruthy();
      expect(responseJson.message.token).toBeTruthy();
      user1Token = responseJson.message.token;
      expect(responseJson.message.user).toBeTruthy();
    }, 10000);

    test("fallo autenticacion", async () => {
      const response = await api.get("/api/sessions/current");

      expect(response.statusCode).toBe(401);
    }, 20000);

    test("obtener usuario actual", async () => {
      const response = await api
        .get("/api/sessions/current")
        .set("Authorization", `Bearer ${user1Token}`);

      const responseJson = JSON.parse(response.text);

      expect(response.statusCode).toBe(200);
      expect(responseJson.message).toBeTruthy();
      expect(responseJson.message.email).toBe("user1@gmail.com");
    }, 10000);
  });
});
