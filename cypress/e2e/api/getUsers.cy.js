describe("Contrato a /api/users?page=2", () => {
  let usersPage2Schema;
  before(() => {
    cy.fixture("schemas/usersPage.schema.json").then((schema) => {
      usersPage2Schema = schema;
    });
  });

  it("GET /api/users?page=2 con status 200", () => {
    cy.request({
      method: "GET",
      url: "https://reqres.in/api/users?page=2",
        headers: { "x-api-key": "reqres-free-v1", Accept: "application/json" },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.headers["content-type"]).to.include("application/json");
      const body = response.body;

      cy.validateSchema(usersPage2Schema, body);
      expect(body).to.have.property("page", 2);
      expect(body).to.have.property("data").and.to.be.an("array").and.to.not.be
        .empty;

      body.data.forEach((user) => {
        expect(user).to.have.property("id").and.to.be.a("number");
        expect(user)
          .to.have.property("email")
          .and.to.be.a("string")
          .and.to.include("@");
        expect(user).to.have.property("first_name").and.to.be.a("string").and.to
          .not.be.empty;
        expect(user).to.have.property("last_name").and.to.be.a("string").and.to
          .not.be.empty;
      });
    });
  });

  it("GET /api/users con status 404 - Caso Negativo", () => {
    cy.request({
      method: "GET",
      url: "https://reqres.in/api/users/99999",
      headers: {
        "x-api-key": "reqres-free-v1",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body).to.be.an("object");
    });
  });

  it("Post /api/users con body invalido", () => {
    cy.request({
      method: "Post",
      url: "https://reqres.in/api/users",
      failOnStatusCode: false,
      headers: {
        "x-api-key": "reqres-free-v1",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: "{name: Karla}", // Body inválido sin comillas para probocar el 400
    }).then((response) => {
      expect(response.status).to.be.oneOf([400, 415]);
    });
  });
});
