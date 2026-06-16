import { t as require_react } from "./react-DKQS5v0G.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as useDirection } from "./DirectionProvider-CZXuqRWj.js";
require_react();
function getRefProp(element) {
	if ("19.2.7".startsWith("18."));
	return element?.props?.ref;
}
//#endregion
//#region node_modules/@mantine/core/esm/utils/Floating/FloatingArrow/get-arrow-position-styles.mjs
function horizontalSide(placement, arrowY, arrowOffset, arrowPosition) {
	if (placement === "center" || arrowPosition === "center") return { top: arrowY };
	if (placement === "end") return { bottom: arrowOffset };
	if (placement === "start") return { top: arrowOffset };
	return {};
}
function verticalSide(placement, arrowX, arrowOffset, arrowPosition, dir) {
	if (placement === "center" || arrowPosition === "center") return { left: arrowX };
	if (placement === "end") return { [dir === "ltr" ? "right" : "left"]: arrowOffset };
	if (placement === "start") return { [dir === "ltr" ? "left" : "right"]: arrowOffset };
	return {};
}
var radiusByFloatingSide = {
	bottom: "borderTopLeftRadius",
	left: "borderTopRightRadius",
	right: "borderBottomLeftRadius",
	top: "borderBottomRightRadius"
};
function getArrowPositionStyles({ position, arrowSize, arrowOffset, arrowRadius, arrowPosition, arrowX, arrowY, dir }) {
	const [side, placement = "center"] = position.split("-");
	const baseStyles = {
		width: arrowSize,
		height: arrowSize,
		transform: "rotate(45deg)",
		position: "absolute",
		[radiusByFloatingSide[side]]: arrowRadius
	};
	const arrowPlacement = -arrowSize / 2;
	if (side === "left") return {
		...baseStyles,
		...horizontalSide(placement, arrowY, arrowOffset, arrowPosition),
		right: arrowPlacement,
		borderLeftColor: "transparent",
		borderBottomColor: "transparent",
		clipPath: "polygon(100% 0, 0 0, 100% 100%)"
	};
	if (side === "right") return {
		...baseStyles,
		...horizontalSide(placement, arrowY, arrowOffset, arrowPosition),
		left: arrowPlacement,
		borderRightColor: "transparent",
		borderTopColor: "transparent",
		clipPath: "polygon(0 100%, 0 0, 100% 100%)"
	};
	if (side === "top") return {
		...baseStyles,
		...verticalSide(placement, arrowX, arrowOffset, arrowPosition, dir),
		bottom: arrowPlacement,
		borderTopColor: "transparent",
		borderLeftColor: "transparent",
		clipPath: "polygon(0 100%, 100% 100%, 100% 0)"
	};
	if (side === "bottom") return {
		...baseStyles,
		...verticalSide(placement, arrowX, arrowOffset, arrowPosition, dir),
		top: arrowPlacement,
		borderBottomColor: "transparent",
		borderRightColor: "transparent",
		clipPath: "polygon(0 100%, 0 0, 100% 0)"
	};
	return {};
}
//#endregion
//#region node_modules/@mantine/core/esm/utils/Floating/FloatingArrow/FloatingArrow.mjs
var import_jsx_runtime = require_jsx_runtime();
function FloatingArrow({ position, arrowSize, arrowOffset, arrowRadius, arrowPosition, visible, arrowX, arrowY, style, ...others }) {
	const { dir } = useDirection();
	if (!visible) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		...others,
		style: {
			...style,
			...getArrowPositionStyles({
				position,
				arrowSize,
				arrowOffset,
				arrowRadius,
				arrowPosition,
				dir,
				arrowX,
				arrowY
			})
		}
	});
}
FloatingArrow.displayName = "@mantine/core/FloatingArrow";
//#endregion
//#region node_modules/@mantine/core/esm/utils/Floating/get-floating-position/get-floating-position.mjs
function getFloatingPosition(dir, position) {
	if (dir === "rtl" && (position.includes("right") || position.includes("left"))) {
		const [side, placement] = position.split("-");
		const flippedPosition = side === "right" ? "left" : "right";
		return placement === void 0 ? flippedPosition : `${flippedPosition}-${placement}`;
	}
	return position;
}
//#endregion
export { FloatingArrow as n, getRefProp as r, getFloatingPosition as t };
