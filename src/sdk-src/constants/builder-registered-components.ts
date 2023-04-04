import { componentInfo as symbolComponentInfo } from "../blocks/symbol/component-info.js";
import { default as Symbol } from "../blocks/symbol/symbol";
import type { RegisteredComponent } from "../context/types.js";
import { default as customCode } from "../blocks/custom-code/custom-code";
import { componentInfo as customCodeInfo } from "../blocks/custom-code/component-info.js";

/**
 * Returns a list of all registered components.
 * NOTE: This needs to be a function to work around ESM circular dependencies.
 */
export const getDefaultRegisteredComponents: () => RegisteredComponent[] =
  () => [
    {
      component: customCode,
      // CHECK: removing this fixes it
      ...customCodeInfo,
    },
    { component: Symbol, ...symbolComponentInfo },
  ];
