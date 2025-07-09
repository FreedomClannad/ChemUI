type Props = {
	result: string;
	noData?: string;
};
const Text = (props: Props) => {
	const { result, noData = "No Data" } = props;
	return (
		<div className="mt-2 h-[300px] overflow-y-auto overflow-x-hidden break-words rounded-lg border bg-[#F7F7F7] px-5 py-5 text-sm font-normal leading-4 text-gray-800">
			{result ? (
				<pre className="break-words" style={{ whiteSpace: "pre-wrap" }}>
					{result}
				</pre>
			) : (
				<span className="text-gray-600">{noData}</span>
			)}
		</div>
	);
};

export { Text };
