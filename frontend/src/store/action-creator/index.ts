import * as UserActionCreators from './user';
import * as ProductActionCreators from './product';
import * as AuthActions from './auth';
import { cartActions } from './cart';

export default {
    ...ProductActionCreators,
    ...UserActionCreators,
    ...AuthActions,
    ...cartActions,
}