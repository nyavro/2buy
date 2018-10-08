import {ILoginContext, ILoginModule} from 'Libraries/Core/Modules/Login/Models';
import {RouterState} from 'react-router-redux';
import {IClientContext, IClientModule} from 'Applications/Client/Modules/Client/Models';
import {IOrderContext, IOrderModule} from 'Applications/Client/Modules/Order/Models';
import {IDictionaryContext, IDictionaryModule} from 'Libraries/Core/Modules/Dictionary/Models';
import {IOrderRequestContext, IOrderRequestModule} from "./Modules/OrderRequest/Models";
import {INotificationModule} from 'Libraries/Core/Modules/Notification/Models';
import {IMessagingContext} from '../../Libraries/Core/Modules/Messaging/Models';
import {IGroupContext} from "../../Modules/Group/Models";

export interface IClientAppState extends
    RouterState,
    IClientModule,
    ILoginModule,
    IOrderModule,
    IDictionaryModule,
    IOrderRequestModule,
    INotificationModule {
}

export interface IClientAppContext extends
    IClientContext,
    ILoginContext,
    IDictionaryContext,
    IOrderRequestContext,
    IOrderContext,
    IMessagingContext,
    IGroupContext {
}