// Objective: Define the spacing values for the layout components

export class LayoutSpacing {
    static tiny = 6;
    static small = 12;
    static medium = 24;
    static large = 48;
    static xlarge = 72;
    static interpolate = (x: number) => LayoutSpacing.tiny * x;
}