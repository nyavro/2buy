import * as moment from 'moment';

export const serverFormat = 'YYYY-MM-DD';

export const dateFormat = 'DD.MM.YYYY';

export const strToDate = (dateString: string, format = serverFormat) => (moment(dateString, format));

export const getToday = (format = serverFormat) => moment(moment().format(serverFormat), serverFormat).format(format);

export const format = (dateString: string, targetFormat: string) =>
    moment(dateString, serverFormat).format(targetFormat);

export const convert = (dateString: string, sourceFormat: string, targetFormat:string) =>
    moment(dateString, sourceFormat).format(targetFormat);