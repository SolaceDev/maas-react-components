export const BASE_COLORS = {
	greens: {
		green1: "#00C895",
		green1_rgb: "rgb(0, 200, 149)",
		green2: "#00AD93",
		green2_rgb: "rgb(0, 173, 147)",
		green3: "#009193",
		green4: "#4B6C6C",
		green5: "#00CCAD",
		green6: "#05BDA1",
		green7: "#7ED321",
		green8: "#005E5F",
		green9: "rgba(0, 200, 149, 0.1)",
		green10: "#e8f9f4",
		green11: "rgba(0, 200, 149, 0.2)"
	},
	greys: {
		grey0: "rgba(0, 0, 0, 0)", // white
		grey1: "rgba(0, 0, 0, 0.05)",
		grey2: "rgba(0, 0, 0, 0.1)",
		grey3: "rgba(0, 0, 0, 0.2)",
		grey4: "rgba(0, 0, 0, 0.3)",
		grey5: "rgba(0, 0, 0, 0.35)",
		grey6: "rgba(0, 0, 0, 0.4)",
		grey7: "rgba(0, 0, 0, 0.45)",
		grey8: "rgba(0, 0, 0, 0.5)",
		grey9: "rgba(0, 0, 0, 0.55)",
		grey10: "rgba(0, 0, 0, 0.6)",
		grey11: "rgba(0, 0, 0, 0.65)",
		grey12: "rgba(0, 0, 0, 0.7)",
		grey13: "rgba(0, 0, 0, 0.75)",
		grey14: "rgba(0, 0, 0, 0.8)",
		grey15: "rgba(0, 0, 0, 0.9)",
		grey16: "rgba(0, 0, 0, 1)", // black
		grey17: "#F1F1F1",
		grey18: "#F4F5F5",
		grey19: "#F9F9F9",
		grey20: "#2D2D2D",
		grey21: "#474747",
		grey22: "#828282",
		grey23: "#EEE",
		grey24: "#e5e5e5",
		grey25: "#3f3f3f",
		grey26: "rgba(0, 0, 0, 0.15)"
	},
	reds: {
		red1: "#D0021B",
		red2: "rgba(208, 2, 27, 0.1)"
	},
	whites: {
		white1: "#FFF",
		white2: "rgba(255, 255, 255, 0.9)"
	},
	yellows: {
		yellow1: "#F3AA24",
		yellow2: "#FEF7E9"
	},
	blues: {
		blue1: "#E6F2FF",
		blue2: "#0079FF"
	}
};

export const getRGBA = (rgbValue: string, opacity: number): string => {
	return rgbValue.replace("rgb", "rgba").replace(")", `, ${opacity})`);
};
