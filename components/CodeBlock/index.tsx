import Highlight, { defaultProps, Language } from "prism-react-renderer";
import CodeBlockStyles from "./CodeBlock.module.scss";
import theme from "prism-react-renderer/themes/vsDark";
import React, { useEffect, useRef, useState } from "react";
import { Tabs } from "@/design_systems/mainds/components/compound/Tabs";

type ColorOptions = {
  lineNumberColor?: string;
  tabTextActiveColor?: string;
  tabTextInactiveColor?: string;
  tabUnderlineColor?: string;
  tabBottomBorderColor?: string;
};

type LocalColorOptions = Required<ColorOptions>;

type CodeBlockOptions = {
  pxBorderRadius?: number;
  pxHeight?: number;
  pxTabHeight?: number;
  pxTabPaddingX?: number;
  pxCodeFontSize?: number;
  pxLineHeight?: number;
  pxCodePaddingTop?: number;
  pxCodePaddingBottom?: number;
  pxCodePaddingLeft?: number;
  pxCodePaddingRight?: number;
  pxLineNumberPaddingLeft?: number;
  pxLineNumberPaddingRight?: number;
};

type LocalCodeBlockOptions = Required<CodeBlockOptions>;

type FileType = {
  code: string;
  isActive?: boolean;
};

type NormalizedFileType = FileType & {
  fileExtension?: string;
  fileName?: string;
  language?: Language;
};

type FilesProp =
  | {
      [key: string]: string | FileType;
    }
  | undefined;

type NormalizedFilesProp =
  | {
      [key: string]: NormalizedFileType;
    }
  | undefined;

type CodeBlockContentProps = {
  code: string;
  language: Language;
  showLineNumbers: boolean;
  wrapLines: boolean;
  localOptions: LocalCodeBlockOptions;
  localColorOptions: LocalColorOptions;
};

type CodeBlockProps = {
  code?: string;
  language?: Language;
  showLineNumbers?: boolean;
  wrapLines?: boolean;
  showTabs?: boolean;
  options?: CodeBlockOptions;
  colorOptions?: ColorOptions;
  files?: {
    [key: string]: string | FileType;
  };
};

const getStringLineCount = (userString: string): number => {
  return userString.split(/\r\n|\r|\n/).length;
};

const getFileExtensionFromFilePath = (filePath: string) => {
  return filePath.split(".")[filePath.split(".").length - 1];
};

const getLanguageFromFilePath = (filePath: string) => {
  const fileExtension = getFileExtensionFromFilePath(
    filePath
  ) as keyof typeof supportedExtensions;

  // Prism Languages:
  // https://github.com/FormidableLabs/prism-react-renderer/blob/master/index.d.ts
  const supportedExtensions = {
    html: "markup",
    sh: "bash",
    clike: "clike",
    c: "c",
    cpp: "cpp",
    css: "css",
    js: "javascript",
    jsx: "jsx",
    litcoffee: "coffeescript",
    as: "actionscript",
    diff: "diff",
    git: "git",
    go: "go",
    gql: "graphql",
    handlebars: "handlebars",
    json: "json",
    less: "less",
    make: "makefile",
    md: "markdown",
    m: "objectivec",
    ml: "ocaml",
    py: "python",
    rnd: "reason",
    sass: "sass",
    scss: "scss",
    sql: "sql",
    styl: "stylus",
    tsx: "tsx",
    wasm: "wasm",
    yaml: "yaml",
  };

  return fileExtension in supportedExtensions
    ? (supportedExtensions[fileExtension] as Language)
    : "jsx";
};

const getFileNameFromFilePath = (filePath: string) => {
  return filePath.split("/")[filePath.split("/").length - 1];
};

const getNormalizedFiles = (files: FilesProp) => {
  const normalizedFiles = files
    ? ({} as { [key: string]: NormalizedFileType })
    : undefined;

  if (files && normalizedFiles) {
    Object.keys(files).forEach((filePath) => {
      const fileObject = files[filePath];
      typeof fileObject === "string"
        ? (normalizedFiles[filePath] = {
            code: fileObject,
            fileExtension: getFileExtensionFromFilePath(filePath),
            fileName: getFileNameFromFilePath(filePath),
            language: getLanguageFromFilePath(filePath),
          })
        : (normalizedFiles[filePath] = {
            ...fileObject,
            fileExtension: getFileExtensionFromFilePath(filePath),
            fileName: getFileNameFromFilePath(filePath),
            language: getLanguageFromFilePath(filePath),
          });
    });
  }
  return normalizedFiles;
};

const getActiveFileIndex = (normalizedFiles: NormalizedFilesProp) => {
  return normalizedFiles
    ? Object.keys(normalizedFiles)
        .map((filePath) => normalizedFiles[filePath]["isActive"])
        .indexOf(true)
    : undefined;
};

const getActiveFilePath = ({
  normalizedFiles,
  activeFileIndex,
}: {
  normalizedFiles: NormalizedFilesProp;
  activeFileIndex?: number;
}) => {
  return normalizedFiles
    ? activeFileIndex === -1
      ? Object.keys(normalizedFiles)[0]
      : Object.keys(normalizedFiles)[activeFileIndex as number]
    : undefined;
};

const CodeBlockContent = ({
  code,
  language,
  showLineNumbers,
  wrapLines,
  localOptions,
  localColorOptions,
}: CodeBlockContentProps) => {
  const isCodeEmpty = code === "";
  const lastLineIndex = getStringLineCount(code) - 1;

  const [wrappedLineHeights, setWrappedLineHeights] = useState<number[]>([]);

  const linesRef = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    setWrappedLineHeights(
      linesRef.current.map((line, lineIndex) =>
        line && lineIndex === lastLineIndex
          ? line?.offsetHeight - localOptions.pxCodePaddingBottom
          : line?.offsetHeight
      ) as number[]
    );
  }, [linesRef, lastLineIndex, localOptions.pxCodePaddingBottom]);

  return (
    <Highlight {...defaultProps} code={code} language={language} theme={theme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={`${className} ${CodeBlockStyles["pre"]}`}
          style={{
            ...style,
            fontSize: `${localOptions.pxCodeFontSize}px`,
            lineHeight: `${localOptions.pxLineHeight}px`,
            paddingTop: `${localOptions.pxCodePaddingTop}px`,
            overflowY: "scroll",
            overflowX: wrapLines ? "hidden" : "scroll",
          }}
        >
          <div
            className={`${CodeBlockStyles["block-line-numbers-list"]}`}
            style={{
              display: `${showLineNumbers ? "block" : "none"}`,
            }}
          >
            <div
              className={`${CodeBlockStyles["block-line-number-container"]}`}
              style={{
                backgroundColor: style.backgroundColor as string,
                paddingLeft: `${localOptions.pxLineNumberPaddingLeft}px`,
                paddingRight: `${localOptions.pxLineNumberPaddingRight}px`,
                lineHeight: `${localOptions.pxLineHeight}px`,
              }}
            >
              {tokens.map((line, lineIndex) => {
                return isCodeEmpty ? null : (
                  <span
                    className={`${CodeBlockStyles["block-line-number"]}`}
                    style={{
                      color: localColorOptions.lineNumberColor,
                      visibility:
                        // hide line number while wrappedLineHeights loads
                        !wrapLines || wrappedLineHeights[lineIndex]
                          ? "visible"
                          : "hidden",
                      height: wrapLines
                        ? `${wrappedLineHeights[lineIndex]}px`
                        : `${localOptions.pxLineHeight}px`,
                    }}
                    key={lineIndex + 1}
                  >
                    {lineIndex + 1}
                  </span>
                );
              })}
            </div>
          </div>
          <code
            className={`${CodeBlockStyles["code"]}`}
            style={{
              paddingLeft: `${
                showLineNumbers
                  ? localOptions.pxCodePaddingLeft -
                    localOptions.pxLineNumberPaddingRight
                  : localOptions.pxCodePaddingLeft
              }px`,
              paddingRight: `${localOptions.pxCodePaddingRight}px`,
            }}
          >
            {tokens.map((line, lineIndex) => (
              <div
                ref={(el) =>
                  linesRef.current ? (linesRef.current[lineIndex] = el) : null
                }
                key={lineIndex}
                {...getLineProps({ line, key: lineIndex })}
              >
                <span
                  style={{
                    display: "block",
                    whiteSpace: wrapLines ? "pre-wrap" : "pre",
                    paddingBottom:
                      lineIndex === lastLineIndex
                        ? `${localOptions.pxCodePaddingBottom}px`
                        : "0px",
                  }}
                >
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </span>
              </div>
            ))}
          </code>
        </pre>
      )}
    </Highlight>
  );
};

const CodeBlock = (props: CodeBlockProps) => {
  const {
    code = "",
    language = "jsx",
    showLineNumbers = true,
    wrapLines = false,
    showTabs = true,
    files,
    options,
    colorOptions,
  } = props;

  const propsForCodeBlockContent = {
    code,
    language,
    showLineNumbers,
    wrapLines,
  };

  /* ======================================================================= */
  /* Define default values for CodeBlock options */
  /* ======================================================================= */

  const localOptions: LocalCodeBlockOptions = {
    pxBorderRadius: 5,
    pxHeight: 500,
    pxTabHeight: 40,
    pxTabPaddingX: 8,
    pxCodeFontSize: 13,
    pxLineHeight: 20,
    pxCodePaddingTop: 24,
    pxCodePaddingBottom: 24,
    pxCodePaddingLeft: 24,
    pxCodePaddingRight: 24,
    pxLineNumberPaddingLeft: 16,
    pxLineNumberPaddingRight: 8,
    ...options,
  };

  const localColorOptions: LocalColorOptions = {
    lineNumberColor: "#FFF",
    tabTextActiveColor: "#FFF",
    tabTextInactiveColor: "#BCBCBC",
    tabUnderlineColor: "#FFF",
    tabBottomBorderColor: "#555",
    ...colorOptions,
  };

  const codeBlockContentArgs: CodeBlockContentProps = {
    ...propsForCodeBlockContent,
    localOptions,
    localColorOptions,
  };

  /* ======================================================================= */
  /* Set up files */
  /* ======================================================================= */

  const normalizedFiles = getNormalizedFiles(files);

  const activeFileIndex = getActiveFileIndex(normalizedFiles);

  const activeFilePath = getActiveFilePath({
    normalizedFiles,
    activeFileIndex,
  });

  return (
    <Highlight {...defaultProps} code={code} language={language} theme={theme}>
      {({ style }) => (
        <div
          className={`${CodeBlockStyles["codeblock-container"]}`}
          style={{
            backgroundColor: style.backgroundColor as string,
            borderRadius: `${localOptions.pxBorderRadius}px`,
            height: `${localOptions.pxHeight}px`,
          }}
        >
          {showTabs && normalizedFiles ? (
            <Tabs
              className={`${CodeBlockStyles["tabs"]}`}
              defaultTabId={activeFilePath}
              style={{
                backgroundColor: style.backgroundColor as string,
                color: localColorOptions.tabTextInactiveColor,
              }}
            >
              {({ activeTabId }) => {
                return (
                  <React.Fragment>
                    <Tabs.List
                      className={`${CodeBlockStyles["tab-list"]}`}
                      style={{
                        color: style.color as string,
                        height: `${localOptions.pxTabHeight}px`,
                        paddingLeft: `${
                          (localOptions.pxLineNumberPaddingLeft as number) -
                          (localOptions.pxTabPaddingX as number) / 2
                        }px`,
                        borderBottom: `1px solid ${localColorOptions.tabBottomBorderColor}`,
                      }}
                    >
                      {Object.keys(normalizedFiles).map((filePath) => {
                        const isActiveTab = activeTabId === filePath;

                        return (
                          <Tabs.Tab
                            key={filePath}
                            className={`${CodeBlockStyles["tab"]}`}
                            tabId={filePath}
                            style={{
                              color: isActiveTab
                                ? localColorOptions.tabTextActiveColor
                                : localColorOptions.tabTextInactiveColor,
                              paddingLeft: `${localOptions.pxTabPaddingX}px`,
                              paddingRight: `${localOptions.pxTabPaddingX}px`,
                              height: `${localOptions.pxTabHeight}px`,
                              borderBottom: `1px solid ${
                                isActiveTab
                                  ? localColorOptions.tabUnderlineColor
                                  : "transparent"
                              }`,
                            }}
                          >
                            <div
                              className={`${CodeBlockStyles["tab-content"]}`}
                            >
                              {normalizedFiles[filePath]["fileName"]}
                            </div>
                          </Tabs.Tab>
                        );
                      })}
                    </Tabs.List>
                    {Object.keys(normalizedFiles).map((filePath) => {
                      const filePropsForCodeBlockContent = {
                        code: normalizedFiles[filePath]["code"],
                        language: normalizedFiles[filePath][
                          "language"
                        ] as Language,
                        showLineNumbers,
                        wrapLines,
                      };

                      const fileCodeBlockContentArgs: CodeBlockContentProps = {
                        ...filePropsForCodeBlockContent,
                        localOptions,
                        localColorOptions,
                      };

                      return (
                        <Tabs.Panel
                          key={filePath}
                          className={`${CodeBlockStyles["tab-panel"]}`}
                          tabId={filePath}
                          style={{
                            height: `calc(100% - ${localOptions.pxTabHeight}px)`,
                          }}
                        >
                          <CodeBlockContent {...fileCodeBlockContentArgs} />
                        </Tabs.Panel>
                      );
                    })}
                  </React.Fragment>
                );
              }}
            </Tabs>
          ) : (
            <CodeBlockContent {...codeBlockContentArgs} />
          )}
        </div>
      )}
    </Highlight>
  );
};

export default CodeBlock;
