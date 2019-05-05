import { field } from './board/board';
import { store } from './state/ngxs-setup';
import { Add } from './state/test-state';

console.log('dispatching');
store.dispatch(new Add(2));

console.log(store.selectSnapshot(state => state.teststate.count));
