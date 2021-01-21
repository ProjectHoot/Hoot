/**
 * Using this to generate a described class based on
 * an object and its properties to minimize tedious work.
 * Lazy, but it works
 */

const obj = {"id":177,"content_text":null,"content_html":"<p>Not surprised\nNext sentence: shocking.</p>\n<p>Credibility: 0</p>\n","attachments":[],"author":{"id":65,"username":"MarriedWChildren256","local":true,"host":"hoot.goldandblack.xyz","remote_url":null},"created":"2021-01-12T14:24:12.175483+00:00","deleted":false,"local":true,"replies":[{"id":178,"content_text":null,"content_html":"<p>Edit, also SLATE.  I think the only job description must be \"Do you hate Trump/MAGA/1À or natural rights?\"</p>\n","attachments":[],"author":{"id":65,"username":"MarriedWChildren256","local":true,"host":"hoot.goldandblack.xyz","remote_url":null},"created":"2021-01-12T14:26:18.328424+00:00","deleted":false,"local":true,"replies":[],"has_replies":false,"score":1}],"has_replies":true,"score":2};

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

console.log(new ClassGenerator("Reply", obj).template);
