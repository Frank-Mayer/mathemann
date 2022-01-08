const fs = require("fs");
const exit = require("process").exit;
const execSync = require("child_process").execSync;

const execOptions = { stdio: "inherit" };

const packageJson = JSON.parse(fs.readFileSync("./package.json").toString());
try {
  packageJson.type = "commonjs";
  fs.writeFileSync("./package.json", JSON.stringify(packageJson, null, 2));

  execSync("yarn run tsc -p ./cjsconfig.jsonc", execOptions);

  execSync("yarn run jest --coverage --verbose", execOptions);

  packageJson.type = "module";
  fs.writeFileSync("./package.json", JSON.stringify(packageJson, null, 2));
} catch (err) {
  if (err.toString) {
    console.error(err.toString());
  } else {
    console.error(err);
  }

  packageJson.type = "module";
  fs.writeFileSync("./package.json", JSON.stringify(packageJson, null, 2));

  exit(1);
}
