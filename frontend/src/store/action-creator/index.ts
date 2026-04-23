import * as UserActionCreators from './user';
import * as ProductActionCreators from './product';

export default {
    ...ProductActionCreators,
    ...UserActionCreators
}