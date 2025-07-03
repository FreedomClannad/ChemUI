import "rc-image/assets/index.css";
import "./index.css";
import RcImage from "rc-image";
import type { ImageProps } from "rc-image";
import type { CSSProperties, MouseEvent, ReactNode } from "react";
import { memo, useEffect, useState } from "react";
import { Skeleton } from "antd";
import { ZoomInOutlined } from "@ant-design/icons";
import { defaultIcons } from "./common";
import { errorBase64 } from "./base";
import { cn } from "#/utils";
export type ImagePlacement = "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
type PlacementPosition = {
	top?: number;
	bottom?: number;
	left?: number;
	right?: number;
};
type Props = {
	placement?: ImagePlacement | boolean | PlacementPosition;
	rootStyle?: CSSProperties;
	rootDivClassName?: string;
	zoomIsOpen?: boolean;
	otherPlacement?: ImagePlacement | boolean;
	otherPlacementIcons?: ReactNode;
	errorText?: string;
	errorImg?: string;
} & ImageProps;
const Image = (props: Props) => {
	const {
		placement = false,
		rootStyle,
		rootDivClassName,
		zoomIsOpen = true,
		otherPlacement,
		otherPlacementIcons,
		src,
		errorText = "",
		errorImg = "/images/img_error.png"
	} = props;
	const [positionStyle, setPositionStyle] = useState<CSSProperties>({ top: 4, right: 4 });
	const [previewVisible, setPreviewVisible] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);
	const [loading, setLoading] = useState(true); // 控制占位符显示状态
	useEffect(() => {
		if (!placement) return;

		if (placement === "topLeft") setPositionStyle({ top: 10, left: 10 });
		else if (placement === "topRight") setPositionStyle({ top: 10, right: 10 });
		else if (placement === "bottomLeft") setPositionStyle({ bottom: 10, left: 10 });
		else if (placement === "bottomRight") setPositionStyle({ bottom: 10, right: 10 });
		else if (typeof placement === "object") setPositionStyle(placement);
	}, []);

	const handleZoomInOut = (e: MouseEvent) => {
		e.stopPropagation();
		setPreviewVisible(true);
	};
	if (!src || src === "ERROR" || isError) {
		return (
			<div className={cn("flex h-full w-full flex-col justify-center", rootDivClassName)} style={{ ...rootStyle }}>
				<div className="flex h-[180px] justify-center">
					<img src={errorImg} alt="Error" className="max-h-[180px] py-2" />
				</div>
				{errorText && (
					<>
						<div className="mb-2 flex items-center justify-center text-sm text-red-500">
							<span className="text-gray-1003">{errorText}</span>
						</div>
					</>
				)}
			</div>
		);
	}
	const handleImageLoad = () => {
		// 延迟隐藏占位符，例如 1 秒
		setTimeout(() => setLoading(false), 300);
	};
	return (
		<>
			<div className={cn("relative w-full overflow-y-hidden", rootDivClassName)} style={{ ...rootStyle }}>
				{loading && (
					<div
						style={{
							position: "absolute",
							top: 0,
							left: 0,
							width: "100%",
							height: "100%",
							background: "#fff",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							zIndex: 1
						}}
					>
						<Skeleton.Image />
					</div>
				)}
				<RcImage
					{...props}
					fallback={errorBase64}
					style={{ opacity: loading ? 0 : 1, transition: "opacity 0.5s" }}
					preview={{
						className: "alm-image-preview",
						icons: defaultIcons,
						visible: previewVisible,
						onVisibleChange: visible => {
							if (!visible) setPreviewVisible(false);
						}
					}}
					onError={() => {
						setIsError(true);
					}}
					onLoad={handleImageLoad}
				/>

				{placement && !isError && (
					<>
						<div
							className={cn("absolute flex items-center justify-center rounded-[2px] bg-[#F2F3F5] p-1")}
							style={{ ...positionStyle }}
						>
							{zoomIsOpen && (
								<ZoomInOutlined
									style={{ fontSize: 16, lineHeight: "16px", color: "#999" }}
									className="cursor-pointer"
									onClick={handleZoomInOut}
								/>
							)}
						</div>
					</>
				)}
				{otherPlacement && !isError && <>{otherPlacementIcons}</>}
			</div>
		</>
	);
};

export default memo(Image);
