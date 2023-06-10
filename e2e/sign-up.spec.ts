import { fixture, test, Selector } from "testcafe";
import { faker } from "@faker-js/faker";
if (!process.env.URL) {
  console.error("Testing Url not provided");
  process.exit(1);
}

fixture("Home page functionality").page(process.env.URL);

const email = `test-${faker.name.firstName()}@${faker.animal.rabbit()}.com`;
const password = faker.word.noun({
  length: 10,
});
const phone = "9133240345";

test("Create an account", async (t) => {
  // create an account
  await t
    .click(`button[data-test-id="log-in"]`)
    .click(`a[data-test-id="create-an-account"]`)
    .typeText(`input[type="email"]`, email)
    .typeText(`input[type="password"]`, password)
    .typeText(`input[placeholder="John Doe"]`, "Tester Bot")
    .typeText(`input[type="tel"]`, phone)
    .click(`button[type="submit"]`);
});

test("Log Out", async (t) => {
  await t
    .click(`button[data-test-id="drawer-btn"]`)
    .click(`button[data-test-id="log-out"]`);
});

test("Sign in and add to cart", async (t) => {
  await t
    .click(`button[data-test-id="log-in"]`)
    .typeText(`input[type="email"]`, email)
    .typeText(`input[type="password"]`, password)
    .click(`button[type="submit"]`);
});

test("Add to cart", async (t) => {
  const featuredCakesSelector = Selector(
    `div[data-test-id="featured-cakes-container"]`
  );
  const addToCartBtn = featuredCakesSelector
    .nth(0)
    .child()
    .nth(0)
    .find(`button[data-test-id="view-more"]`);
  await t.click(addToCartBtn);
  await t.click(`button[data-test-id="add-to-cart"]`);
});

test("Checkout cart", async (t) => {
  await t
    .click(`button[data-test-id="drawer-btn"]`)
    .click(`button[data-test-id="proceed-to-checkout"]`)
    .click(`button[data-test-id="proceed-checkout"]`);
  await t.wait(2000);
});
