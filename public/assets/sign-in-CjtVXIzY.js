import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { Mr as useSearch, x as RxSignIn } from "./index-BRcLwOKn.js";
//#region src/features/auth/sign-in/pages/sign-in-page.tsx
var import_jsx_runtime = require_jsx_runtime();
function SignIn() {
	const { redirect } = useSearch({ from: "/(auth)/sign-in" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RxSignIn, { redirectTo: redirect });
}
//#endregion
//#region src/routes/(auth)/sign-in.tsx?tsr-split=component
var SplitComponent = SignIn;
//#endregion
export { SplitComponent as component };
