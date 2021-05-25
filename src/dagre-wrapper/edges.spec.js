import { intersection } from './edges';
import { setLogLevel, logger } from '../logger';

describe('Graphlib decorations', () => {
  let node;
  beforeEach(function () {
    setLogLevel(1);
    node = { x:171, y:100, width: 210, height: 184};
  });

  describe('intersection', function () {
    it('case 1 - intersection on left edge of box', function () {
      const o = {x: 31, y: 143.2257070163421};
      const i = {x: 99.3359375, y: 100}
      const int = intersection(node, o, i);
      expect(int.x).toBe(66)
      expect(int.y).toBeCloseTo(122.139)
    });

    it('case 2 - intersection on left edge of box', function () {
      const o = {x: 310.2578125, y: 169.88002060631462};
      const i = {x: 127.96875, y: 100};
      const node2 = {
        height: 337.5,
        width: 184.4609375,
        x: 100.23046875,
        y: 176.75
      }
      const int = intersection(node2, o, i);
            expect(int.x).toBeCloseTo(192.4609375)
      expect(int.y).toBeCloseTo(145.15711441743503)

    });
    it('case 3 - intersection on otop of box outside point greater then inside point', function () {
      const o = {x: 157.21875, y: 38.83361558001693};
      const i = {x: 104.1328125, y: 105};
      const node2 = {
        width: 211.96875,
        x: 113.984375,
        y: 164.25,
        height: 176.5
      }
      const int = intersection(node2, o, i);
            expect(int.x).toBeCloseTo(127.39979619565217)
      expect(int.y).toBeCloseTo(76)

    });
        it('case 4 - intersection on top of box inside point greater then inside point', function () {
          const o = {x: 144.65625, y: 38.83361558001693};
          const i = {x: 197.7421875, y: 105};
          const node2 = {
            width: 211.96875,
            x: 113.984375,
            y: 164.25,
            height: 176.5
          }
          const int = intersection(node2, o, i);
                expect(int.x).toBeCloseTo(167.9232336956522)
          expect(int.y).toBeCloseTo(76)

        });
  });
});
