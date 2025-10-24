import { useRef, useEffect, useCallback, type TextareaHTMLAttributes } from "react";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
	maxHeight?: number;
};

const AutoResizeTextarea = ({ maxHeight, value, ...props }: Props) => {
	const ref = useRef<HTMLTextAreaElement>(null);

	const resize = useCallback(() => {
		const el = ref.current;
		if (!el) return;
		el.style.height = "auto";
		const newHeight = el.scrollHeight;
		if (maxHeight && newHeight > maxHeight) {
			el.style.height = `${maxHeight}px`;
			el.style.overflowY = "auto";
		} else {
			el.style.height = `${newHeight}px`;
			el.style.overflowY = "hidden";
		}
	}, [maxHeight]);

	// ✅ 初次渲染 + value 更新时同步高度
	useEffect(() => {
		resize();
	}, [value, resize]);

	return (
		<textarea
			{...props}
			ref={ref}
			value={value}
			rows={1}
			onInput={resize}
			className={`w-full resize-none overflow-hidden outline-none transition-all duration-100 ease-in-out ${
				props.className ?? ""
			}`}
		/>
	);
};

export { AutoResizeTextarea };
