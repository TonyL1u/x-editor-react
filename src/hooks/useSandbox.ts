import type { RefObject } from 'react';
import { useCallback, useRef } from 'react';

import { PreviewProxy } from '../logic/previewProxy';
import type { EventHookOn } from '.';
import { useEventHook } from './useEventHook';
import { useOnUnmounted } from './useOnUnmounted';

type ActionType = 'error' | 'console' | 'unhandledrejection';

type ConsoleLevel = 'clear' | 'log' | 'info' | 'dir' | 'warn' | 'error' | 'table';

interface MessageAction<A extends ActionType> {
    action: A;
}

interface PostMessageConsole extends MessageAction<'console'> {
    level: ConsoleLevel;
    args: unknown[];
    value: Error | string;
    duplicate?: boolean;
}

interface PostMessageError extends MessageAction<'error'> {
    value: Error | string;
}

interface PostMessageRejection extends MessageAction<'unhandledrejection'> {
    value: string;
}

interface SandboxConfig {
    imports?: Record<string, string>;
    srcdoc?: string;
    onHandleRejection?: (event: PostMessageRejection) => void;
    onError?: (event: PostMessageError) => void;
    onConsole?: (log: PostMessageConsole) => void;
}

export interface UseSandboxReturn {
    sandbox: RefObject<HTMLIFrameElement | undefined>;
    proxy: RefObject<PreviewProxy | undefined>;
    create: () => HTMLIFrameElement | undefined;
    destroy: () => void;
    onBeforeCreate: EventHookOn<HTMLIFrameElement>;
    onCreated: EventHookOn<HTMLIFrameElement>;
    onDestroy: EventHookOn;
    onLoaded: EventHookOn;
}

export function useSandbox(config: SandboxConfig = {}): UseSandboxReturn {
    const { imports = {}, srcdoc = '', onHandleRejection, onError, onConsole } = config;
    const onBeforeCreateHook = useEventHook<HTMLIFrameElement>();
    const onCreatedHook = useEventHook<HTMLIFrameElement>();
    const onDestroyHook = useEventHook<void>();
    const onLoadedHook = useEventHook<void>();
    const sandbox = useRef<HTMLIFrameElement>();
    const proxy = useRef<PreviewProxy>();

    const destroy = () => {
        proxy.current?.destroy();
        onDestroyHook.trigger();
    };

    const create = useCallback(() => {
        onBeforeCreateHook.trigger(sandbox.current);
        proxy.current?.destroy();
        // create iframe
        sandbox.current = document.createElement('iframe');
        sandbox.current.setAttribute('sandbox', ['allow-forms', 'allow-modals', 'allow-pointer-lock', 'allow-popups', 'allow-same-origin', 'allow-scripts', 'allow-top-navigation-by-user-activation'].join(' '));
        sandbox.current.id = 'sandbox_iframe';
        sandbox.current.srcdoc = srcdoc.replace(
            /<!--IMPORT_MAP-->/,
            JSON.stringify({
                imports: {
                    react: '../../proxy/react-dev-proxy.ts',
                    'react-dom/client': '../../proxy/react-dom_client-dev-proxy.ts',
                    'styled-components': '../../proxy/styled-components-dev-proxy.ts',
                    ...imports
                }
            })
        );

        // create message proxy
        proxy.current = new PreviewProxy(sandbox.current, {
            on_fetch_progress: () => {
                // pending_imports = progress;
            },
            on_error: (event: PostMessageError) => {
                onError?.(event);
            },
            on_unhandled_rejection: (event: PostMessageRejection) => {
                onHandleRejection?.(event);
            },
            on_console: (log: PostMessageConsole) => {
                onConsole?.(log);
            },
            on_console_group: () => {
                // group_logs(action.label, false);
            },
            on_console_group_end: () => {
                // ungroup_logs();
            },
            on_console_group_collapsed: () => {
                // group_logs(action.label, true);
            }
        });
        onCreatedHook.trigger(sandbox.current);

        sandbox.current.addEventListener('load', () => {
            proxy.current?.handle_links().catch(() => {});
            onLoadedHook.trigger();
        });

        return sandbox.current;
    }, [imports, srcdoc]);

    useOnUnmounted(destroy);

    return {
        sandbox,
        proxy,
        create,
        destroy,
        onBeforeCreate: onBeforeCreateHook.on,
        onCreated: onCreatedHook.on,
        onDestroy: onDestroyHook.on,
        onLoaded: onLoadedHook.on
    };
}
