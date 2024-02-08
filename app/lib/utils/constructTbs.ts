import { filter } from "../schema/filterSchema";

export const constructTbs = (filters: Array<filter>): string => {
    let tbsArray: string[] = [];

    filters.forEach((filter, idx) => {
        const regex = /pdtr\d+:(\d+)/g;
        let matches;
        const pdtrValues = [];
        while ((matches = regex.exec(filter.option.tbs)) !== null)
            pdtrValues.push(matches[1])

        let filterString = `pdtr${idx}:`

        pdtrValues.forEach((val,i) => {
            if (i == pdtrValues.length -1) {
                filterString += `${val}`
            } else {
                filterString += `${val}!`
            }
        });

        let tbsString = filterString;
        if (idx != filters.length -1) {
            tbsString += ','
        }

        tbsArray.push(tbsString);
    });

    return `mr:1,${tbsArray.join('')}`;
};