import React, { Suspense } from "react";
import AuthComponent from "./components/AuthComponent";

export default function page() {
	return (
		<Suspense>
			<AuthComponent />
		</Suspense>
	);
}
