/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {conditionallyShowWarningsCombination, conditionallyThrowErrorsCombination} from '../src/errors-and-warnings.utils';


describe('Animations Browser Util tests', () => {
  describe('conditionallyThrowErrorsCombination', () => {
    const mockErrors = ['A', 'B', 'C'].map(letter => `Error ${letter}`);

    it('should not throw if no errors are provided', () => {
      expect(() => {
        conditionallyThrowErrorsCombination('no errors');
        conditionallyThrowErrorsCombination('empty errors array', []);
      }).not.toThrow();
    });

    it('should throw a valid error when both message and errors are provided', () => {
      expect(() => {
        conditionallyThrowErrorsCombination('Mock Errors', mockErrors);
      }).toThrowError(/^Mock Errors:\n - Error A\n - Error B\n - Error C$/);
    });

    it('should throw a simple list of errors if they are provided but no message is', () => {
      expect(() => {
        conditionallyThrowErrorsCombination('', mockErrors);
      }).toThrowError(/^ - Error A\n - Error B\n - Error C$/);
    });
  });

  describe('conditionallyShowWarningsCombination', () => {
    const mockWarnings = ['A', 'B', 'C'].map(letter => `Warning ${letter}`);

    it('should not show a warning if no warnings are provided', () => {
      const spy = spyOn(console, 'warn');
      conditionallyShowWarningsCombination('no warnings');
      conditionallyShowWarningsCombination('empty warnings array', []);
      expect(spy).not.toHaveBeenCalled();
    });

    it('should show a valid warning when both message and warnings are provided', () => {
      const spy = spyOn(console, 'warn');
      conditionallyShowWarningsCombination('Mock Warnings', mockWarnings);
      expect(spy).toHaveBeenCalledWith(
          jasmine.stringMatching(/^Mock Warnings:\n - Warning A\n - Warning B\n - Warning C$/));
    });

    it('should not a simple list of warnings if they are provided by no message is', () => {
      const spy = spyOn(console, 'warn');
      conditionallyShowWarningsCombination('', mockWarnings);
      expect(spy).toHaveBeenCalledWith(
          jasmine.stringMatching(/^ - Warning A\n - Warning B\n - Warning C$/));
    });
  });
});
