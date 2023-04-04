import BuilderContext from "../context/builder.context";


import type { BuilderBlock } from "../types/builder-block.js";


import RenderBlock from "./render-block/render-block";

import {
  component$,
  useContext,
} from "@builder.io/qwik";

export type RenderBlockProps = {
  blocks?: BuilderBlock[];
  parent?: string;
  path?: string;
  styleProp?: Record<string, any>;
};
export const onMouseEnter = function onMouseEnter(
  props,
) {
};
export const RenderBlocks = component$((props: RenderBlockProps) => {
  const builderContext = useContext(BuilderContext);
  return (
    <div
      onMouseEnter$={(event) => onMouseEnter(props)}
    >
      {props.blocks
        ? (props.blocks || []).map(function (block) {
            return (
              <RenderBlock
                key={"render-block-" + block.id}
                block={block}
                context={builderContext}
              ></RenderBlock>
            );
          })
        : null}
    </div>
  );
});

export default RenderBlocks;
