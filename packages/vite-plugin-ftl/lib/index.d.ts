import type { PluginOption } from 'vite';
/**
 * https://github.com/ijse/freemarker.js#configurations
 */
export interface FtlOptions {
    /**
     * The encoding of textual sources (templates). Use the special value "host"(-E host)
     * if the default encoding of the host machine should be used. The default is "ISO-8859-1".
     */
    sourceEncoding: string;
    /**
     * Sets the tag syntax for templates that doesn't start with the ftl directive.
     * Possible values are: angleBracket, squareBracket, autoDetect.
     */
    tagSyntax: 'angleBracket' | 'squareBracket' | 'autoDetect';
    /**
     * Sets the time zone in which date/time/date-time values are shown.
     * The default is the time zone of the host machine. Example: GMT+02
     */
    timeFormat: string;
    /**
     * The number format used to show numerical values. The default is 0.############
     */
    numberFormat: string;
    /**
     * The format used to show date (year+month+day) values. The default is locale dependent.
     */
    dateFormat: string;
    /**
     * The boolean format used to show boolean values, like "Yes,No". Not "true,false"; use {myBool}.
     */
    booleanFormat: string;
    /**
     * The format used to show date-time values. The default is locale dependent.
     */
    datetimeFormat: string;
    /**
     * The locale (as ar_SA). Use the special value "host" (-A host) if the default
     * locale of the host machine should be used. The default value of the option is en_US.
     */
    locale: string;
}
export interface Options {
    ftlOptions?: FtlOptions;
    autoLoadData?: boolean;
}
declare function VitePluginFtl(options?: Options): PluginOption;
export default VitePluginFtl;
