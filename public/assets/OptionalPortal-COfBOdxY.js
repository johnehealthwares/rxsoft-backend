import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { b as useMantineEnv, f as useProps, r as factory } from "./Box-7OfPvxF3.js";
import { t as useIsomorphicEffect } from "./use-isomorphic-effect-n8PrQSeG.js";
import { t as assignRef } from "./use-merged-ref-BDko4TTF.js";
import { t as require_react_dom } from "./react-dom-BklfeObY.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
//#region node_modules/@mantine/core/esm/core/utils/is-element/is-element.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function isElement(value) {
	if (Array.isArray(value) || value === null) return false;
	if (typeof value === "object") {
		if (value.type === import_react.Fragment) return false;
		return true;
	}
	return false;
}
//#endregion
//#region node_modules/@mantine/core/esm/core/utils/get-single-element-child/get-single-element-child.mjs
function getSingleElementChild(children) {
	const _children = import_react.Children.toArray(children);
	if (_children.length !== 1 || !isElement(_children[0])) return null;
	return _children[0];
}
//#endregion
//#region node_modules/@mantine/core/esm/components/Portal/Portal.mjs
var import_jsx_runtime = require_jsx_runtime();
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom(), 1);
function createPortalNode(props) {
	const node = document.createElement("div");
	node.setAttribute("data-portal", "true");
	typeof props.className === "string" && node.classList.add(...props.className.split(" ").filter(Boolean));
	typeof props.style === "object" && Object.assign(node.style, props.style);
	typeof props.id === "string" && node.setAttribute("id", props.id);
	return node;
}
function getTargetNode({ target, reuseTargetNode, ...others }) {
	if (target) {
		if (typeof target === "string") return document.querySelector(target) || createPortalNode(others);
		return target;
	}
	if (reuseTargetNode) {
		const existingNode = document.querySelector("[data-mantine-shared-portal-node]");
		if (existingNode) return existingNode;
		const node = createPortalNode(others);
		node.setAttribute("data-mantine-shared-portal-node", "true");
		document.body.appendChild(node);
		return node;
	}
	return createPortalNode(others);
}
var defaultProps = { reuseTargetNode: true };
var Portal = factory((props) => {
	const { children, target, reuseTargetNode, ref, ...others } = useProps("Portal", defaultProps, props);
	const [mounted, setMounted] = (0, import_react.useState)(false);
	const nodeRef = (0, import_react.useRef)(null);
	useIsomorphicEffect(() => {
		setMounted(true);
		nodeRef.current = getTargetNode({
			target,
			reuseTargetNode,
			...others
		});
		assignRef(ref, nodeRef.current);
		if (!target && !reuseTargetNode && nodeRef.current) document.body.appendChild(nodeRef.current);
		return () => {
			if (!target && !reuseTargetNode && nodeRef.current) document.body.removeChild(nodeRef.current);
		};
	}, [target]);
	if (!mounted || !nodeRef.current) return null;
	return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children }), nodeRef.current);
});
Portal.displayName = "@mantine/core/Portal";
//#endregion
//#region node_modules/@mantine/core/esm/components/Portal/OptionalPortal.mjs
var OptionalPortal = factory(({ withinPortal = true, children, ...others }) => {
	if (useMantineEnv() === "test" || !withinPortal) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, {
		...others,
		children
	});
});
OptionalPortal.displayName = "@mantine/core/OptionalPortal";
//#endregion
export { getSingleElementChild as n, isElement as r, OptionalPortal as t };
