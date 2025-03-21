import * as Tooltip from "@radix-ui/react-tooltip";

const CustomTooltip = ({ children, content }) => (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className="bg-gray-800 text-white px-3 py-2 rounded-md shadow-lg" side="right">
            {content}
            <Tooltip.Arrow className="fill-gray-800" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );

  export default CustomTooltip;