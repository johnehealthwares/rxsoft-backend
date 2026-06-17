import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { t as Box } from "./Box-7OfPvxF3.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Paper } from "./Paper-DvHgmkDB.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Input } from "./Input-BAf-8_ks.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Badge } from "./Badge-B8o0TXXb.js";
import { t as Button } from "./Button-C98OF_32.js";
import { t as Container } from "./Container-D8oY7QjB.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { t as FileUp } from "./file-up-B7FXjQGu.js";
import { $ as useCreatePrescription, B as line, F as WebsiteLayout, H as soft, I as buttonStyles, Lr as Title, R as green, V as muted, bn as Upload, tr as Check, z as ink, zr as ThemeIcon } from "./index-DwQ-NyPQ.js";
import { n as PageLoader } from "./loaders-DXtlW3kz.js";
//#region src/features/damorex/prescriptions/upload.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function UploadPrescriptionPage() {
	const [files, setFiles] = (0, import_react.useState)([]);
	const [name, setName] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [notes, setNotes] = (0, import_react.useState)("");
	const [success, setSuccess] = (0, import_react.useState)(false);
	const fileRef = (0, import_react.useRef)(null);
	const { mutate: submit, isPending } = useCreatePrescription();
	const handleUpload = () => {
		if (!files.length) return;
		const formData = new FormData();
		files.forEach((f) => formData.append("files", f));
		if (name) formData.append("name", name);
		if (phone) formData.append("phone", phone);
		if (email) formData.append("email", email);
		if (notes) formData.append("notes", notes);
		submit(formData, { onSuccess: () => {
			setSuccess(true);
			setFiles([]);
			setName("");
			setPhone("");
			setEmail("");
			setNotes("");
		} });
	};
	if (success) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebsiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
		size: "sm",
		py: 80,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, {
			radius: 30,
			p: "xl",
			withBorder: true,
			style: {
				borderColor: line,
				textAlign: "center"
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeIcon, {
					radius: "xl",
					size: 64,
					color: "green",
					mx: "auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 32 })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
					order: 2,
					className: "damorex-heading",
					mt: "md",
					children: "Prescription Submitted"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					c: muted,
					lh: 1.7,
					mt: "sm",
					children: "Our licensed pharmacists will review your prescription. You'll receive an update via WhatsApp or email."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					radius: "xl",
					mt: "lg",
					color: "green",
					styles: buttonStyles,
					style: { background: green },
					onClick: () => setSuccess(false),
					children: "Upload Another"
				})
			]
		})
	}) });
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebsiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLoader, {}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebsiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
		size: "md",
		py: {
			base: 28,
			md: 48
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
			gap: "xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
				order: 1,
				className: "damorex-heading",
				style: { color: ink },
				children: "Upload Prescription"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
				c: muted,
				size: "lg",
				lh: 1.7,
				children: "Send your prescription to our licensed pharmacists for review and preparation."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
				radius: 30,
				p: "xl",
				withBorder: true,
				style: { borderColor: line },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
					gap: "lg",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
							style: {
								border: `2px dashed ${line}`,
								borderRadius: 24,
								padding: 48,
								textAlign: "center",
								cursor: "pointer",
								background: soft
							},
							onClick: () => fileRef.current?.click(),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									ref: fileRef,
									type: "file",
									multiple: true,
									accept: ".jpg,.jpeg,.png,.pdf",
									onChange: (e) => setFiles(Array.from(e.target.files || [])),
									style: { display: "none" }
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeIcon, {
									radius: "xl",
									size: 56,
									color: "green",
									variant: "light",
									mx: "auto",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { size: 26 })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									fw: 900,
									mt: "md",
									size: "lg",
									children: files.length ? `${files.length} file(s) selected` : "Click to upload or drag files"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									size: "sm",
									c: muted,
									children: "JPG, PNG, or PDF. Max 10 files."
								}),
								files.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
									justify: "center",
									mt: "sm",
									gap: "xs",
									children: files.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										radius: "xl",
										color: "green",
										variant: "light",
										children: f.name
									}, i))
								}) : null
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
							gap: "sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									size: "sm",
									fw: 800,
									mb: 4,
									children: "Your Name (optional)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									placeholder: "Full name",
									radius: "xl",
									value: name,
									onChange: (e) => setName(e.currentTarget.value),
									styles: { input: { borderColor: "#CFE5D7" } }
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									size: "sm",
									fw: 800,
									mb: 4,
									children: "Phone Number"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									placeholder: "+234",
									radius: "xl",
									value: phone,
									onChange: (e) => setPhone(e.currentTarget.value),
									styles: { input: { borderColor: "#CFE5D7" } }
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									size: "sm",
									fw: 800,
									mb: 4,
									children: "Email (optional)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									placeholder: "you@example.com",
									radius: "xl",
									value: email,
									onChange: (e) => setEmail(e.currentTarget.value),
									styles: { input: { borderColor: "#CFE5D7" } }
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									size: "sm",
									fw: 800,
									mb: 4,
									children: "Notes (optional)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									placeholder: "Additional instructions or information",
									radius: "xl",
									value: notes,
									onChange: (e) => setNotes(e.currentTarget.value),
									styles: { input: { borderColor: "#CFE5D7" } }
								})] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							radius: "xl",
							size: "md",
							leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUp, { size: 18 }),
							styles: buttonStyles,
							style: { background: green },
							onClick: handleUpload,
							loading: isPending,
							disabled: !files.length,
							children: "Submit Prescription"
						}) })
					]
				})
			})]
		})
	}) });
}
//#endregion
//#region src/routes/damorex/upload-prescription.tsx?tsr-split=component
var SplitComponent = UploadPrescriptionPage;
//#endregion
export { SplitComponent as component };
