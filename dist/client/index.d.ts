import Context from '../core/Context';
export declare const createCraqClient: (context: Context<any>, App: any, { bundles }: {
    bundles: any;
}) => {
    run: (href: string) => {
        render: (node: any) => any;
    };
};
