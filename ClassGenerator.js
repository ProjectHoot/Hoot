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
      comment: "Piece of text",
      replies: [],
      author: {},
    },
  ],
  locked: false,
};

const isDate = (date) => {
  return date instanceof Date && !isNaN(date);
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

      if (type === "object" && value !== null && !isDate(value)) {
        type = key
          .split("")
          .map((l, i) => (i === 0 ? l.toUpperCase() : l))
          .join("");

        isArray = Array.isArray(value);

        if (isArray) {
          type = type.replace("ies", "y");

          if (type.slice(-1) === "s") {
            type = type.substr(0, type.length - 1);
          }

          if (type !== this.name) {
            value = value[0];
          }
        }

        if (type !== this.name) {
          if (Object.keys(value).length > 0) {
            new ClassGenerator(type, value, this.debug);
          }

          this.dependencies.push(type);
        }
      }

      if (isDate(value)) {
        type = "Date";
      }

      // default back to string for null-values
      this.properties[key] =
        value !== null ? `${type}${isArray ? "[]" : ""}` : "string";
    });
  }

  injectDependencies() {
    this.dependencies.forEach((dependency) => {
      this.template += `import ${dependency} from "./${dependency}";\n`;
    });

    if (this.dependencies.length > 0) {
      this.template += `\n`;
    }
  }

  describeClass() {
    this.template += `/**`;
    this.keys.forEach((key) => {
      const type = this.properties[key];

      this.template += `\n * @property {${type}} ${key}`;
    });

    this.template += `\n */\n`;
  }

  buildClass() {
    const propertySetters = this.keys.map((key) => {
      const type = this.properties[key];

      if (!["string", "number", "boolean", "Date"].includes(type)) {
        if (type.indexOf("[]") > -1) {
          const short = key.substr(0, 1);

          return `this.${key} = ${key} ? ${key}.map(${short} => new ${type.replace(
            "[]",
            ""
          )}(${short})) : [];`;
        }

        return `this.${key} = new ${type}(${key} || {});`;
      }

      if (type === "Date") {
        return `this.${key} = new Date(${key});`
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
      // console.log("\x1b[41m", `${this.name}.js`, "\x1b[0m");
      console.log(this.template);
    }

    fs.writeFile(
      `./generated/${this.name}.js`,
      this.template,
      {
        encoding: "utf-8",
      },
      (e) => {
        if (e) {
          console.error(`Failed to save ${this.name}!`);
          console.error(e);
        } else {
          console.log(`Generated ${this.name} class`);
        }
      }
    );
  }
}

const declaration = {
  id: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  user: {
    id: 1,
    profile: {
      username: "Tim",
      birthdate: new Date(),
      locked: false,
      roles: [
        {
          id: 10,
          name: "edit"
        }
      ]
    },
  },
  products: [
    {
      id: 1,
      name: "Pakje Marlboro",
      vatRate: 1
    }
  ],
  travels: [
    {
      id: 1,
      from: {
        address: {
          street: "Newtonstraat 140",
          city: "Osdorp"
        }
      },
      to: {
        address: {

        }
      }
    }
  ]
};

new ClassGenerator("Declaration", declaration, true);
