import {IDictionaryService, IDistrict, IOperation} from 'Libraries/Core/Modules/Dictionary/Models';
import {AuthorizedRestService} from 'Libraries/Core/Services/AuthorizedRestService';
import {IItemsList} from 'Libraries/Core/Models';

export class DictionaryService extends AuthorizedRestService implements IDictionaryService {

    getOperations(): Promise<IItemsList<IOperation>> {
        return this.get(`${this.backendConfig.backend}/dicts/operation`);
    }

    getDistricts(): Promise<IItemsList<IDistrict>> {
        return this.get(`${this.backendConfig.backend}/dicts/district`);
    }
}
