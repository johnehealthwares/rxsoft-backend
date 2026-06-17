import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Loader } from "./Loader-De36wNGz.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Button } from "./Button-C98OF_32.js";
import { t as Center } from "./Center-UaCPHyv3.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { n as RefreshCw, t as WifiOff } from "./wifi-off-D4RidclX.js";
import { Fr as useSearch, Lr as Title, Pr as useNavigate, jr as rxsoftApi } from "./index-DwQ-NyPQ.js";
//#region src/features/errors/service-unavailable-error.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function ServiceUnavailableError() {
	const navigate = useNavigate();
	const { return: returnPath, url: failedUrl } = useSearch({ from: "/(errors)/service-unavailable" });
	const [retryCount, setRetryCount] = (0, import_react.useState)(0);
	const [checking, setChecking] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const interval = setInterval(async () => {
			setChecking(true);
			try {
				await rxsoftApi.get("/auth/me", { timeout: 5e3 });
				clearInterval(interval);
				navigate({ to: returnPath || "/" });
			} catch {
				setRetryCount((c) => c + 1);
			} finally {
				setChecking(false);
			}
		}, 5e3);
		return () => clearInterval(interval);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Center, {
		style: {
			height: "100vh",
			width: "100%"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
			align: "center",
			gap: "lg",
			maw: 480,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WifiOff, {
					size: 64,
					strokeWidth: 1.5
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
					order: 1,
					children: "Service Unavailable"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					c: "dimmed",
					ta: "center",
					children: "The backend server is not responding. Automatically retrying..."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, { children: [checking ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { size: "sm" }) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
					size: "sm",
					c: "dimmed",
					children: ["Retry #", retryCount]
				})] }),
				failedUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
					size: "xs",
					c: "dimmed",
					children: ["Failed URL: ", failedUrl]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { size: 16 }),
					onClick: () => {
						setRetryCount(0);
					},
					children: "Retry Now"
				})
			]
		})
	});
}
//#endregion
//#region src/routes/(errors)/service-unavailable.tsx?tsr-split=component
var SplitComponent = ServiceUnavailableError;
//#endregion
export { SplitComponent as component };
