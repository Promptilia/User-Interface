type filter = {
    type: string;
    option: string;
    tbs: string;
}

export const constructTbs = (filters: Array<filter>): string => {
    // Create an object to store unique tbs values
    const uniqueTbs: { [key: string]: boolean } = {};

    // Iterate through each filter and extract tbs values
    filters.forEach((filter) => {
        const tbsValues = filter.tbs.split(',');

        // Iterate through each tbs value and add it to the uniqueTbs object
        tbsValues.forEach((tbsValue) => {
            uniqueTbs[tbsValue] = true;
        });
    });

    // Combine unique tbs values into a single variable
    const combinedTbs = Object.keys(uniqueTbs).join(',');

    return combinedTbs;
};