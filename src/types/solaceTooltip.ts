const text = "text";
const overflow = "overflow";
/** @deprecated - as of Nov 12, 2024 the 'html variant is being deprecated in favour of using SolacePopover **/
const html = "html";

export const TooltipVariant = {
	text: text,
	overflow: overflow,
	/** @deprecated [Nov 2024] the "html" variant for SolaceTooltip has been deprecated, please use SolacePopover instead */
	html: html
};

export type TooltipVariantTypes = (typeof TooltipVariant)[keyof typeof TooltipVariant];
