describe("movieAppForm", () => {
  it("should write input", () => {
    cy.visit("http://localhost:1234");
    cy.get("input").type("Star wars").should("have.value", "Star wars");
  });

  it("should search movies", () => {
    cy.visit("http://localhost:1234");
    cy.get("input").type("Star wars").should("have.value", "Star wars");
    cy.get("button#search").click();
    cy.get("div.movie").should("have.length", 10);
  });

  it("should not search movies", () => {
    cy.visit("http://localhost:1234");
    cy.get("input").type(".").should("have.value", ".").clear();
    cy.get("button#search").click();
    cy.get("p").contains("Inga sökresultat att visa");
    cy.get("div.movie").should("have.length", 0);
  });
  it("should give error", () => {
    cy.visit("http://localhost:1234");
    cy.get("input");
    cy.get("button#search").click();
    cy.get("p").contains("Inga sökresultat att visa");
    cy.get("div.movie").should("have.length", 0);
  });
});

describe("movieservice", () => {
  let movieApi = [
    {
      Title: "Star wars",
      imdbID: "123",
      Type: "Movie",
      Poster: "url",
      Year: "1997",
    },
  ];
  it("should get api", () => {
    cy.intercept("GET", "http://omdbapi.com/*", movieApi).as("moviecall");
    cy.get("input").type("Star wars").should("have.value", "Star wars");
    cy.get("button#search").click();
    cy.wait("@moviecall").its("request.url").should("contain", "s=Star%20wars");
  });
});
