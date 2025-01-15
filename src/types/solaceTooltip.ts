const text = "text";
const overflow = "overflow";
const rich = "rich";
/** @deprecated - as of Nov 12, 2024 the 'html variant is being deprecated in favour of using the rich variant**/
const html = "html";

export const TooltipVariant = {
	text: text,
	overflow: overflow,
	rich: rich,
	/** @deprecated [Nov 2024] the "html" variant for SolaceTooltip has been deprecated, please use rich variant instead */
	html: html
};

export type TooltipVariantTypes = (typeof TooltipVariant)[keyof typeof TooltipVariant];
