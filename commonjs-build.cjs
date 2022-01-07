const fs = require("fs");
const exit = require("process").exit;
const execSync = require("child_process").execSync;

const execOptions = { stdio: "inherit" };

try {
  const packageJson = JSON.parse(fs.readFileSync("./package.json").toString());
  packageJson.type = "commonjs";

  execSync("yarn run tsc -p ./cjsconfig.jsonc", execOptions);

  execSync("yarn run jest --coverage --verbose", execOptions);

  packageJson.type = "module";
} catch (err) {
  if (err.toString) {
    console.error(err.toString());
  } else {
    console.error(err);
  }

  exit(1);
}
