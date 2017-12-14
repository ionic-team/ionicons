export declare class Icon {
    mode: string;
    /**
     * @input {string} Specifies the label to use for accessibility. Defaults to the icon name.
     */
    ariaLabel: string;
    /**
     * @input {string} Specifies which icon to use. The appropriate icon will be used based on the mode.
     * For more information, see [Ionicons](/docs/ionicons/).
     */
    name: string;
    /**
     * @input {string} Specifies which icon to use on `ios` mode.
     */
    ios: string;
    /**
     * @input {string} Specifies which icon to use on `md` mode.
     */
    md: string;
    private isServer;
    private svgContent;
    private readonly iconName;
    hostData(): {
        [attrName: string]: string;
    };
    render(): JSX.Element;
}
