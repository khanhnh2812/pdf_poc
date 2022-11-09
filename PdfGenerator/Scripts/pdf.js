module.exports = function (callback) {
  const jsreport = require("@jsreport/jsreport-core")({
    templatingEngines: {
      allowedModules: "*",
    },
    trustUserCode: true,
  });
  jsreport.use(require("@jsreport/jsreport-chrome-pdf")());
  jsreport.use(require("@jsreport/jsreport-handlebars")());
  const data = require("./mock-data");

  const fs = require("fs");
  const path = require("path");
  const parsePath = (str) => path.join(__dirname, str);
  const helpers = fs.readFileSync(parsePath("./helpers.js")).toString();
  const html = fs.readFileSync(parsePath("./mock.html")).toString();

  const asset = `
    function asset(url, type) {
      if (type === "dataURI") 
        return path.join(
          '${__dirname.replaceAll("\\", "/")}',
          url
        );
      return;
    }
  `;

  jsreport
    .init()
    .then(function () {
      return jsreport
        .render({
          template: {
            content: html,
            engine: "handlebars",
            recipe: "chrome-pdf",
            helpers: asset + helpers,
          },
          data: data,
        })
        .then(function (resp) {
          callback(null, resp.content.toJSON().data);
        });
    })
    .catch(function (e) {
      callback(e, null);
    });
};
