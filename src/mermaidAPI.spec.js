/* eslint-env jasmine */
import mermaidAPI from './mermaidAPI';

describe('when using mermaidAPI and', function() {
  describe('doing initialize', function() {
    beforeEach(function() {
      document.body.innerHTML = '';
    });

    it('should copy a literal into the configuration', function() {
      const orgConfig = mermaidAPI.getConfig();
      expect(orgConfig.testLiteral).toBe(undefined);

      mermaidAPI.initialize({ testLiteral: true });
      const config = mermaidAPI.getConfig();

      expect(config.testLiteral).toBe(true);
    });
    it('should copy a an object into the configuration', function() {
      const orgConfig = mermaidAPI.getConfig();
      expect(orgConfig.testObject).toBe(undefined);

      const object = {
        test1: 1,
        test2: false
      };

      mermaidAPI.initialize({ testObject: object });
      mermaidAPI.initialize({ testObject: { test3: true } });
      const config = mermaidAPI.getConfig();

      expect(config.testObject.test1).toBe(1);
      expect(config.testObject.test2).toBe(false);
      expect(config.testObject.test3).toBe(true);
    });
  });
  describe('parsing input', function() {
    it('it should throw for an invalid definiton', function() {
      expect(() => mermaidAPI.parse('this is not a mermaid diagram definition')).toThrow();
    });
    it('it should not throw for a valid definiton', function() {
      expect(() => mermaidAPI.parse('graph TD;A--x|text including URL space|B;')).not.toThrow();
    });
  });

  describe('checking validity of input', function() {
    it('it should return false for an invalid definiton', function() {
      const res = mermaidAPI.validate('this is not a mermaid diagram definition');
      expect(res).toBeFalsy();
    });
    it('it should return true for a valid definiton', function() {
      const res = mermaidAPI.validate('graph TD;A--x|text including URL space|B;');
      expect(res).toBeTruthy();
    });
  });
});
