export function transformResponse(data) {
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
