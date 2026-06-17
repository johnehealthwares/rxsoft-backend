import { i as __toESM, t as require_react } from "./react-DKQS5v0G.js";
import { t as Tabs } from "./Tabs-oGU2Pok4.js";
import { t as ScrollArea } from "./ScrollArea-2PaY6uv1.js";
import { t as Textarea } from "./Textarea-93Sxy-1i.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Paper } from "./Paper-DvHgmkDB.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Input } from "./Input-BAf-8_ks.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Checkbox } from "./Checkbox-R1eU-RuA.js";
import { t as Badge } from "./Badge-B8o0TXXb.js";
import { t as Button } from "./Button-C98OF_32.js";
import { t as Card } from "./Card-D-3y_Av-.js";
import { t as Modal } from "./Modal-BGGUnGwe.js";
import { t as Progress } from "./Progress-fJwpknH9.js";
import { t as Radio } from "./Radio-DHNE50PM.js";
import { t as Stack } from "./Stack-DyRSLbx8.js";
import { t as TextInput } from "./TextInput-BW4Py070.js";
import { n as notifications } from "./notifications.store-CHRWQnxs.js";
import { t as useQuery } from "./useQuery-eyQ3VZzM.js";
import { t as createLucideIcon } from "./createLucideIcon-DV1e0IzZ.js";
import { a as useDebouncedValue, n as AsyncSelectField, r as getArrayPayload, t as SelectField } from "./select-D0Rn_P4j.js";
import { t as Star } from "./star-DwsFN-Yw.js";
import { $n as ChevronRight, Lr as Title, er as ChevronLeft, tr as Check, wr as conversationApi } from "./index-DuM1cidb.js";
/**
* @license lucide-react v1.20.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var CirclePlay = createLucideIcon("circle-play", [["path", {
	d: "M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z",
	key: "kmsa83"
}], ["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}]]);
/**
* @license lucide-react v1.20.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ListChecks = createLucideIcon("list-checks", [
	["path", {
		d: "M13 5h8",
		key: "a7qcls"
	}],
	["path", {
		d: "M13 12h8",
		key: "h98zly"
	}],
	["path", {
		d: "M13 19h8",
		key: "c3s6r1"
	}],
	["path", {
		d: "m3 17 2 2 4-4",
		key: "1jhpwq"
	}],
	["path", {
		d: "m3 7 2 2 4-4",
		key: "1obspn"
	}]
]);
/**
* @license lucide-react v1.20.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var LoaderCircle = createLucideIcon("loader-circle", [["path", {
	d: "M21 12a9 9 0 1 1-6.219-8.56",
	key: "13zald"
}]]);
/**
* @license lucide-react v1.20.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var MonitorSmartphone = createLucideIcon("monitor-smartphone", [
	["path", {
		d: "M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8",
		key: "10dyio"
	}],
	["path", {
		d: "M10 19v-3.96 3.15",
		key: "1irgej"
	}],
	["path", {
		d: "M7 19h5",
		key: "qswx4l"
	}],
	["rect", {
		width: "6",
		height: "10",
		x: "16",
		y: "12",
		rx: "2",
		key: "1egngj"
	}]
]);
//#endregion
//#region src/features/conversation/components/questionnaire.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var MODE_STORAGE_KEY = "rxsoft-questionnaire-mode";
var SAMPLE_QUESTIONS = [{
	id: "ux-1",
	attribute: "overall_experience",
	text: "How would you rate your overall experience with the product?",
	description: "Choose a rating from 1 to 5 stars.",
	questionType: "number",
	renderMode: "star_rating",
	processMode: "question_type",
	index: 1,
	isRequired: true
}];
function getQuestionKey(question, index) {
	return question.attribute || question.id || `question-${index}`;
}
function getOptionValue(option, index) {
	return option.key || option.label || option.value || String(index + 1);
}
function normalizeQuestions(questions) {
	return [...questions].map((question, index) => ({
		...question,
		index: Number(question.index ?? index + 1),
		options: [...question.options ?? []].sort((left, right) => Number(left.index ?? 0) - Number(right.index ?? 0))
	})).sort((left, right) => Number(left.index ?? 0) - Number(right.index ?? 0));
}
function isQuestionAnswered(value) {
	if (Array.isArray(value)) return value.length > 0;
	if (typeof value === "boolean") return true;
	if (typeof value === "number") return value > 0;
	return String(value ?? "").trim().length > 0;
}
function formatAnswer(value) {
	if (Array.isArray(value)) return value.join(", ");
	if (typeof value === "boolean") return value ? "Yes" : "No";
	return value == null || value === "" ? "Not answered" : String(value);
}
function getInputKind(question) {
	if (question.renderMode === "yes_no") return "yes_no";
	if (question.renderMode === "star_rating") return "star_rating";
	if (question.questionType === "boolean") return "yes_no";
	if (question.questionType === "multi_choice") return "checkbox";
	if (question.questionType === "single_choice") return "radio";
	if (question.renderMode === "textarea") return "textarea";
	return "input";
}
function Questionnaire({ title = "User Experience Feedback", description = "Answer each question in order.", showTitle = true, showDescription = true, questions = SAMPLE_QUESTIONS, initialAnswers, initialCurrentQuestionId, initialMode = "horizontal", onSaveProgress, onComplete, onProcessAnswer }) {
	const normalizedQuestions = (0, import_react.useMemo)(() => normalizeQuestions(questions.length > 0 ? questions : SAMPLE_QUESTIONS), [questions]);
	const [answers, setAnswers] = (0, import_react.useState)(initialAnswers ?? {});
	const [currentIndex, setCurrentIndex] = (0, import_react.useState)(() => {
		if (!initialCurrentQuestionId) return 0;
		const index = normalizedQuestions.findIndex((question) => question.id === initialCurrentQuestionId);
		return index >= 0 ? index : 0;
	});
	const [mode, setMode] = (0, import_react.useState)(() => {
		if (typeof window === "undefined") return initialMode;
		const stored = window.localStorage.getItem(MODE_STORAGE_KEY);
		return stored === "vertical" || stored === "horizontal" ? stored : initialMode;
	});
	const [isComplete, setIsComplete] = (0, import_react.useState)(false);
	const [showCompletionDialog, setShowCompletionDialog] = (0, import_react.useState)(false);
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const currentQuestion = normalizedQuestions[currentIndex];
	const progress = normalizedQuestions.length ? Math.round(Math.min(currentIndex + (isComplete ? 1 : 0), normalizedQuestions.length) / normalizedQuestions.length * 100) : 0;
	const questionRefs = (0, import_react.useRef)({});
	(0, import_react.useEffect)(() => {
		window.localStorage.setItem(MODE_STORAGE_KEY, mode);
	}, [mode]);
	(0, import_react.useEffect)(() => {
		if (mode !== "vertical" || !currentQuestion) return;
		const key = getQuestionKey(currentQuestion, currentIndex);
		questionRefs.current[key]?.scrollIntoView({
			behavior: "smooth",
			block: "center"
		});
	}, [
		currentIndex,
		currentQuestion,
		mode
	]);
	async function saveProgress(nextIndex, nextAnswers) {
		if (!onSaveProgress || !currentQuestion) return;
		await onSaveProgress({
			currentQuestion,
			answers: nextAnswers,
			progress: normalizedQuestions.length ? Math.round((nextIndex + 1) / normalizedQuestions.length * 100) : 0,
			currentIndex: nextIndex
		});
	}
	async function goNext() {
		if (!currentQuestion) return;
		const value = answers[getQuestionKey(currentQuestion, currentIndex)];
		if (currentQuestion.isRequired && !isQuestionAnswered(value)) {
			setError("This question is required before you continue.");
			return;
		}
		setError("");
		setIsSubmitting(true);
		let nextAnswers = answers;
		try {
			if (onProcessAnswer) {
				const result = await onProcessAnswer({
					question: currentQuestion,
					answer: value,
					answers,
					currentIndex,
					questions: normalizedQuestions
				});
				if (result?.answers) {
					nextAnswers = result.answers;
					setAnswers(result.answers);
				}
				if (result?.errorMessage) {
					setError(result.errorMessage);
					return;
				}
				if (result?.complete) {
					setIsComplete(true);
					setShowCompletionDialog(true);
					await onComplete?.({
						answers: nextAnswers,
						questions: normalizedQuestions
					});
					return;
				}
			}
			if (currentIndex >= normalizedQuestions.length - 1) {
				setIsComplete(true);
				setShowCompletionDialog(true);
				await onComplete?.({
					answers: nextAnswers,
					questions: normalizedQuestions
				});
				return;
			}
			const nextIndex = currentIndex + 1;
			setCurrentIndex(nextIndex);
			await saveProgress(nextIndex, nextAnswers);
		} finally {
			setIsSubmitting(false);
		}
	}
	async function goPrevious() {
		if (currentIndex === 0) return;
		const nextIndex = currentIndex - 1;
		setCurrentIndex(nextIndex);
		setError("");
		await saveProgress(nextIndex, answers);
	}
	function updateAnswer(question, index, value) {
		const key = getQuestionKey(question, index);
		setAnswers((prev) => ({
			...prev,
			[key]: value
		}));
		setError("");
	}
	if (isComplete) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stack, {
		maw: 900,
		mx: "auto",
		gap: "lg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			withBorder: true,
			radius: "xl",
			p: "xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
				gap: "md",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "light",
						w: "fit-content",
						children: "Questionnaire Complete"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
						order: 2,
						children: title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						c: "dimmed",
						children: "Thanks for completing the questionnaire."
					}),
					normalizedQuestions.map((question, index) => {
						const key = getQuestionKey(question, index);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
							withBorder: true,
							radius: "lg",
							p: "md",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
								gap: 4,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
										size: "sm",
										c: "dimmed",
										children: ["Question ", index + 1]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										fw: 600,
										children: question.text
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										size: "sm",
										children: formatAnswer(answers[key])
									})
								]
							})
						}, key);
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "light",
						onClick: () => setIsComplete(false),
						children: "Review Answers"
					})
				]
			})
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
		maw: 1200,
		mx: "auto",
		gap: "lg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				withBorder: true,
				radius: "xl",
				p: "lg",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
						justify: "space-between",
						align: "flex-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
							gap: "xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									variant: "light",
									w: "fit-content",
									children: [progress, "% complete"]
								}),
								showTitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
									order: 2,
									children: title
								}),
								showDescription && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									c: "dimmed",
									children: description
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
							value: mode,
							onChange: (value) => setMode(value),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs.List, {
								grow: true,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs.Tab, {
									value: "horizontal",
									leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonitorSmartphone, { size: 16 }),
									children: "Horizontal"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs.Tab, {
									value: "vertical",
									leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListChecks, { size: 16 }),
									children: "Vertical"
								})]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
						value: progress,
						mt: "lg",
						radius: "xl"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
						mt: "lg",
						gap: "sm",
						wrap: "nowrap",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
							w: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
								gap: "sm",
								wrap: "nowrap",
								children: normalizedQuestions.map((question, index) => {
									const key = getQuestionKey(question, index);
									const answered = isQuestionAnswered(answers[key]);
									const isCurrent = currentIndex === index;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: isCurrent ? "filled" : answered ? "light" : "default",
										disabled: index > currentIndex,
										onClick: () => {
											if (index <= currentIndex) {
												setCurrentIndex(index);
												setError("");
											}
										},
										leftSection: answered && !isCurrent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 14 }) : void 0,
										children: question.attribute || `Step ${index + 1}`
									}, key);
								})
							})
						})
					})
				]
			}),
			mode === "horizontal" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HorizontalQuestionView, {
				question: currentQuestion,
				questionIndex: currentIndex,
				total: normalizedQuestions.length,
				value: answers[getQuestionKey(currentQuestion, currentIndex)],
				error,
				onChange: (value) => updateAnswer(currentQuestion, currentIndex, value),
				onPrevious: goPrevious,
				onNext: goNext,
				isSubmitting
			}, getQuestionKey(currentQuestion, currentIndex)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerticalQuestionView, {
				questions: normalizedQuestions,
				currentIndex,
				answers,
				error,
				onAnswerChange: updateAnswer,
				onPrevious: goPrevious,
				onNext: goNext,
				isSubmitting,
				registerRef: (key, node) => {
					questionRefs.current[key] = node;
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				opened: showCompletionDialog,
				onClose: () => setShowCompletionDialog(false),
				title: "Questionnaire Complete",
				centered: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					size: "sm",
					c: "dimmed",
					children: "The questionnaire has been completed successfully."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
					justify: "flex-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "default",
						onClick: () => setShowCompletionDialog(false),
						children: "Close"
					})
				})] })
			})
		]
	});
}
function HorizontalQuestionView({ question, questionIndex, total, value, error, onChange, onPrevious, onNext, isSubmitting }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		withBorder: true,
		radius: "xl",
		maw: 900,
		mx: "auto",
		w: "100%",
		p: "xl",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
			gap: "lg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
					gap: 4,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							variant: "outline",
							w: "fit-content",
							children: [
								"Question ",
								questionIndex + 1,
								" of ",
								total
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
							order: 3,
							children: question.text
						}),
						question.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							c: "dimmed",
							children: question.description
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuestionInput, {
					question,
					value,
					onChange,
					enabled: true
				}),
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					c: "red",
					size: "sm",
					children: error
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
					justify: "space-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "default",
						onClick: onPrevious,
						disabled: questionIndex === 0,
						leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 16 }),
						children: "Previous"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: onNext,
						loading: isSubmitting,
						rightSection: questionIndex !== total - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 16 }) : void 0,
						children: questionIndex === total - 1 ? "Finish" : "Next"
					})]
				})
			]
		})
	});
}
function VerticalQuestionView({ questions, currentIndex, answers, error, onAnswerChange, onPrevious, onNext, isSubmitting, registerRef }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		withBorder: true,
		radius: "xl",
		p: 0,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
			gap: 0,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
				p: "lg",
				gap: 4,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
					order: 4,
					children: "Sequential Form View"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					size: "sm",
					c: "dimmed",
					children: "Future questions unlock progressively."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
				h: 700,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stack, {
					p: "lg",
					children: questions.map((question, index) => {
						const key = getQuestionKey(question, index);
						const status = index < currentIndex ? "previous" : index === currentIndex ? "current" : "future";
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
							ref: (node) => registerRef(key, node),
							withBorder: true,
							radius: "xl",
							p: "lg",
							style: { opacity: status === "future" ? .6 : 1 },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
								gap: "lg",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
										justify: "space-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
											gap: 4,
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
													size: "sm",
													c: "dimmed",
													children: ["Question ", index + 1]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
													fw: 600,
													size: "lg",
													children: question.text
												}),
												question.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
													size: "sm",
													c: "dimmed",
													children: question.description
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: status === "current" ? "filled" : "light",
											children: status
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuestionInput, {
										question,
										value: answers[key],
										onChange: (value) => onAnswerChange(question, index, value),
										enabled: status === "current"
									}),
									status === "current" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
										justify: "space-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "default",
											onClick: onPrevious,
											disabled: currentIndex === 0,
											leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 16 }),
											children: "Previous"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											onClick: onNext,
											loading: isSubmitting,
											rightSection: currentIndex !== questions.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 16 }) : void 0,
											children: currentIndex === questions.length - 1 ? "Finish" : "Next"
										})]
									}),
									status === "current" && error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										c: "red",
										size: "sm",
										children: error
									})
								]
							})
						}, key);
					})
				})
			})]
		})
	});
}
function QuestionInput({ question, value, onChange, enabled }) {
	const inputKind = getInputKind(question);
	if (inputKind === "radio") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio.Group, {
		value: typeof value === "string" ? value : "",
		onChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stack, {
			gap: "sm",
			children: (question.options ?? []).map((option, index) => {
				const optionValue = getOptionValue(option, index);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio.Card, {
					value: optionValue,
					disabled: !enabled,
					radius: "xl",
					p: "md",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						fw: 500,
						children: option.label
					})
				}, optionValue);
			})
		})
	});
	if (inputKind === "checkbox") {
		const selected = Array.isArray(value) ? value : [];
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stack, {
			gap: "sm",
			children: (question.options ?? []).map((option, index) => {
				const optionValue = getOptionValue(option, index);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
					checked: selected.includes(optionValue),
					disabled: !enabled,
					label: option.label,
					onChange: (event) => {
						if (!enabled) return;
						if (event.currentTarget.checked) {
							onChange([...selected, optionValue]);
							return;
						}
						onChange(selected.filter((item) => item !== optionValue));
					}
				}, optionValue);
			})
		});
	}
	if (inputKind === "textarea") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
		value: typeof value === "string" ? value : "",
		onChange: (event) => onChange(event.currentTarget.value),
		disabled: !enabled,
		minRows: 5,
		placeholder: "Type your answer here..."
	});
	if (inputKind === "yes_no") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
		grow: true,
		children: [{
			label: "Yes",
			value: true
		}, {
			label: "No",
			value: false
		}].map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: value === option.value ? "filled" : "default",
			disabled: !enabled,
			onClick: () => onChange(option.value),
			children: option.label
		}, String(option.value)))
	});
	if (inputKind === "star_rating") {
		const currentValue = typeof value === "number" ? value : 0;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
			gap: "xs",
			children: Array.from({ length: 5 }, (_, index) => {
				const rating = index + 1;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: currentValue >= rating ? "filled" : "default",
					disabled: !enabled,
					onClick: () => onChange(rating),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { size: 18 })
				}, rating);
			})
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
		value: typeof value === "string" ? value : "",
		onChange: (event) => onChange(event.currentTarget.value),
		disabled: !enabled,
		placeholder: "Type your answer here..."
	});
}
//#endregion
//#region src/features/questionnnaire/components/ConversationLoader.tsx
function ConversationLoader({ value, setValue, onLoad, loading }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			value,
			onChange: (e) => setValue(e.target.value)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			onClick: onLoad,
			disabled: loading,
			children: "Load"
		})]
	});
}
//#endregion
//#region src/features/questionnnaire/components/CreateConversationForm.tsx
function CreateConversationForm({ phone, setPhone, questionnaire, setQuestionnaire = (option) => {}, channel, setChannel = (option) => {}, displayMode = {
	value: "EACH",
	label: "EACH"
}, setDisplayMode = (option) => {}, onSubmit, loading, disabled }) {
	const isDisabled = !phone.trim() || !channel || !questionnaire;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 md:grid-cols-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AsyncSelectField, {
				value: questionnaire || null,
				field: {
					name: "questionnaireId",
					label: "Questionnaire",
					type: "async-select",
					searchParam: {
						endpoint: "/questionnaires",
						queryParam: "search",
						minChars: 2,
						valueKey: "id",
						labelKey: "name"
					},
					placeholder: "Search questionnaire"
				},
				disabled: disabled?.questionnaire,
				onChange: setQuestionnaire
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AsyncSelectField, {
				value: channel || null,
				field: {
					name: "channelId",
					label: "Channel",
					type: "async-select",
					searchParam: {
						endpoint: "/channels",
						queryParam: "search",
						minChars: 0,
						valueKey: "id",
						labelKey: "name"
					},
					placeholder: "Search channel"
				},
				disabled: disabled?.channel,
				onChange: setChannel
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: phone,
				disabled: disabled?.phone,
				onChange: (e) => setPhone(e.target.value),
				placeholder: "Participant phone"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
				value: displayMode || null,
				disabled: disabled?.displayMode,
				onChange: (v) => setDisplayMode(v),
				options: [{
					value: "ALL",
					label: "ALL"
				}, {
					value: "EACH",
					label: "EACH"
				}],
				placeholder: "Display mode"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "md:col-span-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					disabled: isDisabled || loading,
					onClick: () => onSubmit({
						phone: phone.trim(),
						questionnaireId: questionnaire?.value,
						channelId: channel?.value,
						displayMode: displayMode?.value
					}),
					children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlay, { className: "size-4" }), "Start Conversation"]
				})
			})
		]
	});
}
//#endregion
//#region src/features/questionnnaire/components/EntryModeTabs.tsx
function EntryModeTabs({ value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
		value,
		onChange: (v) => {
			if (v) onChange(v);
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs.List, {
			grow: true,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs.Tab, {
					value: "participant-phone",
					children: "Find by phone"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs.Tab, {
					value: "conversation-id",
					children: "Conversation ID"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs.Tab, {
					value: "create-new",
					children: "Create new"
				})
			]
		})
	});
}
//#endregion
//#region src/features/questionnnaire/components/ParticipantSearch.tsx
function ParticipantSearch(props) {
	const { phone, setPhone, participants, loading, onSelect, selectedId } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
		value: phone,
		onChange: (e) => setPhone(e.target.value),
		placeholder: "Enter phone"
	}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Loading..." }) : participants.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		onClick: () => onSelect(p.id),
		children: [p.phone, selectedId === p.id && " ✓"]
	}, p.id))] });
}
//#endregion
//#region src/routes/questionnaire/-utils.ts
function stringifyAnswer(value) {
	if (Array.isArray(value)) return value.join(", ");
	if (typeof value === "boolean") return value ? "Yes" : "No";
	if (value == null) return "";
	return String(value);
}
function buildSummaryMessage(answers, questions) {
	return questions.map((question, index) => {
		const value = answers[question.attribute || question.id || `question-${index}`];
		const rendered = Array.isArray(value) ? value.join(", ") : typeof value === "boolean" ? value ? "Yes" : "No" : value == null || value === "" ? "Not answered" : String(value);
		return `${question.text}: ${rendered}`;
	}).join("\n");
}
async function resolveQuestions(session) {
	if (session.questions?.length) return session.questions;
	if (!session.questionnaireId) return [];
	return getArrayPayload((await conversationApi.get("/questions", { params: { questionnaireId: session.questionnaireId } })).data);
}
async function decorateConversations(items) {
	const ids = [...new Set(items.map((i) => i.questionnaireId).filter(Boolean))];
	const entries = await Promise.all(ids.map(async (id) => {
		try {
			return [id, (await conversationApi.get(`/questionnaires/${id}`)).data?.name ?? id];
		} catch {
			return [id, id];
		}
	}));
	const map = new Map(entries);
	return items.map((item) => ({
		...item,
		questionnaireName: item.questionnaireId ? map.get(item.questionnaireId) ?? item.questionnaireId : "Questionnaire"
	}));
}
//#endregion
//#region src/routes/questionnaire/index.tsx?tsr-split=component
function PublicQuestionnairePage() {
	const [entryMode, setEntryMode] = (0, import_react.useState)("participant-phone");
	const [phoneSearch, setPhoneSearch] = (0, import_react.useState)("");
	const [questionnaire, setQuestionnaire] = (0, import_react.useState)();
	const [channel, setChannel] = (0, import_react.useState)();
	const [selectedParticipantId, setSelectedParticipantId] = (0, import_react.useState)("");
	const [conversationId, setConversationId] = (0, import_react.useState)("");
	const [session, setSession] = (0, import_react.useState)(null);
	const [questions, setQuestions] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const debouncedPhone = useDebouncedValue(phoneSearch, 300);
	const participantQuery = useQuery({
		queryKey: ["participants", debouncedPhone],
		queryFn: async () => {
			return getArrayPayload((await conversationApi.get("/participants", { params: {
				search: debouncedPhone,
				attribute: "phone"
			} })).data);
		},
		enabled: !session && debouncedPhone.length >= 3
	});
	const conversationsQuery = useQuery({
		queryKey: ["participant-conversations", selectedParticipantId],
		queryFn: async () => {
			return decorateConversations(getArrayPayload((await conversationApi.get(`/participants/${selectedParticipantId}/conversations`)).data));
		},
		enabled: !!selectedParticipantId && !session
	});
	async function hydrateSession(next) {
		const resolved = await resolveQuestions(next);
		setSession(next);
		setQuestions(resolved);
		setConversationId(next.id);
	}
	async function loadConversationById(id = conversationId) {
		if (!id) return;
		setLoading(true);
		try {
			await hydrateSession((await conversationApi.get(`/conversations/${id}`)).data);
			notifications.show({
				message: "Conversation loaded",
				color: "green"
			});
		} catch {
			notifications.show({
				message: "Conversation not found",
				color: "red"
			});
		} finally {
			setLoading(false);
		}
	}
	async function startConversation(payload) {
		setLoading(true);
		try {
			await hydrateSession((await conversationApi.post("/conversations", payload)).data);
			notifications.show({
				message: "Conversation created",
				color: "green"
			});
		} catch {
			notifications.show({
				message: "Failed to create conversation",
				color: "red"
			});
		} finally {
			setLoading(false);
		}
	}
	const participants = getArrayPayload(participantQuery.data ?? []);
	conversationsQuery.data;
	const initialAnswers = (0, import_react.useMemo)(() => {
		return session?.context?.answers ?? {};
	}, [session]);
	(0, import_react.useEffect)(() => {
		if (session) return;
		const match = participants.find((p) => String(p.phone) === phoneSearch);
		if (match) setSelectedParticipantId(String(match.id));
	}, [
		participants,
		phoneSearch,
		session
	]);
	async function processAnswer(payload) {
		if (!session?.id) return { advance: true };
		try {
			const response = await conversationApi.post(`/conversations/${session.id}/process-response`, {
				message: stringifyAnswer(payload.answer),
				sender: session.participantId || ""
			});
			const latestSession = (await conversationApi.get(`/conversations/${session.id}`)).data;
			await hydrateSession(latestSession);
			const reason = String(response.data?.reason ?? "");
			const action = String(response.data?.action ?? "");
			if (reason === "VALIDATION_ERROR") return {
				advance: false,
				errorMessage: String(response.data?.message || "This answer could not be processed.")
			};
			if (action === "COMPLETED_CONVERSATION" || latestSession.status === "COMPLETED") return { complete: true };
			return {
				advance: true,
				nextQuestionId: latestSession.currentQuestionId,
				answers: payload.answers
			};
		} catch (error) {
			return {
				advance: false,
				errorMessage: error?.response?.data?.message || "Unable to process this answer right now."
			};
		}
	}
	async function saveProgress(payload) {
		if (!session?.id) return;
		const nextQuestion = questions[payload.currentIndex];
		await conversationApi.patch(`/conversations/${session.id}`, {
			currentQuestionId: nextQuestion?.id,
			context: {
				...session.context ?? {},
				answers: payload.answers,
				progress: payload.progress
			}
		});
	}
	async function completeQuestionnaire(payload) {
		if (!session?.id) return;
		const summary = buildSummaryMessage(payload.answers, payload.questions);
		await conversationApi.patch(`/conversations/${session.id}`, {
			status: "COMPLETED",
			state: "COMPLETED",
			endedAt: (/* @__PURE__ */ new Date()).toISOString(),
			context: {
				...session.context ?? {},
				answers: payload.answers,
				progress: 100,
				summary
			}
		});
		if (session.channelId && phoneSearch.trim()) await conversationApi.post("/channels/send-message", {
			channelId: session.channelId,
			phone: phoneSearch.trim(),
			email: "",
			title: "Questionnaire complete",
			previewLink: false,
			message: summary
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-6 space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntryModeTabs, {
				value: entryMode,
				onChange: setEntryMode
			}),
			entryMode === "participant-phone" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParticipantSearch, {
				phone: phoneSearch,
				setPhone: setPhoneSearch,
				participants,
				loading: participantQuery.isLoading,
				selectedId: selectedParticipantId || "",
				onSelect: setSelectedParticipantId
			}),
			entryMode === "conversation-id" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConversationLoader, {
				value: conversationId,
				setValue: setConversationId,
				onLoad: loadConversationById,
				loading
			}),
			entryMode === "create-new" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreateConversationForm, {
				phone: phoneSearch,
				setPhone: setPhoneSearch,
				setQuestionnaire,
				setChannel,
				questionnaire,
				channel,
				onSubmit: startConversation,
				loading
			}),
			session && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Questionnaire, {
				title: "User Feedback",
				description: "Answer the questions",
				questions,
				initialAnswers,
				initialCurrentQuestionId: session.currentQuestionId,
				onProcessAnswer: processAnswer,
				onSaveProgress: saveProgress,
				onComplete: completeQuestionnaire
			})
		]
	});
}
//#endregion
export { PublicQuestionnairePage as component };
