declare module '*.css';

type SvgrComponent = React.FunctionComponent<React.SVGAttributes<SVGElement>>;

declare module '*.svg' {
    const value: SvgrComponent;
    export default value;
}
