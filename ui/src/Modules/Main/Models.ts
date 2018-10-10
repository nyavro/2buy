import {ILoginContext, ILoginModule} from 'Libraries/Core/Modules/Login/Models';
import {RouterState} from 'react-router-redux';
import {IDictionaryContext, IDictionaryModule} from 'Libraries/Core/Modules/Dictionary/Models';
import {INotificationModule} from 'Libraries/Core/Modules/Notification/Models';
import {IMessagingContext} from '../../Libraries/Core/Modules/Messaging/Models';
import {IGroupContext} from "../Group/Models";
import {IOrderContext, IOrderModule} from "../Order/Models";

export interface IClientAppState extends
    RouterState,
    ILoginModule,
    IOrderModule,
    IDictionaryModule,
    INotificationModule {
}

export interface IClientAppContext extends
    ILoginContext,
    IDictionaryContext,
    IOrderContext,
    IMessagingContext,
    IGroupContext {
}