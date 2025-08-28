import { GroupedVirtuoso } from "react-virtuoso";
import { useMemo } from "react";

const Demo = () => {
	const { users, groups, groupCounts } = useMemo(() => {
		const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

		const users = letters.flatMap(letter => {
			return Array.from({ length: 20 }, (_, index) => ({
				name: `${letter} User ${index}`,
				initials: `${letter}${index}`,
				description: `Description for user ${index}`
			}));
		});

		const groups = Array.from({ length: 10 }, (_, index) => {
			return letters[index];
		});

		const groupCounts = groups.map((letter, index) => {
			return users.filter((user, userIndex) => user.name.startsWith(letter)).length;
		});
		return { users, groups, groupCounts };
	}, []);

	console.log(users);
	console.log(groups);
	console.log(groupCounts);

	return (
		<>
			<div style={{ height: "100vh" }}>
				<GroupedVirtuoso
					groupCounts={groupCounts}
					style={{ height: "100%" }}
					groupContent={index => {
						console.log(index);
						return (
							<div
								style={{
									backgroundColor: "var(--background)",
									paddingTop: "1rem",
									borderBottom: "1px solid var(--border)"
								}}
							>
								{groups[index]}
							</div>
						);
					}}
					itemContent={index => {
						return <div>{users[index].name}</div>;
					}}
				/>
			</div>
		</>
	);
};

export default Demo;
