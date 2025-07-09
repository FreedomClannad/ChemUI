import type { ChemUIToolsItemType } from "#/list/types";
import { downloadFile } from "#/utils";
import { RiDownload2Line } from "@remixicon/react";
import { Tooltip } from "antd";
export const defaultDownloadTools = <T extends { download_url?: string }>(): ChemUIToolsItemType<T>[] => {
	return [
		{
			icon: (item: T) => {
				if (!item.download_url) return;
				return (
					<div className="flex cursor-pointer items-center">
						<Tooltip placement="top" title="download">
							<RiDownload2Line className="h-4 w-4" />
						</Tooltip>
					</div>
				);
			},

			onClick: (item: T) => {
				if (item.download_url) downloadFile(item.download_url, { useBlob: true, onError: (err: Error) => console.error(err) });
			}
		}
	];
};
