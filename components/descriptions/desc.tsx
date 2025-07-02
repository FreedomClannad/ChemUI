import { BaseDescriptionsLayout, type BaseDescriptionsLayoutType } from "#/descriptions/base-desc-layout.tsx";
import { cn } from "#/utils";

export type DescriptionsType = BaseDescriptionsLayoutType & {
	description?: string;
	descClassName?: string;
};

const Descriptions = (props: DescriptionsType) => {
	const { description, descClassName, children } = props;
	return (
		<BaseDescriptionsLayout {...props}>
			{description && <div className={cn("mb-2.5 text-sm leading-6 text-gray-500", descClassName)}>{description}</div>}
			{children}
		</BaseDescriptionsLayout>
	);
};

export { Descriptions };
