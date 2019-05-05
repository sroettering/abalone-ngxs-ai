import { NoopNgxsExecutionStrategy, StateStream, Store } from '@ngxs/store';
import { InternalActions } from '@ngxs/store/src/actions-stream';
import { InternalNgxsExecutionStrategy } from '@ngxs/store/src/execution/internal-ngxs-execution-strategy';
import { ConfigValidator } from '@ngxs/store/src/internal/config-validator';
import { InternalDispatchedActionResults, InternalDispatcher } from '@ngxs/store/src/internal/dispatcher';
import { InternalStateOperations } from '@ngxs/store/src/internal/state-operations';
import { PluginManager } from '@ngxs/store/src/plugin-manager';
import { NgxsConfig } from '@ngxs/store/src/symbols';
import { Add } from './test-state';

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

export const store: Store = new Store(
    stateStream,
    internalStateOperations,
    config,
    internalExecutionStrategy
);
