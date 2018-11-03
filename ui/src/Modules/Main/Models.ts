import {ILoginContext, ILoginModule} from 'Libraries/Core/Modules/Login/Models';
import {RouterState} from 'react-router-redux';
import {INotificationModule} from 'Libraries/Core/Modules/Notification/Models';
import {IMessagingContext} from '../../Libraries/Core/Modules/Messaging/Models';
import {IGroupContext} from '../Group/Models';
import {IOrderContext, IOrderModule} from '../Order/Models';
import {IProductContext, IProductModule} from '../Product/Models';
import {IBackendConfig} from "../../Libraries/Core/Models";

export interface IClientAppState extends
    RouterState,
    ILoginModule,
    IOrderModule,
    INotificationModule,
    IProductModule {
}

export interface IClientAppContext extends
    ILoginContext,
    IOrderContext,
    IMessagingContext,
    IGroupContext,
    IProductContext {
}