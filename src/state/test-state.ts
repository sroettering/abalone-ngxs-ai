import { StateContext, State } from "@ngxs/store";

interface TestStateModel {
    count: number;
}

export class Add {
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