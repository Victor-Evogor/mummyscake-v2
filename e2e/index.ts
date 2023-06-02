import { Selector, fixture, test } from "testcafe";
// example
fixture("Home page loads").page("http://example.com/");

test("Home page loads", async (t) => {
  await t.expect(Selector("h1").innerText).eql("Example Domain");
});
