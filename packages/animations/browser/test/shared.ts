/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {trigger} from '@angular/animations';

import {TriggerAst} from '../src/dsl/animation_ast';
import {buildAnimationAst} from '../src/dsl/animation_ast_builder';
import {AnimationTrigger, buildTrigger} from '../src/dsl/animation_trigger';
import {NoopAnimationStyleNormalizer} from '../src/dsl/style_normalization/animation_style_normalizer';
import {conditionallyShowWarningsCombination, conditionallyThrowErrorsCombination} from '../src/errors-and-warnings.utils';
import {MockAnimationDriver} from '../testing/src/mock_animation_driver';

export function makeTrigger(
    name: string, steps: any, skipErrors: boolean = false): AnimationTrigger {
  const driver = new MockAnimationDriver();
  const errors: string[] = [];
  const warnings: string[] = [];
  const triggerData = trigger(name, steps);
  const triggerAst = buildAnimationAst(driver, triggerData, errors, warnings) as TriggerAst;
  if (!skipErrors) {
    conditionallyThrowErrorsCombination(
        `Animation parsing for the ${name} trigger have failed`, errors);
  }
  conditionallyShowWarningsCombination(
      `Animation parsing for the ${name} trigger presents the following warnings`, warnings);
  return buildTrigger(name, triggerAst, new NoopAnimationStyleNormalizer());
}
