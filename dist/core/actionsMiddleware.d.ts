import { RouteMiddleware } from 'router6/src';
import Context from './Context';
declare type ActionExecutionResult = {
    [actionName: string]: boolean;
};
declare const actionsMiddleware: <T extends Context<any>>(context: T, { handleRoutingError, executionFlow, }: {
    handleRoutingError?: (e: any, next: any, abort: any) => Promise<any>;
    executionFlow: (execution: Promise<ActionExecutionResult[]>, next: () => void, abort: (e: Error) => void) => void;
}, stats?: ActionExecutionResult) => RouteMiddleware;
export default actionsMiddleware;
