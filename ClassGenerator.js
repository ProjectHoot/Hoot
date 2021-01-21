/**
 * Using this to generate a described class based on
 * an object and its properties to minimize tedious work.
 * Lazy, but it works
 */

const fs = require("fs");

const post = {
  id: 1,
  title: "Title of post",
  author: {
    id: 1,
    name: "Tim",
    someOtherClass: {
      id: 1,
      title: "Hey",
      visible: false,
    },
  },
  replies: [
    {
      id: 1,
      comment: "Piece of text"
    }
  ],
  locked: false,
};

class ClassGenerator {
  constructor(name, obj, debug = false) {
    this.debug = debug;
    this.template = "";
    this.name = name;
    this.obj = obj;
    this.keys = Object.keys(obj);
    this.properties = {};
    this.dependencies = [];

    this.determineTypes();
    this.injectDependencies();
    this.describeClass();
    this.buildClass();
    this.finalize();
  }

  determineTypes() {
    this.keys.forEach((key) => {
      let value = this.obj[key];
      let type = typeof value;
      let isArray = false;

      if (type === "object") {
        type = key
          .split("")
          .map((l, i) => (i === 0 ? l.toUpperCase() : l))
          .join("");

        isArray = Array.isArray(value);

        if (isArray) {
          value = value[0];

          type = type.replace("ies", "y");
        }

        new ClassGenerator(type, value, this.debug);

        this.dependencies.push(type);
      }
      // default back to string for null-values
      this.properties[key] = value !== null ? `${type}${isArray ? "[]" : ""}` : "string";
    });
  }

  injectDependencies() {
    this.dependencies.forEach(dependency => {
      this.template += `import ${dependency} from "./${dependency}";
`
    });
  }

  describeClass() {
    this.template += `
/**`;
    this.keys.forEach((key) => {
      const type = this.properties[key];

      this.template += `
 * @property {${type}} ${key}`;
    });

    this.template += `
 */
`;
  }

  buildClass() {
    const propertySetters = this.keys.map((key) => {
      const type = this.properties[key];

      if (!["string", "number", "boolean"].includes(type)) {
        if (type.indexOf("[]") > -1) {
          const short = key.substr(0, 1);

          return `this.${key} = ${key} ? ${key}.map(${short} => new ${type.replace("[]", "")}(${short})) : [];`;
        }

        return `this.${key} = new ${type}(${key} || {});`;
      }

      return `this.${key} = ${key};`;
    });

    this.template += `export default class ${this.name} {
  constructor({ ${this.keys.join(", ")} }) {
    ${propertySetters.join("\n    ")}
  }
}
`;
  }

  finalize() {
    if (this.debug) {
      console.log("\x1b[41m", `${this.name}.js`);
      console.log("\x1b[0m");
      console.log(this.template);
    }

    fs.writeFile(`./generated/${this.name}.js`, this.template, {
      encoding: "utf-8",
    }, e => {
      if (e) {
        console.error(`Failed to save ${this.name}!`);
        console.error(e);
      } else {
        console.log(`Generated ${this.name} class`);
      }
    });
  }
}

new ClassGenerator("Post", post, true);
