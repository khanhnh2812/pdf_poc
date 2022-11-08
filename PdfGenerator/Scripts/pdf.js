module.exports = function (callback) {
  const path = require("path");
  var jsreport = require("@jsreport/jsreport-core")({
    templatingEngines: {},
    rootDirectory: path.join(__dirname, "../../"),
    templatingEngines: {
      allowedModules: "*",
    },
    trustUserCode: true,
  });
  jsreport.use(require("@jsreport/jsreport-chrome-pdf")());
  jsreport.use(require("@jsreport/jsreport-handlebars")());

  var html = require("./mock");
  var data = require("./mock-data");
  var helpers = require("./helpers");

  jsreport
    .init()
    .then(function () {
      return jsreport
        .render({
          template: {
            content: html,
            engine: "handlebars",
            recipe: "chrome-pdf",
            helpers: helpers,
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
