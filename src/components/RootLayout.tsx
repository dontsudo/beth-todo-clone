const RootLayout = ({ children }: { children: JSX.Element }) => (
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>cool thing</title>
      <script
        src="https://unpkg.com/htmx.org@1.9.10"
        integrity="sha384-D1Kt99CQMDuVetoL1lrYwg5t+9QdHe7NLX/SoJYkXDFfX37iInKRy5xLSi8nO7UC"
        crossorigin="anonymous"
      ></script>
      <script src="https://unpkg.com/hyperscript.org@0.9.12"></script>
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body>{children}</body>
  </html>
);

export default RootLayout;
