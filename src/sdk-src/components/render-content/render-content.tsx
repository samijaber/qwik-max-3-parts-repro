import { getDefaultRegisteredComponents } from "../../constants/builder-registered-components.js";

import builderContext from "../../context/builder.context";

import type { RegisteredComponents } from "../../context/types.js";

import RenderBlocks from "../render-blocks";

import { getContentInitialValue } from "./render-content.helpers.js";

import type { RenderContentProps } from "./render-content.types.js";

import {
  component$,
  useContextProvider,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";

export const RenderContent = component$((props: RenderContentProps) => {
  const state = useStore<any>(
    {
      allRegisteredComponents: [
        // CHECK: removing this fixes it
        ...getDefaultRegisteredComponents(),
        ...(props.customComponents || []),
      ].reduce(
        (acc, curr) => ({
          ...acc,
          [curr.name]: curr,
        }),
        {} as RegisteredComponents
      ),
      useContent: getContentInitialValue({
        content: props.content,
        data: props.data,
      }),
    },
    { deep: true }
  );
  const bdctx = useStore({
    content: state.useContent,
    state: {},
    context: {},
    apiKey: "a",
    apiVersion: undefined,
    // CHECK: replacing this with [] fixes it
    registeredComponents: state.allRegisteredComponents,
    inheritedStyles: {},
  });
  useContextProvider(builderContext, bdctx);
  // CHECK: removing this fixes it
  useVisibleTask$(() => {});

  return (
    <>
      {state.useContent ? (
        <RenderBlocks
          blocks={state.useContent?.data?.blocks}
          key={state.forceReRenderCount}
        ></RenderBlocks>
      ) : null}
    </>
  );
});

export default RenderContent;
