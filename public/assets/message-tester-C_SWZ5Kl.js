import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { t as ScrollArea } from "./ScrollArea-2PaY6uv1.js";
import { t as Textarea } from "./Textarea-93Sxy-1i.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Button } from "./Button-C98OF_32.js";
import { t as Card } from "./Card-D-3y_Av-.js";
import { t as Code } from "./Code-CRGUvjCr.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { n as notifications } from "./notifications.store-CHRWQnxs.js";
import { t as communicationApi } from "./communication-api-Cd2UxqAK.js";
import { n as AsyncSelectField, t as SelectField } from "./select-DJXsgV1Q.js";
import { D as u, Hr as Grid, Jt as RxPage, an as getOption, hn as useForm, hr as string, mn as Controller, mr as object } from "./index-BRcLwOKn.js";
//#region src/features/communication/pages/message-tester.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var schema = object({
	messageType: string().min(1, "Message type is required"),
	messageProtocol: string().min(1, "Message protocol is required"),
	sourceAE: string().min(1, "Source AE is required"),
	targetAE: string().min(1, "Target AE is required"),
	payload: string().min(1, "Payload is required").refine((val) => {
		try {
			JSON.parse(val);
			return true;
		} catch {
			return false;
		}
	}, "Payload must be valid JSON")
});
var messageTypes = [{
	label: "Order",
	value: "ORDER"
}, {
	label: "Patient",
	value: "PATIENT"
}];
var messageProtocols = [
	{
		label: "JSON",
		value: "CUSTOM_JSON"
	},
	{
		label: "HL7 V2",
		value: "HL7_V2"
	},
	{
		label: "FHIR R4",
		value: "FHIR_R4"
	}
];
function MessageTesterPage() {
	const [response, setResponse] = (0, import_react.useState)(null);
	const [isSending, setIsSending] = (0, import_react.useState)(false);
	const { control, handleSubmit, watch, setValue, formState: { errors } } = useForm({
		resolver: u(schema),
		defaultValues: {
			messageType: "",
			messageProtocol: "",
			sourceAE: "",
			targetAE: "",
			payload: ""
		}
	});
	const messageType = watch("messageType");
	const messageProtocol = watch("messageProtocol");
	const targetAE = watch("targetAE");
	const samplePayload = (0, import_react.useMemo)(() => {
		if (messageType === "ORDER" && messageProtocol === "HL7_V2") return "MSH|^~\\&|HEALTHSTACK|HS|SWITCH|RXSOFT|202604251200||ORM^O01|123|P|2.5\rPID|1||123456^^^HOSPITAL^MR||Doe^Jane||19840501|F\rORC|NW|ORDER-123|||||R\rOBR|1|ORDER-123||RAD-CHEST^Chest X-Ray^99LOCAL|||202604251200";
		if (messageType === "ORDER" && messageProtocol === "FHIR_R4") return "MSH|^~\\&|HEALTHSTACK|HS|SWITCH|RXSOFT|202604251200||ADT^A04|456|P|2.5\rPID|1||987654^^^HOSPITAL^MR||Smith^John||19780312|M";
		if (messageType === "ORDER" && messageProtocol === "CUSTOM_JSON") return JSON.stringify({
			_id: "order-123",
			documentationId: "order-123",
			clientId: "client-123",
			clientname: "Jane Doe",
			client: {
				firstname: "Jane",
				lastname: "Doe",
				dob: "1984-05-01",
				gender: "F"
			},
			order: "Chest X-Ray",
			order_code: "RAD-CHEST",
			order_category: "RADIOLOGY",
			targetAE,
			requestingdoctor_Id: "doc-001",
			requestingdoctor_facilityname: "Healthstack Hospital"
		}, null, 2);
		return JSON.stringify({}, null, 2);
	}, [
		messageType,
		messageProtocol,
		targetAE
	]);
	const onSubmit = async (data) => {
		setIsSending(true);
		setResponse(null);
		try {
			const result = await communicationApi.post("/v1/flow/messages", {
				payload: JSON.parse(data.payload),
				messageType: data.messageType,
				targetAE: data.targetAE,
				sourceAE: data.sourceAE
			});
			setResponse(JSON.stringify(result.data ?? result, null, 2));
			notifications.show({ message: "Payload sent successfully" });
		} catch (error) {
			setResponse(String(error));
			notifications.show({
				color: "red",
				message: "Failed to send payload"
			});
		} finally {
			setIsSending(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RxPage, {
		title: "Message Tester",
		description: "Send test HL7 or order model payloads into the switch.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			withBorder: true,
			radius: "md",
			p: "lg",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
				gap: "lg",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Grid, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Grid.Col, {
							span: {
								base: 12,
								md: 4
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Controller, {
									name: "sourceAE",
									control,
									render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AsyncSelectField, {
										field: {
											label: "Source AE",
											name: "ae",
											searchParam: { endpoint: "/v1/aes" }
										},
										value: getOption(field.value),
										onChange: field.onChange
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									c: "red",
									size: "xs",
									children: errors.sourceAE?.message
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Controller, {
									name: "targetAE",
									control,
									render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AsyncSelectField, {
										field: {
											label: "Target AE",
											name: "ae",
											searchParam: { endpoint: "/v1/aes" }
										},
										value: getOption(field.value),
										onChange: field.onChange
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									c: "red",
									size: "xs",
									children: errors.targetAE?.message
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Grid.Col, {
							span: {
								base: 12,
								md: 4
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Controller, {
									name: "messageType",
									control,
									render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
										label: "Message Type",
										...field,
										value: getOption(field.value),
										options: messageTypes
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									c: "red",
									size: "xs",
									children: errors.messageType?.message
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Controller, {
									name: "messageProtocol",
									control,
									render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
										label: "Message Protocol",
										...field,
										value: getOption(field.value),
										options: messageProtocols
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									c: "red",
									size: "xs",
									children: errors.messageProtocol?.message
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
							span: {
								base: 12,
								md: 4
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
								h: "100%",
								align: "flex-end",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									fullWidth: true,
									variant: "light",
									onClick: () => setValue("payload", samplePayload),
									children: "Load Sample Payload"
								})
							})
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Controller, {
						name: "payload",
						control,
						render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							...field,
							autosize: true,
							minRows: 10,
							styles: { input: {
								fontFamily: "monospace",
								fontSize: 12
							} }
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						c: "red",
						size: "xs",
						children: errors.payload?.message
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
						justify: "flex-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: handleSubmit(onSubmit),
							loading: isSending,
							children: "Send Payload"
						})
					}),
					response && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						withBorder: true,
						radius: "md",
						p: "md",
						bg: "gray.0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							size: "sm",
							fw: 600,
							children: "Response"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
							h: 260,
							mt: "sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Code, {
								block: true,
								children: response
							})
						})]
					})
				]
			})
		})
	});
}
//#endregion
//#region src/routes/_authenticated/communication/message-tester.tsx?tsr-split=component
var SplitComponent = MessageTesterPage;
//#endregion
export { SplitComponent as component };
