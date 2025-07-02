import { useMemo } from "react";
import { cn } from "#/utils/";
import { RiFileTextLine } from "@remixicon/react";

export type BaseTableItem = {
	key: string;
	value: string;
};

type Props = {
	data: BaseTableItem[];
};

const BaseTable = (props: Props) => {
	const { data } = props;
	const dataLength = useMemo(() => data.length, [data]);
	return (
		<div>
			<div className="rounded-lg border border-gray-200">
				<table className="text-gray-1100 w-full text-xs font-normal leading-[18px]">
					<thead className="text-gray-1100 uppercase">
						<tr className="border-b border-gray-200 text-sm">
							<th className="w-[30%] rounded-tl-lg bg-gray-50 p-2 pl-3 text-left font-medium">Index</th>
							<th className="rounded-tr-lg bg-gray-50 p-2 pl-3 text-left font-medium">File</th>
						</tr>
					</thead>
					<tbody className="text-sm">
						{data.map((item, index) => (
							<tr key={index} className="border-b border-gray-200 last:border-0">
								<td className={cn("bg-gray-25 h-[50px] py-2 pl-3 pr-2.5", index === dataLength - 1 && "rounded-bl-lg")}>
									<div className="flex items-center justify-start">
										<span>{item.key}</span>
									</div>
								</td>
								<td className={cn("bg-gray-25 h-[50px] py-2 pl-3 pr-2.5", index === dataLength - 1 && "rounded-br-lg")}>
									<div className="flex items-center justify-start">
										<RiFileTextLine className="mr-1 flex-shrink-0 text-sm" />
										<span className="max-w-[100%] break-all">{item.value}</span>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export { BaseTable };
