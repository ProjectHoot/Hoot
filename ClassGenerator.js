/**
 * Using this to generate a described class based on
 * an object and its properties to minimize tedious work.
 * Lazy, but it works
 */

const obj = JSON.parse(`{"author":{"host":"hoot.goldandblack.xyz","id":1,"local":true,"remote_url":null,"username":"jd"},"community":{"host":"hoot.goldandblack.xyz","id":23,"local":true,"name":"gaming","remote_url":null},"content_html":"<p><img src=\\"https://i.imgur.com/DNsFIFM.png\\" alt=\\"\\">\\n<a href=\\"https://i.imgur.com/DNsFIFM.png\\" rel=\\"noopener noreferrer\\">https://i.imgur.com/DNsFIFM.png</a></p>\\n","content_text":null,"created":"2021-01-21T16:15:50.693645+00:00","href":null,"id":91,"replies_count_total":0,"score":0,"title":"What a lovely city of death. "}`);

class ClassGenerator {
  constructor(name, obj) {
    this.name = name;
    this.obj = obj;
    this.keys = Object.keys(obj);
    this.properties = {};
    this.template = `/**`;

    this.determineTypes();
    this.describeClass();
    this.buildClass();
  }

  determineTypes() {
    this.keys.forEach(key => {
      const value = this.obj[key];
      const type = typeof value;
      // default back to string for null-values
      this.properties[key] = value !== null ? type : "string";
    });
  }

  describeClass() {
    this.keys.forEach(key => {
      const type = this.properties[key];

      this.template += `
 * @property {${type}} ${key}`;
    });

    this.template += `
 */
`;
  }

  buildClass() {
    const propertySetters = this.keys.map(key => {
      return `this.${key} = ${key};`
    });

    this.template += `export default class ${this.name} {
  constructor({ ${this.keys.join(", ")} }) {
    ${propertySetters.join('\n    ')}
  }
}`
  }
}

console.log(new ClassGenerator("Post", obj).template);
