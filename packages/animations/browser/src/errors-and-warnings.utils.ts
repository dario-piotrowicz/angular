/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

function generateErrorsOrWarningsCombination(message: string, errorsOrWarnings: string[]) {
  const LINE_START = '\n - ';
  if (errorsOrWarnings.length) {
    const prefix = message ? `${message}:${LINE_START}` : ' - ';
    const combinedErrorMessage = `${prefix}${errorsOrWarnings.join(LINE_START)}`;
    return combinedErrorMessage;
  }
  return null;
}

export function conditionallyThrowErrorsCombination(message: string, errors: string[] = []) {
  const combinedErrorsMessage = generateErrorsOrWarningsCombination(message, errors);
  if (combinedErrorsMessage) {
    throw new Error(combinedErrorsMessage);
  }
}

export function conditionallyShowWarningsCombination(message: string, warnings: string[] = []) {
  if (ngDevMode) {
    const combinedWarningsMessage = generateErrorsOrWarningsCombination(message, warnings);
    if (combinedWarningsMessage) {
      console.warn(combinedWarningsMessage);
    }
  }
}
