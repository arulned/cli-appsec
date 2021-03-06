let CRB = require('../../src/crb').CRBHandler;
let out = require('./lib/out');

class ModifyCustomRuleCommand {
  constructor() {
    this.flags = 'modify-custom-rule';
    this.desc = 'Update existing custom rule.';
    this.setup = this.setup.bind(this);
    this.run = this.run.bind(this);
  }

  setup(sywac) {
    sywac
      .number('--config <id>', {
        desc: 'Configuration id. Mandatory if you have more than one configuration.',
        group: 'Options:',
        required: false
      })
      .number('--custom-rule <id>', {
        desc: 'Rule ID.',
        group: 'Options:',
        required: true
      })
      .file('--file <path>', {
        desc: 'File with JSON rules',
        mustExist: true,
        required: true
      });
  }

  run(options) {
    out.print({
      promise: new CRB(options).updateRule(),
      args: options,
      success: (args, data) => {
        return data.id;
      }
    });
  }
}

module.exports = new ModifyCustomRuleCommand();
