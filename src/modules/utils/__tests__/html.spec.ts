import { html } from "../html";

describe("html", () => {
  it("Should return string html", () => {
    const stringHtml = html`
      <html>
        <head>
          <title>Test</title>
        </head>
        <body>
          <h1>Hello World!</h1>
        </body>
      </html>
    `;
    expect(stringHtml).toEqual(`
      <html>
        <head>
          <title>Test</title>
        </head>
        <body>
          <h1>Hello World!</h1>
        </body>
      </html>
    `);
  });
});
