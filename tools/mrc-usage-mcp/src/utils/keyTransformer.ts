interface RawProp {
	b: string; // name
	d: string; // type
	e: string; // value
}

export interface RawInstance {
	a: string; // filePath
	c: RawProp[]; // props
}

interface Prop {
	name: string;
	type: string;
	value: string;
}

export interface Instance {
	filePath: string;
	props: Prop[];
}

export function transformResponse(data: RawInstance[]): Instance[] {
	if (!data) {
		return [];
	}
	return data.map((item) => ({
		filePath: item.a,
		props: item.c.map((prop) => ({
			name: prop.b,
			type: prop.d,
			value: prop.e
		}))
	}));
}
