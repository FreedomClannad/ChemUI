import { useState } from "react";

type ImgProps = React.ImgHTMLAttributes<HTMLImageElement>;
const Img = (props: ImgProps) => {
	const { src, alt } = props;
	const [imgSrc, setImgSrc] = useState(src);

	return <img {...props} alt={alt} src={imgSrc} onError={() => setImgSrc("/images/img_error.png")} />;
};

export const TableImgBox = <T extends object>(src: string, record: T, index: number) => {
	const upperCaseSrc = src.toUpperCase();
	if (!src || upperCaseSrc === "ERROR" || upperCaseSrc === "FAIL")
		return <img src="/images/img_error.png" alt="No Data" style={{ width: 87 }}></img>;

	return <Img src={src} alt="" style={{ width: 100, height: 100 }} />;
};
