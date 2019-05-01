import { Action, NoopNgxsExecutionStrategy, State, StateContext, StateStream, Store } from '@ngxs/store';
import { InternalActions } from '@ngxs/store/src/actions-stream';
import { InternalNgxsExecutionStrategy } from '@ngxs/store/src/execution/internal-ngxs-execution-strategy';
import { ConfigValidator } from '@ngxs/store/src/internal/config-validator';
import { InternalDispatchedActionResults, InternalDispatcher } from '@ngxs/store/src/internal/dispatcher';
import { InternalStateOperations } from '@ngxs/store/src/internal/state-operations';
import { PluginManager } from '@ngxs/store/src/plugin-manager';
import { NgxsConfig } from '@ngxs/store/src/symbols';

console.log('Hello World');

const config: NgxsConfig = new NgxsConfig();
const configValidator = new ConfigValidator(config);
const stateStream = new StateStream();
const internalExecutionStrategy: InternalNgxsExecutionStrategy = new InternalNgxsExecutionStrategy(
    new NoopNgxsExecutionStrategy()
);
const errorHandler = {
    handleError: (err: Error) => console.error(err)
};
const actions: InternalActions = new InternalActions();
const actionResults: InternalDispatchedActionResults = new InternalDispatchedActionResults();
const pluginManager: PluginManager = new PluginManager(undefined as any, []);

const dispatcher = new InternalDispatcher(
    errorHandler,
    actions,
    actionResults,
    pluginManager,
    stateStream,
    internalExecutionStrategy
);

const internalStateOperations = new InternalStateOperations(
    stateStream,
    dispatcher,
    config,
    configValidator
);

const store: Store = new Store(
    stateStream,
    internalStateOperations,
    config,
    internalExecutionStrategy
);

interface TestStateModel {
    count: number;
}

class Add {
    static readonly type = 'Add';

    constructor(public payload: number) {
    }
}

@State<TestStateModel>({
    name: 'teststate',
    defaults: {
        count: 0,
    },
})
class TestState {
    @Action(Add)
    add(ctx: StateContext<TestStateModel>, { payload }: Add) {
        ctx.setState({ count: ctx.getState().count + payload });
    }
}

console.log('dispatching');
store.dispatch(new Add(2));

console.log(store.selectSnapshot(state => state.teststate.count));
