import { t as Box } from "./Box-7OfPvxF3.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Container } from "./Container-D8oY7QjB.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { F as WebsiteLayout, L as darkGreen, Lr as Title, V as muted, z as ink } from "./index-DwQ-NyPQ.js";
//#region src/features/damorex/pages/privacy.tsx
var import_jsx_runtime = require_jsx_runtime();
var sections = [
	{
		title: "Information We Collect",
		content: "When you use Damorex, we collect information that you provide directly, including your name, email address, phone number, delivery address, payment details and medical information such as prescriptions and health history relevant to your orders. We also collect technical information automatically, including your IP address, device type, browser information and how you interact with our website. This data helps us process orders, verify prescriptions and improve your experience on our platform."
	},
	{
		title: "How We Use Your Information",
		content: "The information we collect is used to process and fulfil your orders, verify prescriptions with our licensed pharmacists, communicate order updates via SMS, WhatsApp or email, provide customer support and pharmacist consultations, send health tips, refill reminders and promotional offers (with your consent), improve our website functionality and user experience, and comply with legal and regulatory obligations applicable to pharmacy operations in Nigeria."
	},
	{
		title: "Data Protection & Security",
		content: "Damorex employs industry-standard security measures to protect your personal and medical information. All data transmitted between your browser and our servers is encrypted using SSL/TLS protocols. Your prescription data and medical history are stored with additional encryption layers and accessed only by authorised pharmacy personnel. We conduct regular security audits and adhere to the data protection principles outlined in the Nigeria Data Protection Regulation (NDPR). Despite these measures, no electronic storage or transmission method is completely secure, and we encourage you to take precautions when sharing sensitive information online."
	},
	{
		title: "Sharing of Information",
		content: "We do not sell, rent or trade your personal information to third parties. Your data may be shared with trusted partners who assist in order fulfilment — such as payment processors, logistics providers and pharmaceutical suppliers — solely for the purpose of completing your transaction. These partners are contractually bound to protect your data and may not use it for any other purpose. We may also disclose information when required by law, court order or regulatory authority in compliance with Nigerian pharmaceutical and data protection regulations."
	},
	{
		title: "Your Rights",
		content: "You have the right to access the personal data we hold about you, request corrections to inaccurate or incomplete information, withdraw consent for marketing communications at any time, request deletion of your account and associated data where permitted by law, and request a copy of your data in a portable format. To exercise any of these rights, please contact our Data Protection Officer using the details below. We will respond to your request within the timeframe required by applicable law."
	},
	{
		title: "Cookies",
		content: "Damorex uses cookies and similar tracking technologies to enhance your browsing experience, remember your preferences, analyse site traffic and support our marketing efforts. Cookies are small text files stored on your device by your web browser. You can control cookie preferences through your browser settings. Disabling certain cookies may affect the functionality of our website, including the ability to place orders or use your account. We use both session cookies (which expire when you close your browser) and persistent cookies (which remain for a set period)."
	},
	{
		title: "Contact Us",
		content: "If you have any questions, concerns or requests regarding this Privacy Policy or how Damorex handles your data, please contact our Data Protection Officer via email at privacy@damorexpharmacy.com, by phone at +234 800 DAMOREX, or by visiting any of our branch locations. We are committed to addressing your concerns promptly and transparently. This policy may be updated periodically, and we will notify you of material changes via email or a notice on our website."
	}
];
function PrivacyPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WebsiteLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		py: {
			base: 48,
			md: 72
		},
		style: {
			background: `linear-gradient(135deg, ${darkGreen} 0%, #0B4A28 50%, #0F172A 100%)`,
			color: "#fff"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
			size: "xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
				gap: 16,
				maw: 760,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
					order: 1,
					className: "damorex-heading hero-title",
					children: "Privacy Policy"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					size: "lg",
					lh: 1.7,
					c: "rgba(255,255,255,0.78)",
					children: "How Damorex collects, uses and protects your personal and medical information."
				})]
			})
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
		size: "xl",
		py: {
			base: 48,
			md: 76
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
			maw: 860,
			mx: "auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
				gap: 36,
				children: [sections.map((section) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
					gap: 8,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
						order: 2,
						className: "damorex-heading",
						size: "h3",
						c: ink,
						children: section.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						c: muted,
						lh: 1.7,
						children: section.content
					})]
				}, section.title)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					size: "sm",
					c: muted,
					mt: "md",
					children: "Last updated: January 2026. Damorex Pharmacy. All rights reserved."
				})]
			})
		})
	})] });
}
//#endregion
//#region src/routes/damorex/privacy-policy.tsx?tsr-split=component
var SplitComponent = PrivacyPage;
//#endregion
export { SplitComponent as component };
